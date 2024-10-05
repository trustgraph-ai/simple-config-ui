
from aiohttp import web
import yaml
import zipfile
from io import BytesIO
import importlib.resources
import json

from . generator import Generator

import logging
logger = logging.getLogger("api")
logger.setLevel(logging.INFO)

class Api:
    def __init__(self, **config):

        self.port = int(config.get("port", "8081"))
        self.app = web.Application(middlewares=[])

        self.app.add_routes([web.post("/api/generate", self.generate)])
        self.app.add_routes([web.get("/{tail:.*}", self.everything)])

        self.ui = importlib.resources.files().joinpath("ui")
        self.templates = importlib.resources.files().joinpath("templates")
        self.resources = importlib.resources.files().joinpath("resources")

    def open(self, path):

        if ".." in path:
            raise web.HTTPNotFound()

        if len(path) > 0:
            if path[0] == "/":
                path = path[1:]

        if path == "": path = "index.html"

        try:
            p = self.ui.joinpath(path)
            t = p.read_text()
            return t
        except:
            raise web.HTTPNotFound()

    async def everything(self, request):

        if request.path.endswith(".css"):
            t = self.open(request.path)
            return web.Response(
                text=t, content_type="text/css"
            )

        if request.path.endswith(".js"):
            t = self.open(request.path)
            return web.Response(
                text=t, content_type="text/javascript"
            )

        if request.path == "/" or request.path.endswith(".html"):
            t = self.open(request.path)
            return web.Response(
                text=t, content_type="text/html"
            )

        return web.HTTPNotFound()

    def process(
            self, config, version="0.11.19", platform="docker-compose",
    ):

        # This verifies/forces that the input is JSON.  Important because
        # input is user-supplied, don't want to trust it.
        dec = json.loads(config)
        enc = json.dumps(dec)

        config = config.encode("utf-8")

        gen = Generator(config, base=self.templates, version=version)

        path = self.templates.joinpath(
            f"config-to-{platform}.jsonnet"
        )
        wrapper = path.read_text()

        processed = gen.process(wrapper)

        return processed

    async def generate(self, request):

        print("Generate...")

        config = await request.text()

        print(config)

        processed = self.process(config)
        y = yaml.dump(processed)

        mem = BytesIO()

        with zipfile.ZipFile(mem, mode='w') as out:

            def output(name, content):
                logger.info(f"Adding {name}...")
                out.writestr(name, content)

            fname = "docker-compose.yaml"

            output(fname, y)

            # Grafana config
            path = self.resources.joinpath(
                "grafana/dashboards/dashboard.json"
            )
            res = path.read_text()
            output("grafana/dashboards/dashboard.json", res)

            path = self.resources.joinpath(
                "grafana/provisioning/dashboard.yml"
            )
            res = path.read_text()
            output("grafana/provisioning/dashboard.yml", res)

            path = self.resources.joinpath(
                "grafana/provisioning/datasource.yml"
            )
            res = path.read_text()
            output("grafana/provisioning/datasource.yml", res)

            # Prometheus config
            path = self.resources.joinpath(
                "prometheus/prometheus.yml"
            )
            res = path.read_text()
            output("prometheus/prometheus.yml", res)

        return web.Response(
            body=mem.getvalue(),
            content_type = "application/octet-stream"
        )

    def run(self):

        web.run_app(self.app, port=self.port)

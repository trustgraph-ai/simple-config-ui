
from aiohttp import web
import yaml
import zipfile
from io import BytesIO
import importlib.resources

from . generator import Generator

class Api:
    def __init__(self, **config):

        self.port = int(config.get("port", "8081"))
        self.app = web.Application(middlewares=[])

        self.app.add_routes([web.post("/api/generate", self.generate)])
        self.app.add_routes([web.get("/{tail:.*}", self.everything)])

        self.ui = importlib.resources.files().joinpath("ui")

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

        config = config.encode("utf-8")

        gen = Generator(config, version=version)


        with open(f"./templates/config-to-{platform}.jsonnet", "r") as f:
            wrapper = f.read()

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
            with open("grafana/dashboards/dashboard.json") as f:
                output(
                    "grafana/dashboards/dashboard.json",
                    f.read()
                )

            with open("grafana/provisioning/dashboard.yml") as f:
                output(
                    "grafana/provisioning/dashboard.yml",
                    f.read()
                )

            with open("grafana/provisioning/datasource.yml") as f:
                output(
                    "grafana/provisioning/datasource.yml",
                    f.read()
                )

            # Prometheus config
            with open("prometheus/prometheus.yml") as f:
                output("prometheus/prometheus.yml", f.read())

        return web.Response(
            body=mem.getvalue(),
            content_type = "application/octet-stream"
        )

    def run(self):

        web.run_app(self.app, port=self.port)

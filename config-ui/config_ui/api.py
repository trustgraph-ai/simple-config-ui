
from aiohttp import web
import yaml
import zipfile
from io import BytesIO
import importlib.resources
import json

from . generator import Generator
from trustgraph_configurator import Index, Packager

import logging
logger = logging.getLogger("api")
logger.setLevel(logging.INFO)

class Api:
    def __init__(self, **config):

        self.port = int(config.get("port", "8080"))
        self.app = web.Application(middlewares=[])

        self.app.add_routes([
            web.post("/api/generate/{platform}/{template}", self.generate)
        ])

        self.ui = importlib.resources.files().joinpath("ui")

        self.app.add_routes([
            web.get("/api/latest-stable", self.latest_stable),
            web.get("/api/latest", self.latest),
            web.get("/api/versions", self.versions),
        ])

        self.app.add_routes([web.get("/{tail:.*}", self.everything)])

    def latest(self, request):

        latest = Index.get_latest()

        return web.json_response(
            {
                "template": latest.name,
                "version": latest.version,
            }
        )

    def latest_stable(self, request):

        latest = Index.get_latest_stable()

        return web.json_response(
            {
                "template": latest.name,
                "version": latest.version,
            }
        )

    def versions(self, request):

        versions = Index.get_templates()

        return web.json_response([
            {
                "template": v.name,
                "version": v.version,
                "description": v.description,
                "status": v.status,
            }
            for v in versions
        ])

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

    def open_binary(self, path):

        if ".." in path:
            raise web.HTTPNotFound()

        if len(path) > 0:
            if path[0] == "/":
                path = path[1:]

        if path == "": path = "index.html"

        try:
            p = self.ui.joinpath(path)
            t = p.read_bytes()
            return t
        except:
            raise web.HTTPNotFound()

    async def everything(self, request):

        try:

            if request.path.endswith(".css"):
                t = self.open(request.path)
                return web.Response(
                    text=t, content_type="text/css"
                )

            if request.path.endswith(".png"):
                t = self.open_binary(request.path)
                return web.Response(
                    body=t, content_type="image/png"
                )

            if request.path.endswith(".svg"):
                t = self.open(request.path)
                return web.Response(
                    text=t, content_type="image/svg+xml"
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

        except Exception as e:
            logging.error(f"Exception: {e}")
            raise web.HTTPInternalServerError()

    async def generate(self, request):

        logger.info("Generate...")

        try:
            platform = request.match_info["platform"]
        except:
            platform = "docker-compose"

        try:
            template = request.match_info["template"]
        except:
            return web.HTTPBadRequest()

        logger.info(f"Generating for platform={platform} template={template}")

        try:

            config = await request.text()

            # This verifies/forces that the input is JSON.  Important because
            # input is user-supplied, don't want to trust it.
            try:
                dec = json.loads(config)
                config = json.dumps(dec)
            except:
                # Incorrectly formatted stuff is not our problem,
                logger.info(f"Bad JSON")
                return web.HTTPBadRequest()

            logger.info(f"Config: {config}")

            pkg = Packager(
                version = None,      # Use version from template configuration
                template = template,
                platform = platform,
                latest = False,
                latest_stable = False
            )

            data = pkg.generate(config)

            return web.Response(
                body = data,
                content_type = "application/octet-stream"
            )

        except Exception as e:
            logging.error(f"Exception: {e}")
            return web.HTTPInternalServerError()

    def run(self):

        web.run_app(self.app, port=self.port)


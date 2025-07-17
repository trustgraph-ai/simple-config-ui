
import asyncio
import aiohttp
from aiohttp import web
import importlib.resources
import websockets.asyncio.client as wsclient

import logging
logger = logging.getLogger("api")
logger.setLevel(logging.INFO)

class Running:
    def __init__(self): self.running = True
    def get(self): return self.running
    def stop(self): self.running = False

class Api:
    def __init__(self, **config):

        self.port = int(config.get("port", "8080"))
        self.gateway = config.get("gateway", "https://config-svc.app.trustgraph.ai/")

        print("PORT IS ", self.port)

        if self.gateway[-1] != "/":
            self.gateway += "/"

        self.app = web.Application(middlewares=[])

        # Just pass-through some calls to the API back-end
        self.app.add_routes([web.get("/api/latest", self.latest)])
        self.app.add_routes([web.get("/api/latest-stable",
                                     self.latest_stable)])
        self.app.add_routes([web.get("/api/versions", self.versions)])
        self.app.add_routes([web.post("/api/generate/{platform}/{version}",
                                      self.generate)])

        # Everything else gets matched for serving static resources
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

    async def latest(self, request):

        url = self.gateway + "api/latest"

        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(url) as resp:
                    if resp.status == 200:
                        data = await resp.read()
                        return web.Response(
                            body=data,
                            status=resp.status,
                            content_type='application/json'
                        )
                    else:
                        return web.Response(status=resp.status)
        except Exception as e:
            logger.error(f"Error fetching latest: {e}")
            return web.Response(status=500, text=str(e))

    async def latest_stable(self, request):

        url = self.gateway + "api/latest-stable"

        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(url) as resp:
                    if resp.status == 200:
                        data = await resp.read()
                        return web.Response(
                            body=data,
                            status=resp.status,
                            content_type='application/json'
                        )
                    else:
                        return web.Response(status=resp.status)
        except Exception as e:
            logger.error(f"Error fetching latest-stable: {e}")
            return web.Response(status=500, text=str(e))

    async def versions(self, request):

        url = self.gateway + "api/versions"

        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(url) as resp:
                    if resp.status == 200:
                        data = await resp.read()
                        return web.Response(
                            body=data,
                            status=resp.status,
                            content_type='application/json'
                        )
                    else:
                        return web.Response(status=resp.status)
        except Exception as e:
            logger.error(f"Error fetching versions: {e}")
            return web.Response(status=500, text=str(e))

    async def generate(self, request):

        platform = request.match_info['platform']
        version = request.match_info['version']
        url = self.gateway + f"api/generate/{platform}/{version}"

        try:
            # Read the request body
            body = await request.read()
            
            async with aiohttp.ClientSession() as session:
                async with session.post(url, data=body, headers={'Content-Type': 'application/json'}) as resp:
                    if resp.status == 200:
                        data = await resp.read()
                        return web.Response(
                            body=data,
                            status=resp.status,
                            content_type='application/octet-stream'
                        )
                    else:
                        error_text = await resp.text()
                        return web.Response(status=resp.status, text=error_text)
        except Exception as e:
            logger.error(f"Error generating for {platform}/{version}: {e}")
            return web.Response(status=500, text=str(e))

    def run(self):

        web.run_app(self.app, port=self.port)


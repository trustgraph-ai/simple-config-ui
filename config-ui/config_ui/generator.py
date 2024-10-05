
import _jsonnet as j
import json
import os
import pathlib
import logging

logger = logging.getLogger("generator")
logger.setLevel(logging.INFO)

class Generator:

    def __init__(
            self, config, base=None, resources=None,
            version="0.0.0"
    ):

        if base:
            self.base = base
        else:
            self.base = pathlib.Path("templates")

        self.config = config
        self.version = f"\"{version}\"".encode("utf-8")

    def process(self, config):

        res = j.evaluate_snippet("config", config, import_callback=self.load)
        return json.loads(res)

    def load(self, dir, filename):

        logger.debug("Request jsonnet: %s %s", dir, filename)

        if filename == "config.json" and dir == "":
            path = self.base.joinpath(dir, filename)
            return str(path), self.config
        
        if filename == "version.jsonnet":
            path = self.base.joinpath(dir, filename)
            return str(path), self.version

        if dir:
            candidates = [
                self.base.joinpath(dir, filename),
                self.base.joinpath(filename)
            ]
        else:
            candidates = [
                self.base.joinpath(filename)
            ]

        try:

            if filename == "vertexai/private.json":

                return candidates[0], private_json.encode("utf-8")

            for c in candidates:
                logger.debug("Try: %s", c)

                if os.path.isfile(c):
                    with open(c, "rb") as f:
                        logger.debug("Loading: %s", c)
                        return str(c), f.read()

            raise RuntimeError(
                f"Could not load file={filename} dir={dir}"
            )
                
        except:

            path = os.path.join(self.base, filename)
            logger.debug("Try: %s", path)
            with open(path, "rb") as f:
                logger.debug("Loaded: %s", path)
                return str(path), f.read()


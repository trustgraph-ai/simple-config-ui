
import logging

from . api import Api

def run():

    logger = logging.getLogger("service")
    logger.setLevel(logging.INFO)

    a = Api()

    a.run()

if __name__ == '__main__':
    run()


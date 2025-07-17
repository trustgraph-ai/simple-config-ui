
import logging
import argparse
from prometheus_client import start_http_server

from . api import Api

default_api_gateway = "https://config-svc.app.trustgraph.ai/"
default_port = 8080

def run():

    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s %(levelname)s %(message)s"
    )

    parser = argparse.ArgumentParser(
        prog="config-ui",
        description=__doc__
    )
    
    parser.add_argument(
        '-g', '--gateway',
        default=default_api_gateway,
        help=f'API host (default: {default_api_gateway})',
    )

    parser.add_argument(
        '--port',
        type=int,
        default=default_port,
        help=f'Port number to listen on (default: {default_port})',
    )

    args = parser.parse_args()
    args = vars(args)

    logging.info("Starting...")

    a = Api(**args)
    a.run()

if __name__ == '__main__':
    run()


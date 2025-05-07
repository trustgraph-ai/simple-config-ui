
# Config util MVP

## Setup for Python

```
pip3 -m venv env
. env/bin/activate
pip3 install -r requirements.txt
```

## Dev mode

```
npm install
npm run dev
```

This runs the application in Vite at http://localhost:5173.
Note that UI bit works, but the generation part isn't running.

## Run it all locally

This builds the UI and the Python package:
```
make service-package
```

Then run the Python package which serves the generator and UI:

```
export PYTHONPATH=config-ui
config-ui/scripts/service
```

Generation should work

## Run it in a container

Build the container:
```
make service-package VERSION=0.0.0
```

and run it

```
podman run -i -t -p 8080:8080 localhost/config-ui:0.0.0
```

Go to http://localhost:8080

## Deploy it

Deployment is Github actions, automatic to Cloud Run.  Deployment kicks in
automatically on anything with a version tag.  Version tags should be of
form v1.2.3.

## Actual template configuration

Is in the trustgraph-templates repo.  Commit to master on that repo,
then come back here and deploy here.

FIXME: It appears you need to change something to get it to pick up the
new version, it's not enough to just deploy the pipeline.


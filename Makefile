
PACKAGE_VERSION=0.0.0
VERSION=0.0.0

all: service-package container

ui:
	npm run build
	rm -rf config-ui/config_ui/ui/
	cp -r dist/ config-ui/config_ui/ui/
	cp public/*.png config-ui/config_ui/ui/
	cp public/*.svg config-ui/config_ui/ui/

service-package: ui update-package-versions
	cd config-ui && python3 setup.py sdist --dist-dir ../pkgs/

update-package-versions:
	echo __version__ = \"${PACKAGE_VERSION}\" > config-ui/config_ui/version.py

CONTAINER=localhost/config-ui
DOCKER=podman

container: service-package
	${DOCKER} build -f Containerfile -t ${CONTAINER}:${VERSION} \
	    --format docker

# On port 8081
run-container:
	${DOCKER} run -i -t -p 8081:8080 ${CONTAINER}:${VERSION}

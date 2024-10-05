
VERSION=0.1.0

all: service-package

ui:
	npm run build
	rm -rf simple-config-ui/config_ui/ui/
	cp -r dist/ simple-config-ui/config_ui/ui/

template-data:
	rm -rf simple-config-ui/config_ui/templates
	mkdir -p simple-config-ui/config_ui/templates
	find templates -name '*.jsonnet' | cpio -pdm simple-config-ui/config_ui/templates

service-package: ui template-data update-package-versions
	cd simple-config-ui && python3 setup.py sdist --dist-dir ../pkgs/

update-package-versions:
	echo __version__ = \"${VERSION}\" > simple-config-ui/config_ui/version.py

CONTAINER=docker.io/trustgraph/simple-config-ui

container:
	${DOCKER} build -f Containerfile -t ${CONTAINER}:${VERSION} \
	    --format docker


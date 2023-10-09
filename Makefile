# This Makefile is based on the Makefile defined in the Python Best Practices repository:
# https://github.com/Amsterdam/opdrachten_team_dev/tree/master/dependency_management
#
# VERSION = 2020.01.29
.PHONY: test manifests deploy

dc = docker-compose
run = $(dc) run --rm

ENVIRONMENT ?= local
VERSION ?= latest
HELM_ARGS = manifests/chart \
	-f manifests/values.yaml \
	-f manifests/env/${ENVIRONMENT}.yaml \
	--set image.tag=${VERSION} \
	--set image.registry=${REGISTRY}

help:                               ## Show this help.
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

build:                              ## Build docker image
	$(dc) build

push: build                         ## Push docker image to registry
	$(dc) push

app:                                ## Run app
	$(run) --service-ports frontend

test:                               ## Execute tests
	$(run) test $(ARGS)

requirements:                       ## Upgrade dependencies
	$(run) upgrade $(ARGS)

clean:                              ## Clean docker stuff
	$(dc) down -v --remove-orphans

trivy:                              ## Detect image vulnerabilities
	trivy image --ignore-unfixed nginxinc/nginx-unprivileged:mainline-alpine-slim

deploy: manifests
	helm upgrade --install frontend $(HELM_ARGS) $(ARGS)

manifests:
	helm template frontend $(HELM_ARGS) $(ARGS)

update-chart:
	rm -rf manifests/chart
	git clone --branch 1.7.0 --depth 1 git@github.com:Amsterdam/helm-application.git manifests/chart
	rm -rf manifests/chart/.git
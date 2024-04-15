# This Makefile is based on the Makefile defined in the Python Best Practices repository:
# https://github.com/Amsterdam/opdrachten_team_dev/tree/master/dependency_management
#
# VERSION = 2020.01.29

dc = docker compose
run = $(dc) run --rm

all: help build push app test requirements clean trivy
.PHONY: all

help:                               ## Show this help.
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

build:                              ## Build docker image
	$(dc) build

push: build                         ## Push docker image to registry
	$(dc) push

app:                                ## Run app
	$(run) --service-ports app

dev:                                ## Run app locally for development
	$(dc) -f compose.yml -f compose.dev.yml build --build-arg BUILD_ENV=local --build-arg NGINX_CONF=nginx.local.conf
	$(dc) -f compose.yml -f compose.dev.yml up web-dev

test:                               ## Execute tests
	$(run) test $(ARGS)

requirements:                       ## Upgrade dependencies
	$(run) upgrade $(ARGS)

clean:                              ## Clean docker stuff
	$(dc) down -v --remove-orphans

trivy:                              ## Detect image vulnerabilities
	trivy image --ignore-unfixed nginxinc/nginx-unprivileged:mainline-alpine-slim

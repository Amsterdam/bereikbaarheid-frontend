# This Makefile is based on the Makefile defined in the Python Best Practices repository:
# https://github.com/Amsterdam/opdrachten_team_dev/tree/master/dependency_management
#
# VERSION = 2020.01.29
.PHONY: test

dc = docker compose
run = $(dc) run --rm

help:                               ## Show this help.
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

build:                              ## Build docker image
	$(dc) build

app:                                ## Run app
	$(run) --service-ports frontend

test:                               ## Execute tests
	$(run) test $(ARGS)

upgrade:                            ## Upgrade dependencies
	$(run) upgrade $(ARGS)

clean:                              ## Clean docker stuff
	$(dc) down -v --remove-orphans

trivy:                              ## Detect image vulnerabilities
	trivy image --ignore-unfixed nginx:stable-alpine

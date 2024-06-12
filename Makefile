# development
ENV ?= development

BUILD := build --parallel
UP := up
REMOVE := down -v --rmi all --remove-orphans
PULL := pull

DOCKER_COMPOSE := docker compose --env-file .env

DC_FILE := -f .infra/docker/$(ENV)/docker-compose.yaml

build:
	$(DOCKER_COMPOSE) $(DC_FILE) $(BUILD)
	@$(MAKE) remove-dangling

pull:
	$(DOCKER_COMPOSE) $(DC_FILE) $(PULL)

start:
	$(DOCKER_COMPOSE) $(DC_FILE) $(UP)

remove:
	$(DOCKER_COMPOSE) $(DC_FILE) $(REMOVE)
	@$(MAKE) remove-dangling

remove-dangling:
	docker image prune -f

remove-all:
	@$(MAKE) remove ENV=development

# Shortcuts for frequently used commands
.PHONY: dev prod db-init db-migrate db-push db-seed prune prune-dev prune-prod

dev:
	docker compose up

prod:
	docker compose -f docker-compose.prod.yml up

db-init: db-push db-seed

db-migrate:
	docker container exec kanban-next npx prisma migrate dev

db-push:
	docker container exec kanban-next npx prisma db push

db-seed:
	docker container exec kanban-next npx prisma db seed

prune: prune-dev prune-prod

prune-dev:
	docker compose down --volumes --rmi all

prune-prod:
	docker compose -f docker-compose.prod.yml down --volumes --rmi all

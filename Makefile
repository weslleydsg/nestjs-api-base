include .env

.PHONY: production
production: dir
	yarn prebuild
	yarn build
	docker-compose -f docker-production.yml up -d

.PHONY: up
up: dir
	docker-compose up -d

.PHONY: postup
postup: up logs

.PHONY: dev
dev: up
	yarn start:dev

.PHONY: restart
restart: down dev

.PHONY: down
down:
	docker-compose down --remove-orphans

.PHONY: logs
logs:
	docker-compose logs -f

.PHONY: dir
dir:
	mkdir -p dbdata/pg dbdata/mongo

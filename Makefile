.PHONY: dev stop-dev shell-backend shell-client build-backend build-client 

CMD?=bash

dev:
	docker-compose -f docker-compose.dev.yml up

stop-dev:
	docker-compose -f docker-compose.dev.yml down

shell-backend:
	docker-compose -f docker-compose.dev.yml run table-backend $(CMD)

shell-client:
	docker-compose -f docker-compose.dev.yml run table-client $(CMD)

build-backend:
	docker build -t adroste/tableapp-backend ./backend

build-client:
	docker build -t adroste/tableapp-client ./client
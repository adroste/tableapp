.PHONY: dev build-backend build-client

dev:
	docker-compose -f docker-compose.dev.yml up

build-backend:
	docker build -t adroste/tableapp-backend ./backend

build-client:
	docker build -t adroste/tableapp-client ./client
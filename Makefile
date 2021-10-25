.PHONY: dev stop-dev shell-backend shell-client shell-mongo build-backend build-client publish-backend publish-client

CMD?=bash

dev:
	docker-compose -f docker-compose.dev.yml up

stop-dev:
	docker-compose -f docker-compose.dev.yml down

shell-backend:
	docker-compose -f docker-compose.dev.yml run tableapp-backend $(CMD)

shell-client:
	docker-compose -f docker-compose.dev.yml run tableapp-client $(CMD)

shell-mongo:
	docker-compose -f docker-compose.dev.yml run mongo $(CMD)

build-backend:
	docker build -t adroste/tableapp-backend ./backend

build-client:
	docker build -t adroste/tableapp-client ./client

publish-backend:
	docker push adroste/tableapp-backend

publish-client:
	docker push adroste/tableapp-client
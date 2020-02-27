build:
	docker build -t ziqiancheng/data-source-service:latest -f ./Dockerfile .
	docker push ziqiancheng/data-source-service:latest
build-mysql:
	docker build -t ziqiancheng/funceasy-mysql:latest -f ./Dockerfile.mysql .
	docker push ziqiancheng/funceasy-mysql:latest
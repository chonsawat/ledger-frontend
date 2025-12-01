# ---------------------------------------------------------------
# Build and Deploy
# ---------------------------------------------------------------
deploy: clear-old-deploy	
	@echo ""
	@echo "Docker start container."
	-docker run -p 3000:3000 --name front_01 -dit --restart=unless-stopped frontend 

clear-old-deploy: docker-build
	@echo ""
	@echo "Docker killing Process."
	-docker kill front_01
	-docker rm front_01

docker-build:
	@echo ""
	@echo "Docker Building Process."
	docker build -t frontend .

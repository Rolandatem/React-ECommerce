REM Builds ONLY the react app with the Cloud Run internal URL, tags for prod, and pushes to Docker Hub
docker compose -f docker-compose.prod.yaml build --no-cache react-ecommerce
docker push estebanfmartinez/portfolio-react-ecommerce:prod
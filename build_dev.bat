REM Builds with localhost API URL, then runs all services locally
docker compose --profile dev -f docker-compose.yaml -f docker-compose.override.yaml up -d --build
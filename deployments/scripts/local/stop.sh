#!/bin/bash
docker compose -f deployments/docker-compose.yml -f deployments/docker-compose.dev.yml down

# docapiback

Backend for my React Todo App.

---

## 🚀 About

This is a backend service for a my todo application built with React.  
The server is developed using modern Node.js stack with **TypeScript**, **Prisma ORM**, and **PostgreSQL** as a database.  
The API is documented using **Swagger**.

---

## ⚙️ Tech Stack

- **Node.js** `v22.14.0`
- **Express** `v5`
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**
- **Swagger** for API documentation

---

## 💡 Features

- RESTful API for managing todo tasks
- JWT-based authentication
- PostgreSQL database support via Prisma
- Swagger UI available for interactive API documentation

---

## 📚 API Documentation

Swagger UI is available at:

[Swagger UI — Open API Docs](http://localhost:5000/api-docs)


# Docker Workflow for Development and Production

## Development Mode (🔥)

### Command from the Root Directory:
```bash
docker compose -f deployments/docker-compose.yml -f deployments/docker-compose.dev.yml up --build


docker compose -f deployments/docker-compose.yml -f deployments/docker-compose.prod.yml up --build

---

- **🔥 Development Mode**: Focuses on running with hot-reload and a Dockerized database. This helps during development, as changes are reflected without rebuilding the container each time.
  
- **🚀 Production Mode**: Designed for production with optimized settings. It builds the application without mounting files directly, making it suitable for deployment environments.

- **Accessing the Container**: Once the services are up, you can access the container for interactive management, for example, running migrations with Prisma.

Common Commands & Flags
Build Flags:
--build → Shows build progress and forces image rebuilding

-d → Detached mode (runs in background)

Container Access:

    docker compose exec -it server sh

npx prisma migrate dev

 docker exec -it deployments-postgres_db-1 psql -U postgres
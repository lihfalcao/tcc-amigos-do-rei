# Amigos do Rei System

**Project Overview:**

The "Amigos do Rei" project is a comprehensive system being developed as a graduation thesis for the Systems for Internet Development course at UTFPR-Guarapuava. This project will serve two primary purposes:

1. **Academic Work:** It will demonstrate the practical application of various technologies and concepts learned throughout the course, showcasing the ability to develop a robust web application from the ground up.

2. **Church System:** The project will also be tailored to support the Presbyterian Church of Bonssucesso, focusing on aiding Sunday School teachers in their work. It aims to provide a system that streamlines administrative tasks, manages class schedules, tracks student progress, and facilitates communication within the church community.

**Technologies Used:**

- **Frontend:** Angular
- **Backend:** Laravel
- **Database:** MySQL
- **Administration:** phpMyAdmin
- **Containerization:** Docker

  
**Project Structure:**

- **Frontend:** Contains Angular application files, including components, services, and configuration for building the user interface.
- **Backend:** Includes Laravel API and server-side logic to handle application data and business rules.
- **Database:** Configured to work with MySQL and managed through phpMyAdmin.

**Objective:**

To create a functional and user-friendly system that meets the requirements of both the academic and church contexts, demonstrating proficiency in modern web development practices and tools.

---

## Docker Setup

This project uses Docker to create isolated environments for the frontend, backend, and database components. Docker Compose is used to define and run multi-container Docker applications.\


### Docker Structure

- **`amigos-frontend/`**: Contains the Angular application.
- **`amigos-backend/`**: Contains the Laravel API.
- **`docker-compose.yml`**: Defines and configures the Docker containers.
- **`Dockerfile`**: Contains the instructions for building Docker images for the frontend and backend.

### Docker Containers

1. **Frontend**:
   - **Image**: Built from the Angular Dockerfile.
   - **Service Name**: `frontend`
   - **Ports**: 8082 (Nginx)

2. **Backend**:
   - **Image**: Built from the Laravel Dockerfile.
   - **Service Name**: `backend`
   - **Ports**: 8081 (Laravel)

3. **Database**:
   - **Image**: MariaDB
   - **Service Name**: `db`
   - **Ports**: 3307 (MariaDB)

4. **phpMyAdmin**:
   - **Image**: phpMyAdmin
   - **Service Name**: `phpmyadmin`
   - **Ports**: 8083 (phpMyAdmin)

### Docker Compose Configuration

The `docker-compose.yml` file defines all the services, networks, and volumes used in the project. It ensures that all containers can communicate with each other and are properly configured.

### Getting Started

To get started with the project, follow these steps:

1. **Install Docker and Docker Compose:**
   - Follow the official Docker installation guide for your operating system: [Docker Installation](https://docs.docker.com/get-docker/)
   - Install Docker Compose: [Docker Compose Installation](https://docs.docker.com/compose/install/)

2. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd amigos-do-rei

---

### Getting Started

#### Build and Start Containers

To build and start the Docker containers, use:

```bash
  docker-compose up --build
```

This command will:

- **Build the Docker images** for the frontend and backend.
- **Start the MariaDB and phpMyAdmin containers**.
- **Link all containers together** according to the configuration in `docker-compose.yml`.

### Access the Application

- **Frontend:** Open [http://localhost:8082](http://localhost:8082) in your web browser.
- **Backend API:** Access the API at [http://localhost:8081](http://localhost:8081).
- **phpMyAdmin:** Open [http://localhost:8083](http://localhost:8083) and use the credentials specified in the `docker-compose.yml` to manage the database.

### Stop and Remove Containers

To stop and remove the containers, use:

```bash
  docker-compose down
```
This command will stop all running containers and remove them along with their networks.

### Configuration

You can configure environment variables and other settings in the docker-compose.yml file. Adjust these settings based on your environment and requirements.

### Viewing Logs and Troubleshooting
If you encounter issues, you can view the logs for each container to help diagnose the problem:

1. Frontend Logs:
   ```bash
     docker-compose logs frontend
   ```
2. Backend Logs:
   ```bash
    docker-compose logs backend
   ```
3. Database Logs:
   ```bash
    docker-compose logs db
   ```
4. phpMyAdmin Logs:
    ```bash
     docker-compose logs phpmyadmin
    ```

If you encounter issues with the build process, ensure that your Dockerfiles and configuration files are correct. Check for common errors like missing files, incorrect paths, or misconfigurations in the Dockerfile or docker-compose.yml.

### Common Issues
- ENOENT Error: If you see an ENOENT error related to package.json, make sure that the package.json file is in the correct directory and is accessible from the container.

- Permission Errors: If there are permission issues, ensure that the file permissions are set correctly in the Dockerfile and that volumes are mounted properly.

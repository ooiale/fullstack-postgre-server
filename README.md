# Bloglist Backend Server

This is a backend server for a bloglist application implemented with React and PostgreSQL. The PostgreSQL server is initialized using a Docker container. This project is part of Exercise 13 of the Full Stack Open course.

## Features

- **User Authentication**: Implement login and logout functionality.
- **Blog Management**: Create, filter, and order blogs.
- **Admin Permissions**: Grant or revoke admin permissions for users.
- **User Management**: Disable users to restrict access.

## Technologies Used

- **Node.js**: Server-side JavaScript runtime.
- **Express**: Web framework for Node.js.
- **Sequelize**: Promise-based Node.js ORM for PostgreSQL.
- **PostgreSQL**: Relational database management system.
- **Docker**: Containerization platform for easy deployment.

## Getting Started

### Prerequisites

- Docker
- Node.js

### Installation

1. **Build the Docker image**:
   ```bash
   docker build -t bloglist-backend .
   docker run -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 bloglist-backend
   npm run dev



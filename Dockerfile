#here we define the env variables in build mode which does not necessariy mean its passed in run mode therefore we should start this container with the command
#docker run -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 blogs13

# Use the official PostgreSQL image as the base image
FROM postgres:latest

# Set environment variables
#ENV POSTGRES_USER=myuser
ENV POSTGRES_PASSWORD=mysecretpassword
#ENV POSTGRES_DB=mydatabase

# Copy initialization script
COPY commands.sql /docker-entrypoint-initdb.d/

# Expose the PostgreSQL port
EXPOSE 5432

# This command is inherited from the base image and starts the PostgreSQL server
CMD ["postgres"]

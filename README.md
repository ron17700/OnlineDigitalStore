# OnlineDigitalStore

OnlineDigitalStore is a web application for managing an online store.

## Getting Started

To run the server locally, follow these steps:

### Prerequisites

Make sure you have Docker and Node.js installed on your machine.

### Starting the Server

1. **Run Docker Compose:**  
   Use this command to start the MongoDB service defined in the `docker-compose.yml` file.

   ```bash
   docker-compose up -d

2. **Start the Node.js Server with Nodemon:**
   Use these commands to start the Node.js server using Nodemon, which monitors for any changes in your source code and automatically restarts the server.
   ```bash
   npm ci       # Install Node.js packages (clean install)
   ```
   ```bash
   npm run start:dev    # Start the server in dev mode
   ```
3. **Accessing the Application**
   Once the server is running, you can access the application at the following URL:

    http://localhost:3001

**Additional Information**
You can change server configuration in the `.env` file.

### Starting the Server and Client with Docker Compose

1. **Run Docker Compose:**  
   Use this command to start the Server and Client services defined in the `docker-compose.yml` file.

   ```bash
   docker-compose up -d
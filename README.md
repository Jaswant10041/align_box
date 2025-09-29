## Technologies Used
1. Used Sockets for communication (Socket.io v4.8.1)
2. Used MySQL as Database (mysql2)
3. Node js for backend (Express)
4. Html,CSS and Javascript for frontend

## Project Setup Instructions

### Prerequisites
1. Install Node.js (v14 or higher) from https://nodejs.org/
2. Install MySQL (v8 or higher) from https://dev.mysql.com/downloads/

### Setup Steps
1. Clone the repository
   ```bash
   git clone [repository-url]
   cd assignment
   ```

2. Set up MySQL Database
   - Open MySQL Command Line or MySQL Workbench
   - The database will be automatically created when you run init.sql:
     ```bash
     mysql -u [username] -p < sql/init.sql
     ```
   This will:
   - Create database 'chat_app'
   - Create messages table
   - Insert some initial messages

3. Configure Backend
   - Navigate to server directory:
     ```bash
     cd server
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a .env file in the server directory (optional, default values will work):
     ```
     DB_HOST=127.0.0.1
     DB_USER=root
     DB_PASSWORD=
     DB_NAME=chat_app
     ```

4. Start the Server
   Development mode with auto-reload:
   ```bash
   npm run dev
   ```
   Or production mode:
   ```bash
   npm start
   ```
   Server will start on http://localhost:3002

5. Access the Frontend
   - Open public/index.html in your web browser
   - Or use a live server
   - Or Access the application at http://localhost:8080

If you complete all the above steps you can see our chat application working.

For better experience open frontend url in two different tabs and send message seperately.
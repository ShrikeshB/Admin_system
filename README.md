# Project Setup Guide

## Prerequisites
Make sure you have the following installed on your system:
- Node.js (Latest LTS version recommended)
- npm (Node Package Manager)

## Installation & Setup
Follow these steps to run the project locally:

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Navigate to the Client Folder**
   ```bash
   cd client
   ```

4. **Install Client Dependencies**
   ```bash
   npm install
   ```

5. **Start the Frontend Development Server**
   ```bash
   npm start
   ```

6. **Navigate to the Server Folder**
   ```bash
   cd ../server
   ```

7. **Install Server Dependencies**
   ```bash
   npm install
   ```

8. **Start the Backend Server**
   ```bash
   nodemon server.js
   ```

9. **Access the Application**
   Open your browser and go to:
   ```
   http://localhost:3000/
   ```

## Additional Notes
- Ensure the backend server is running before accessing the frontend.
- If you encounter errors, try running `npm audit fix` or reinstalling dependencies using `npm ci`.
- The application will automatically reload when you make changes to the code.

## License
This project is licensed under [MIT License](LICENSE).


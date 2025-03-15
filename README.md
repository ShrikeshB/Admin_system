# Project Setup Guide

## Prerequisites
Make sure you have the following installed on your system:
- Node.js (Latest LTS version recommended)
- npm (Node Package Manager)
- MongoDB (Locally or Cloud-based like MongoDB Atlas)

## Installation & Setup
Follow these steps to run the project locally:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/ShrikeshB/Admin_system
   cd Admin_system
   ```

2. **Set Up MongoDB**
   - Start your MongoDB server.
   - Create a new database named **Admin_System**.
   - Inside the **Admin_System** database, create a collection named **admins**.
   - Insert sample admin details with the following fields:
     ```json
     {
       "name": "Admin Name",
       "email": "admin@example.com",
       "password": "hashed_password",
       "createdAt": "2025-03-15T00:00:00Z"
     }
     ```

3. **Navigate to the Server Folder**
   ```bash
   cd server
   ```

4. **Install Server Dependencies**
   ```bash
   npm install
   ```

5. **Start the Backend Server**
   ```bash
   nodemon server.js
   ```

6. **Navigate to the Client Folder**
   ```bash
   cd client
   ```

7. **Install Client Dependencies**
   ```bash
   npm install
   ```

8. **Start the Frontend Development Server**
   ```bash
   npm start
   ```

9. **Access the Application**
   Open your browser and go to:
   ```
   http://localhost:3000/
   ```

## Additional Notes
- Ensure MongoDB is running before starting the backend server.
- Ensure the backend server is running before accessing the frontend.
- If you encounter errors, try running `npm audit fix` or reinstalling dependencies using `npm ci`.
- The application will automatically reload when you make changes to the code.

## License
This project is licensed under [MIT License](LICENSE).


# Screenshots
Admin Login 
![image](https://github.com/user-attachments/assets/7f834584-5703-4e55-960e-b067102cb5ea)


Dashboard 
![image](https://github.com/user-attachments/assets/eca24286-ac65-4f75-9620-872b06f46bc9)

Manage Agents
![image](https://github.com/user-attachments/assets/01722b65-5711-458f-8f7f-ff55fc326b28)

Add new Agent
![image](https://github.com/user-attachments/assets/a64539fd-1dc6-445e-b6c4-ea2eb8a7f34c)


Details of agents
![image](https://github.com/user-attachments/assets/f26132b6-3383-4b25-86f6-f152b7342c59)

Details of list data
![image](https://github.com/user-attachments/assets/8f9ae147-4d7c-4030-ba9d-e2239c58ec9f)

Update Agent
![image](https://github.com/user-attachments/assets/5d406145-92ff-424b-8699-64b05ab14168)

Manages Files
![image](https://github.com/user-attachments/assets/2c2b4f65-505a-4d15-8202-5b28d4238840)



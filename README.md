# Full Stack Portfolio Website – DecodeLabs Week 2

## Overview

This project is the Week 2 submission for the DecodeLabs Full Stack Development Program.

The project extends my Week 1 responsive portfolio website by integrating a Node.js and Express.js backend. The contact form is connected to RESTful API endpoints, allowing users to submit messages directly from the frontend. The backend validates user input, sends email notifications using Nodemailer, and returns appropriate API responses.

---

## Features

### Frontend Features

* Responsive Portfolio Website
* Mobile-First Design
* Sticky Navigation Bar
* Hamburger Menu for Mobile Devices
* Scroll Reveal Animations
* Active Navigation Highlighting
* Interactive Skill Tags
* Contact Form Validation
* API Integration using Fetch API

### Backend Features

* RESTful API using Express.js
* Contact Form Submission Endpoint
* Input Validation
* Email Notifications using Nodemailer
* Auto Reply Email to Users
* JSON API Responses
* Environment Variable Management using dotenv
* CORS Support

---

## Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript (ES6)

### Backend

* Node.js
* Express.js
* Nodemailer
* dotenv
* CORS

---

## Project Structure

```text
project/
│
├── Frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── Backend/
│   ├── controllers/
│   │   └── contactController.js
│   │
│   ├── routes/
│   │   └── contactRoutes.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Navigate to Backend Folder

```bash
cd Backend
```

### Install Dependencies

```bash
npm install
```

---

## Required Packages

```bash
npm install express cors nodemailer dotenv
npm install nodemon --save-dev
```

---

## Environment Variables

Create a `.env` file inside the backend folder:

```env
PORT=5000

EMAIL=your-email@gmail.com

APP_PASSWORD=your-google-app-password
```

> Note: Use a Google App Password instead of your Gmail account password.

---

## Running the Application

### Backend

Development Mode:

```bash
npm run dev
```

Production Mode:

```bash
npm start
```

Backend URL:

```text
http://localhost:5000
```

### Frontend

Run using VS Code Live Server.

Frontend URL:

```text
http://127.0.0.1:5500
```

---

## API Endpoints

### Home Route

```http
GET /
```

Response:

```json
{
  "success": true,
  "message": "Portfolio Backend Running"
}
```

---

### Submit Contact Form

```http
POST /api/contact
```

Request Body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello Shivam!"
}
```

Response:

```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

---

### Get Submitted Messages

```http
GET /api/contact
```

Response:

```json
{
  "success": true,
  "total": 1,
  "data": [
    {
      "id": 123456,
      "name": "John Doe",
      "email": "john@example.com",
      "message": "Hello Shivam!"
    }
  ]
}
```

---

## Contact Form Workflow

```text
User
 ↓
Portfolio Contact Form
 ↓
Frontend Validation
 ↓
POST /api/contact
 ↓
Express Backend
 ↓
Input Validation
 ↓
Nodemailer
 ↓
Email Sent
 ↓
Success Response
 ↓
Frontend Success Message
```

---

## Validation Rules

The backend validates:

* Name must not be empty
* Email must be in valid format
* Message must not be empty

Invalid requests return:

```http
400 Bad Request
```

---

## HTTP Status Codes Used

| Status Code | Meaning               |
| ----------- | --------------------- |
| 200         | OK                    |
| 201         | Created               |
| 400         | Bad Request           |
| 500         | Internal Server Error |

---

## Testing

### Backend Testing

Open:

```text
http://localhost:5000
```

Expected:

```json
{
  "success": true,
  "message": "Portfolio Backend Running"
}
```

### API Testing

Open:

```text
http://localhost:5000/api/contact
```

or test using Postman.

### Frontend Testing

1. Run frontend using Live Server.
2. Navigate to Contact Section.
3. Fill all fields.
4. Submit the form.
5. Verify:

   * Success message appears.
   * Email notification is received.
   * API returns a successful response.

---

## Learning Outcomes

Through this project I learned:

* Backend API Development
* Express.js Routing
* Request and Response Handling
* Form Validation
* Environment Variables
* Email Integration with Nodemailer
* Frontend and Backend Communication
* REST API Development
* API Testing using Postman

---

## Future Enhancements (Week 3)

* MongoDB Atlas Integration
* Mongoose ODM
* Persistent Database Storage
* Full CRUD Operations
* Message Management Dashboard

---

## Author

**Shivam Upadhyay**

B.Tech Student | Full Stack Developer | MERN Stack Enthusiast

GitHub: https://github.com/ShivamBytes18

LinkedIn: https://www.linkedin.com/in/shivam-upadhyay-0811182aa

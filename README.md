# Password Manager App 🔒

A secure and user-friendly password manager built with React, TailwindCSS, PHP, and MySQL. This application allows users to store, manage, and retrieve their passwords securely.

## Features

- Encrypts passwords for secure storage
- Password data stored in MySQL database
- Backend API built with PHP
- Clean UI with TailwindCSS

## Technologies Used

- **Frontend**: React, React Router, Context API, TailwindCSS, SCSS
- **Backend**: PHP, MySQL
- **Security**: bcrypt

## Project Structure
```text
src/ 
├── FrontEnd/
│ ├── components/
│ ├── context/
│ ├── layouts/
│ ├── pages/
│ ├── services/
│ └── types/
│── Backend/
│ ├── Controllers/
│ ├── Core/
│ ├── Models/
│ └── index.php
└── README.md
```

## API Endpoints

| Method | Endpoint           | Description              |
| ------ | ------------------ | ------------------------ |
| POST   | /read/password     | Get password by ID       |
| POST   | /create/password   | Add a new password entry |
| POST   | /delete/password   | Delete a password entry  |
| POST   | /update/password   | Edit password entry      |
| GET    | /read/passwords    | Get all user passwords   |

## Installation & Setup

### Frontend
Clone the repository:
```bash
git clone https://github.com/masoudnick/Password-Manager.git
cd password-manager
npm install
npm run dev
```
### Backend Setup
Run the backend using a local server (Apache or PHP built‑in server):

```bash
php -S localhost:3001
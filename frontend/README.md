# MERN Task Manager

A simple MERN stack application for managing tasks, built for a DevOps and deployment assignment.

This project includes a React frontend, an Express/Node.js backend, and is configured for CI/CD with GitHub Actions, with deployment to Vercel and Render.

## Live URLs

*   **Frontend (Vercel):** `https://YOUR-FRONTEND-URL.vercel.app`
*   **Backend (Render):** `https://YOUR-BACKEND-URL.onrender.com`
*   **Health Check:** `https://YOUR-BACKEND-URL.onrender.com/health`

## Features

*   Create, view, and delete tasks.
*   RESTful API for task management.
*   Secure backend with `helmet`.
*   CI/CD pipelines for automated testing and deployment.

## Tech Stack

*   **Frontend:** React
*   **Backend:** Node.js, Express
*   **Database:** MongoDB Atlas
*   **Deployment:** Vercel (Frontend), Render (Backend)
*   **CI/CD:** GitHub Actions

---

## Setup and Local Development

### Prerequisites

*   Node.js (v18.x or later)
*   npm
*   A free MongoDB Atlas account

### 1. Clone the repository

```sh
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

### 2. Backend Setup

```sh
cd backend
npm install

# Create a .env file from the example
cp .env.example .env
```
Now, edit the `.env` file and add your MongoDB Atlas connection string and a port number.

```
MONGO_URI="mongodb+srv://..."
PORT=5000
```

Start the backend server:
```sh
npm start
```
The backend will be running at `http://localhost:5000`.

### 3. Frontend Setup

```sh
cd ../frontend
npm install
```

Start the frontend development server:
```sh
npm start
```
The frontend will open at `http://localhost:3000` and connect to your local backend.

---

## CI/CD Screenshots

*(Add your screenshots here after your GitHub Actions have run successfully)*

### Frontend CI/CD Pipeline
![Frontend CI/CD](link_to_your_screenshot.png)

### Backend CI/CD Pipeline
![Backend CI/CD](link_to_your_screenshot.png)

---

## Monitoring and Maintenance Plan

### Monitoring

*   **Health Checks:** The backend includes a `/health` endpoint that returns a `200 OK` status.
*   **Uptime Monitoring:** An external service like **UptimeRobot** is configured to ping the `/health` endpoint every 5 minutes and send an alert if the service is down.
*   **Logging:** The backend uses `morgan` for logging HTTP requests. For production, logs are collected by the Render platform and can be reviewed in the dashboard to debug issues.

### Maintenance

*   **Backups:** MongoDB Atlas is configured to take automatic daily snapshots of the database, with a retention period of 7 days. Manual backups can be triggered before major changes.
*   **Updates:** Dependencies are regularly audited for security vulnerabilities using `npm audit`. Security patches will be applied immediately by creating a new branch, testing, and merging to `main` to trigger an automated deployment.
*   **Rollback Plan:**
    *   **Render (Backend):** In case of a failed deployment, Render allows for instant rollbacks to any previous successful deployment directly from the dashboard.
    *   **Vercel (Frontend):** Vercel keeps all previous deployments immutable. To roll back, a specific previous deployment can be instantly promoted to the production alias.
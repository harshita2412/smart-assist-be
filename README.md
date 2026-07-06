# Smart Assist

A full-stack task management app: an Express + MongoDB REST API
deployed on AWS with a complete CI/CD pipeline, and a React frontend
(in `client/`).

## 🏗️ Architecture

- **Frontend:** React (Vite) — lives in `client/`
- **Runtime:** Node.js + Express.js
- **Database:** MongoDB Atlas (cloud)
- **Containerization:** Docker
- **Cloud:** AWS (ECS Fargate, ECR, Lambda, SES, EventBridge)
- **CI/CD:** GitHub Actions

## 🚀 Deployment Pipeline

Every push to `main` automatically:
1. Builds a Docker image
2. Pushes it to AWS ECR
3. Deploys to AWS ECS Fargate

## 📦 AWS Services Used

| Service | Purpose |
|---------|---------|
| ECR | Docker image registry |
| ECS Fargate | Serverless container hosting |
| Lambda | Daily task summary function |
| SES | Email notifications |
| EventBridge | Scheduled Lambda triggers |
| S3 | File storage (future) |

## 🔧 Local Setup

### Prerequisites
- Node.js 18+
- Docker Desktop
- MongoDB (local or Atlas)

### Run locally
```bash
# Clone the repo
git clone https://github.com/harshita2412/smart-assist-be.git
cd smart-assist-be

# Create .env file
cp .env.example .env
# Fill in your values

# Run with Docker
docker compose up --build
```

### Run the frontend
```bash
cd client
npm install
npm run dev
# App runs at http://localhost:5173 and proxies /api to the backend on port 3000
```

For a production build (`npm run build` in `client/`), set `VITE_API_URL`
to the deployed backend URL so API calls go to the right host.

## 🔐 Environment Variables
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/users/register | Register new user |
| POST | /api/users/login | Login and get JWT token |

### Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Get all tasks |
| POST | /api/tasks | Create a task |
| PUT | /api/tasks/:id | Update a task |
| DELETE | /api/tasks/:id | Delete a task |

## ⚡ Lambda Function

A scheduled Lambda function runs daily at 9am IST:
- Connects to MongoDB Atlas
- Fetches all pending tasks
- Sends a summary email via AWS SES

## 🐳 Docker

```bash
# Build image
docker build -t smart-assist-app .

# Run with compose
docker compose up -d

# Check logs
docker compose logs app
```

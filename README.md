# Smart Assist Backend

A production-grade RESTful API backend for task management, 
fully deployed on AWS with a complete CI/CD pipeline.

## 🏗️ Architecture

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

## 🔐 Environment Variables

# 📌 Internship Management System (IMS)

The **Internship Management System (IMS)** is a full-stack MERN project developed as part of my virtual internship at **Internee.pk**.  
It follows a complete **Software Development Life Cycle (SDLC)** approach — starting from **SRS → Design → Implementation → Testing → Documentation**.

---

## 🚀 Features

### 👨‍💼 Admin
- Secure login & authentication.  
- Create & manage internship programs.  
- Approve/Reject intern applications (1 active internship per intern).  
- Assign tasks with deadlines.  
- Review intern submissions and provide feedback.  
- Monitor performance via dashboard.  

### 👨‍🎓 Intern
- Register & login securely.  
- Apply to one internship/domain at a time.  
- View assigned tasks & deadlines.  
- Submit work (files/links).  
- Receive feedback and track progress.  

---

## 🏗️ Tech Stack
- **Frontend:** React + Tailwind CSS  
- **Backend:** Node.js + Express  
- **Database:** MongoDB (Atlas)  
- **Authentication:** JWT-based role-based access control  
- **Deployment:** Cloud-ready (Vercel/Netlify for frontend, Render/Heroku for backend)  

---

## 📂 Project Structure
- **IMS/frontend** → React + Tailwind app (Admin & Intern dashboards)  
- **IMS/backend** → Node.js + Express backend with MongoDB models and APIs 
- **IMS/docker-compose.yaml** → use command docker-compose up --build to run both frontend and backend. (backend will run inside a docker container)
- **IMS/SDLC** → Software Development Life Cycle (SRS → Design → Implementation → Testing → Documentation) 

(Each folder has its own README for setup and usage instructions.)  

---

## ⚡ Getting Started

### Prerequisites
- Node.js >= 16  
- MongoDB Atlas (or local MongoDB instance)  

### Setup
1. Clone the repo:
   ```bash
   git clone https://github.com/alikhan-devs/Internee.pk-internships.git
   cd Internee.pk-internships/IMS

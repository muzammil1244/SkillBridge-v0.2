# 🕊️ SkillBridge

> A full-stack MERN job portal platform where **Recruiters** post opportunities and **candidate (Job Seekers)** find their next role — with real-time chat, resume building, and application tracking.

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</p>

---

## 🔗 Live Demo

👉 **Live URL:** [https://skillbridge-inky.vercel.app](https://skillbridge-inky.vercel.app/employer/home)  
📁 **GitHub:** [github.com/muzammil1244/SkillBridge-v0.2](https://github.com/muzammil1244/SkillBridge-v0.2)

---

## 📌 Project Overview

**SkillBridge** is a two-sided job marketplace built on the MERN stack.

| Role | Description |
|------|-------------|
| 🏢 **Recruiter** | Posts jobs, reviews applications, chats with candidates |
| 👨‍💻 **candidate (Job Seeker)** | Searches jobs, applies, builds resume, tracks applications |

---

## ✨ Key Features

- 🔐 JWT-based Authentication with Role-Based Access Control
- 📋 Full Job CRUD — Post, Edit, Delete, View Jobs
- 🔍 Advanced Search & Filter with Infinite Scroll
- 💬 Real-Time Live Chat powered by Socket.IO
- 📄 Resume Builder (jsPDF) + Resume Upload & Preview
- 📊 Application Tracking Dashboard
- ☁️ Cloudinary Image Uploads
- 🌗 Dark / Light Theme Support
- 🧾 Profile Management for both roles

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| React.js | UI Framework |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| Hugeicons-React | Icon Library |
| Redux Toolkit | State Management |
| jsPDF | Resume Builder |

### Backend
| Technology | Purpose |
|-----------|---------|
| Node.js + Express.js | REST API Server |
| MongoDB + Mongoose | Database |
| JWT + bcrypt.js | Authentication & Security |
| Socket.IO | Real-Time Communication |
| Cloudinary | Media Storage |

### Deployment
| Service | Usage |
|---------|-------|
| Vercel | Frontend |
| Render | Backend |
| MongoDB Atlas | Cloud Database |

---

## 📸 Screenshots

### 🔑 Authentication

| Register | Login |
|----------|-------|
| ![Register](https://raw.githubusercontent.com/muzammil1244/SkillBridge-v0.2/main/client/src/readme_images/register.png) | ![Login](https://raw.githubusercontent.com/muzammil1244/SkillBridge-v0.2/main/client/src/readme_images/login.png) |

---

### 🏢 Recruiter Side

> The **Recruiter** is the job poster — manages listings and reviews candidates.

| Home Page | Post a Job |
|-----------|------------|
| ![Recruiter Home](https://raw.githubusercontent.com/muzammil1244/SkillBridge-v0.2/main/client/src/readme_images/rec_home_page.png) | ![Create Job](https://raw.githubusercontent.com/muzammil1244/SkillBridge-v0.2/main/client/src/readme_images/rec_create_job.png) |

| Applications Received | Review Application |
|-----------------------|-------------------|
| ![Applications](https://raw.githubusercontent.com/muzammil1244/SkillBridge-v0.2/main/client/src/readme_images/rec_application.png) | ![Review](https://raw.githubusercontent.com/muzammil1244/SkillBridge-v0.2/main/client/src/readme_images/em_review_application.png) |

---

### 👨‍💻 candidate (Job Seeker) Side

> The **Employer** is the job seeker — browses listings, applies, and builds their resume.

| Home Page | View Jobs |
|-----------|-----------|
| ![Employer Home](https://raw.githubusercontent.com/muzammil1244/SkillBridge-v0.2/main/client/src/readme_images/em_home_page.png) | ![View Job](https://raw.githubusercontent.com/muzammil1244/SkillBridge-v0.2/main/client/src/readme_images/em_view_job.png) |

| Apply for Job | Application Status |
|---------------|--------------------|
| ![Apply Job](https://raw.githubusercontent.com/muzammil1244/SkillBridge-v0.2/main/client/src/readme_images/em_apply_job.png) | ![Application Status](https://raw.githubusercontent.com/muzammil1244/SkillBridge-v0.2/main/client/src/readme_images/em_application_status.png) |

| Resume Builder | Reviews |
|----------------|---------|
| ![Resume](https://raw.githubusercontent.com/muzammil1244/SkillBridge-v0.2/main/client/src/readme_images/em_resume_create.png) | ![Reviews](https://raw.githubusercontent.com/muzammil1244/SkillBridge-v0.2/main/client/src/readme_images/em_review.png) |

---

### 💬 Live Chat & Themes

| Real-Time Chat | Dark Theme |
|----------------|------------|
| ![Chat](https://raw.githubusercontent.com/muzammil1244/SkillBridge-v0.2/main/client/src/readme_images/chat_page.png) | ![Dark Theme](https://raw.githubusercontent.com/muzammil1244/SkillBridge-v0.2/main/client/src/readme_images/re_black_theme.png) |

---

## 🧩 Folder Structure

```
SkillBridge-v0.2/
│
├── client/                  # React Frontend
│   ├── src/
│   │   ├── components/      # Reusable UI Components
│   │   ├── pages/           # Route-level Pages
│   │   ├── redux/           # Redux Toolkit Store & Slices
│   │   ├── utils/           # Helper Functions
│   │   └── readme_images/   # Project Screenshots
│   └── package.json
│
├── server/                  # Node.js + Express Backend
│   ├── controllers/         # Business Logic
│   ├── models/              # Mongoose Schemas
│   ├── routes/              # API Routes
│   ├── middleware/          # Auth & Error Middleware
│   └── server.js
│
└── README.md
```

---

## ⚙️ Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/muzammil1244/SkillBridge-v0.2.git
cd SkillBridge-v0.2
```

### 2. Backend Setup

```bash
cd server
npm install
cp .env.example .env   # Fill in your environment variables
npm start
```

### 3. Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `/server` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=http://localhost:5173
```

---

## 👨‍💻 Author

**Mohammad Muzammil**  
📧 muzammil844641@gmail.com  
💼 [LinkedIn](https://www.linkedin.com/in/muzammil1244/)  
💻 [GitHub](https://github.com/muzammil1244)

---

<p align="center">Built with ❤️ using the MERN Stack</p>

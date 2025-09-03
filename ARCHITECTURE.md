# AetherAI Architecture

This document outlines the full-stack architecture of **AetherAI**, the world's first open-source AI research platform built entirely by a high school student from Egypt — **Kareem Mostafa**.

Built entirely from a **mobile device in Future City, Cairo, Egypt**, AetherAI proves that innovation has no borders.

---

## 🧩 System Overview

AetherAI is a **full-stack web application** with the following structure:

```
AetherAI v4.4.0
│
├── frontend/          → React-based user interface
│   ├── public/
│   └── src/
│       ├── components/     → Reusable UI components
│       ├── services/       → API communication
│       ├── i18n/           → Multilingual support
│       └── App.jsx         → Main application component
│
├── backend/           → FastAPI (Python) server
│   ├── routes/         → API endpoints
│   ├── utils/          → Business logic and AI logic
│   └── main.py         → API entry point
│
├── docs/              → Documentation files
│   ├── README.md
│   ├── CONTRIBUTING.md
│   ├── LICENSE
│   └── ... (10+ files)
│
└── requirements.txt   → Python dependencies
```

---

## 🖥️ Frontend Architecture

### Framework
- **React** – Component-based UI
- **Tailwind CSS** – Utility-first styling
- **PWA** – Progressive Web App for offline use

### Key Components
| Component | Purpose |
|--------|--------|
| `App.jsx` | Central orchestrator of the entire user journey |
| `DatasetUploader` | Upload or select datasets |
| `TrainingDashboard` | Real-time training simulation |
| `AIInsights` | AI-generated natural language analysis |
| `ReportGenerator` | Auto-generate PDF experiment reports |
| `AdaptiveLearningPath` | Personalized learning journey |
| `TeacherAlerts` | Identify students needing support |
| `ARTrainingVisualizer` | 3D neural network visualization |

### State Management
- React Hooks (`useState`, `useEffect`)
- Centralized API service (`api.js`)

### Multilingual Support
- Built-in i18n system
- Supports: Arabic, English, French, Spanish, Chinese

---

## ⚙️ Backend Architecture

### Framework
- **FastAPI** – Modern, fast (high-performance) Python web framework
- **Pydantic** – Data validation and settings management
- **CORS** – Cross-origin resource sharing for frontend connectivity

### API Structure
| Directory | Purpose |
|---------|--------|
| `routes/` | RESTful API endpoints (e.g., `/api/v1/datasets`, `/api/v1/training`) |
| `utils/` | Core logic (e.g., adaptive learning, carbon savings, model interpretability) |
| `main.py` | Central FastAPI app with all routers included |

### Key Features
- RESTful API design
- Automatic OpenAPI documentation (`/docs`)
- Error handling with user-friendly messages
- Modular structure for scalability

---

## 📡 API Integration

### `services/api.js`
- Centralized HTTP client using **Axios**
- Handles all communication between frontend and backend
- Includes error handling, loading states, and user alerts
- Supports file uploads, real-time data, and PDF downloads

### Example API Call
```js
const result = await ApiService.generateLearningPath({
  student_id: "std_123",
  name: "Kareem Mostafa",
  current_level: "intermediate",
  interests: ["AI", "Machine Learning"]
});
```

---

## 🌐 Data Flow

1. **User Interaction** → Frontend (React)
2. **API Request** → `services/api.js` → Axios → Backend
3. **Processing** → FastAPI → `utils/` logic
4. **Response** → JSON → Frontend
5. **UI Update** → React re-renders components

---

## 🧠 AI-Powered Features

| Feature | Technology Used |
|--------|-----------------|
| Model Interpretability | Saliency maps, feature importance |
| Energy Efficiency | Power consumption calculation, carbon savings |
| Adaptive Learning | Student profiling, recommendation engine |
| Teacher Alerts | Performance & engagement analysis |
| Research Trends | Interest-based recommendations |
| Code Auto-Completion | Pattern matching, error analysis |
| Dataset Quality | Data health scoring |
| Ethics & Bias Detection | Bias detection algorithms |
| Voice Assistant | Web Speech API |
| AR/VR Visualization | Three.js (3D rendering) |

---

## 🛡️ Security & Reliability

- **HTTPS** recommended in production
- **Input Validation** via Pydantic
- **Error Handling** with user alerts
- **Security Policy** (`SECURITY.md`)
- **PWA** for offline reliability

---

## 🚀 Deployment

### Frontend
- Hosted on **GitHub Pages** or **Vercel**
- PWA for mobile installation

### Backend
- Can be hosted on **Railway**, **Render**, or any Python host
- Runs on `http://localhost:8000` in development

---

## 🌍 Vision

> **"To become the Kaggle for Students — accessible, educational, and free."**

Built with ❤️ in **Egypt** by **Kareem Mostafa**

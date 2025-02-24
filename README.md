# 📝 To-Do Application (Django + React)

A simple To-Do application built using **Django (Backend)** and **React (Frontend)**.  
Users can **Create, Read, Update, and Delete (CRUD)** tasks, mark them as completed, and filter tasks (All, Completed, Pending).

---

## 🚀 Features
✅ **Add To-Do** - Users can create a new to-do task.  
✅ **View To-Do List** - Display all to-dos with status (completed or pending).  
✅ **Edit To-Do** - Users can update the title of an existing task.  
✅ **Mark as Completed** - Toggle between completed and pending state.  
✅ **Delete To-Do** - Remove a task from the list.  
✅ **Filter To-Dos** - Show All, Completed, or Pending tasks.  

---

## 🛠️ Tech Stack

### **Backend (Django + Django REST Framework)**
- Python 3+
- Django 4+
- Django REST Framework (DRF)
- CORS Headers (for frontend-backend communication)

### **Frontend (React + Axios + Bootstrap CSS)**
- React.js (useState, useEffect)
- Axios (for API requests)
- Bootstrap

---

## 🔧 Installation & Setup

### 1. Clone the Repository**

- git clone https://github.com/Tinakhandelwal/todo-application.git
- cd todo-application/todo-app

### 2. Backend Setup (Django)**
- cd backend
- python -m venv venv        # Create Virtual Environment
- venv\Scripts\activate       # Activate Virtual Environment (Windows)
- pip install -r requirements.txt  # Install dependencies
- python manage.py migrate    # Apply migrations
- python manage.py runserver  # Start Django server

### 3. Frontend Setup (React)**
- cd ../frontend
- npm install      # Install dependencies
- npm start        # Start React server

### 4. Running Tests (Django)**
- python manage.py test



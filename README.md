# 📡 Content Broadcasting System (Backend)

A backend system where teachers upload content, principals approve it, and students access it via public APIs with subject-based scheduling and rotation.

---

## 🚀 Tech Stack

* Node.js
* Express.js
* MySQL
* JWT Authentication
* Multer (File Upload)
* bcrypt (Password Hashing)

---

## 📁 Project Structure

```
src/
├── controllers/
├── routes/
├── services/
├── models/
├── middlewares/
├── utils/
├── config/
└── app.js
```

---

## 🔐 Authentication & RBAC

* JWT-based authentication
* Role-based access control

### Roles:

* **Principal** → approve/reject content, manage users
* **Teacher** → upload content
* **Student** → access public content

---

## 👤 User APIs

### 🔹 Register

POST `/api/v1/auth/register`

### 🔹 Login

POST `/api/v1/auth/login`

### 🔹 Update User Role (Principal Only)

PATCH `/api/v1/users/:id/role`

---

## 📤 Content APIs

### 🔹 Upload Content (Teacher Only)

POST `/api/v1/content/upload`

**Form Data:**

* title
* subject
* description (optional)
* start_time
* end_time
* file (jpg/png/gif)

---

## ✅ Approval APIs (Principal)

### 🔹 Get Pending Content

GET `/api/v1/content/pending`

### 🔹 Approve Content

PATCH `/api/v1/content/:id/approve`

### 🔹 Reject Content

PATCH `/api/v1/content/:id/reject`

---

## 📡 Public API

### 🔹 Get Live Content (Student)

GET `/api/v1/content/live/:teacherId`

**Response:**

* Only approved content
* Only within time window
* Applies rotation logic

---

## 🔄 Scheduling Logic

* Each subject has independent rotation
* Content rotates based on duration
* Uses current time to determine active content

### Example:

**Maths Rotation**

* Content A → 5 min
* Content B → 5 min
* Content C → 5 min
  → Loop continues

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone <your-repo-link>
cd project-folder
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file:

```
PORT=8000
JWT_SECRET=your_secret
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_db
```

### 4️⃣ Run Server

```bash
npm run dev
```

---

## 🧪 Testing APIs

Use **Postman** or **Thunder Client**

* Add JWT token in header:

```
Authorization: Bearer <token>
```

---

## ⚠️ Edge Cases Handled

* No content available → returns empty response
* Approved but outside time window → not shown
* Invalid subject → returns empty response
* File validation (type + size)

---

## 📌 Notes

* Files are stored locally in `/uploads`
* Only metadata is stored in DB
* System designed to be scalable (can integrate Redis/S3)

---

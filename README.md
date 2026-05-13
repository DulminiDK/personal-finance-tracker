# Personal Finance Tracker – Full-Stack Finance Management System

Personal Finance Tracker is a full-stack web application that allows users to securely manage income and expenses, monitor budgets, analyze financial activity, and organize transaction categories through a modern dashboard interface.

This project demonstrates full-stack development skills including authentication, REST API development, relational database design, CRUD operations, responsive UI design, and financial data visualization.

---

# 🚀 Features

## 🔐 Authentication System
- User Registration & Login
- JWT-based Authentication
- Protected Routes
- Secure User Sessions
- Password Encryption using bcryptjs
- User-specific data isolation

---

## 💸 Transaction Management
- Add income and expense transactions
- Edit existing transactions
- Delete transactions
- Categorize transactions
- Date-based transaction tracking
- Dynamic category selection

---

## 📊 Financial Dashboard
- Total Income Overview
- Total Expense Overview
- Current Balance Calculation
- Budget Usage Summary
- Interactive Financial Charts
- Latest Transactions Preview

---

## 🎯 Budget Management
- Create monthly budgets
- Update budgets
- Track spending progress
- Budget usage visualization
- Overspending indicators
- Category-based budget tracking

---

## 🗂️ Category Management
- Create custom categories
- Edit categories
- Delete categories
- Separate income & expense categories
- Fully dynamic database-driven categories

---

## 🔎 Transaction Filtering
- Filter by transaction type
- Filter by category
- Filter by date range
- Dynamic filtering system

---

## 📈 Charts & Analytics
- Expense visualization
- Income vs Expense comparison
- Financial activity insights
- Interactive chart components

---

## 🎨 Modern UI/UX
- Responsive dashboard design
- Modern fintech-inspired interface
- Sidebar navigation
- Reusable modal components
- Clean user experience
- Tailwind CSS styling

---

# 🛠️ Technologies Used

## Frontend
- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Recharts
- Axios
- React Icons

---

## Backend
- Node.js
- Express.js
- JWT Authentication
- bcryptjs
- REST API Architecture

---

## Database
- MySQL

---

# 🏗️ System Architecture

```txt
Frontend (React + Tailwind CSS)
        ↓
REST API (Express.js + Node.js)
        ↓
MySQL Database

# 📁 Project Structure

```txt
finance-tracker/
│
├── client/        → Frontend React Application
├── server/        → Backend Express API
├── README.md      → Project Documentation
├── .gitignore
```

---

# ⚙️ Setup Instructions

## 1️⃣ Clone Repository

```bash
git clone https://github.com/DulminiDK/personal-finance-tracker.git
```

---

## 2️⃣ Install Frontend Dependencies

```bash
cd client
npm install
```

---

## 3️⃣ Run Frontend

```bash
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

## 4️⃣ Install Backend Dependencies

```bash
cd server
npm install
```

---

## 5️⃣ Run Backend

```bash
npm start
```

OR

```bash
npm run dev
```

Backend runs on:

```txt
http://localhost:5000
```

---

## 6️⃣ Setup Database

### Create MySQL Database

```sql
CREATE DATABASE finance_tracker;
```

---

### Import Required Tables

Create:
- users
- transactions
- budgets
- categories

tables using the provided SQL queries.

---

### Configure Database Connection

Update database credentials inside:

```txt
server/src/config/db.js
```

OR use environment variables.

---

# 🔑 Environment Variables

Create a `.env` file inside the `server` folder and add:

```env
PORT=5000
JWT_SECRET=your_secret_key

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=finance_tracker
```

---

# 🔒 Security Features

- JWT Token Authentication
- Protected API Routes
- Password Hashing
- User-specific Database Queries
- Secure Backend Validation

---

# 📌 API Endpoints

## Authentication

```txt
POST /api/auth/register
POST /api/auth/login
```

---

## Transactions

```txt
GET    /api/transactions
POST   /api/transactions
PUT    /api/transactions/:id
DELETE /api/transactions/:id
```

---

## Budgets

```txt
GET    /api/budgets
POST   /api/budgets
PUT    /api/budgets/:id
```

---

## Categories

```txt
GET    /api/categories
POST   /api/categories
PUT    /api/categories/:id
DELETE /api/categories/:id
```

---

# 📸 Screenshots

## Dashboard
<img width="1917" height="865" alt="image" src="https://github.com/user-attachments/assets/bfebff4b-24b6-431a-a6ac-3667305ff626" />


---

## Transactions Page
<img width="1917" height="860" alt="image" src="https://github.com/user-attachments/assets/79cdcaba-6c72-45c1-9d16-7b572004913d" />

<img width="1917" height="861" alt="image" src="https://github.com/user-attachments/assets/b5d95b89-85f9-48c6-ad41-f55770f8a41e" />



---

## Budgets Page
<img width="1917" height="857" alt="image" src="https://github.com/user-attachments/assets/f26cd5d9-0e7b-4cb9-8c2a-0c08db1054c3" />

<img width="1917" height="857" alt="image" src="https://github.com/user-attachments/assets/2a1905f3-c556-4275-b1d4-aae10d879a61" />



---

## Categories Page
<img width="1917" height="862" alt="image" src="https://github.com/user-attachments/assets/ed238ac1-340f-4435-9ed4-22e23fe3e0c5" />

<img width="1917" height="862" alt="image" src="https://github.com/user-attachments/assets/ac4c36f8-e741-4f9f-a733-151567966175" />



---

# 🚧 Challenges Solved

- Dynamic category management
- Real-time dashboard updates
- Budget progress calculations
- Secure user isolation
- Reusable modal architecture
- Responsive dashboard layout

---

# 🔮 Future Improvements

- Recurring transactions
- Export reports (PDF/Excel)
- Advanced analytics
- Multi-currency support
- Cloud deployment
- Real-time notifications
- Mobile application support

---

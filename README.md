# Personal Finance Assistant Frontend

The **Personal Finance Assistant** is a platform designed to help users manage their finances seamlessly. It allows users to authenticate securely, track transactions, visualize financial data with graphs, and even parse PDFs to automatically extract expense details using Google Gemini AI.  

This repository contains the **frontend code** built with **React, Redux Toolkit, and Tailwind CSS**, connected to the Node.js + Express backend.


### Video Description of Personal Finance Assistant:
--- click [here](https://youtu.be/GKfgFFRIe8g?si=TP77IrugOeX005QB). to watch the video


---

## 🌟 Features

- 🔐 Google & Manual Login/Signup (JWT-based authentication)  
- 💸 Add, search, update, and delete transactions  
- 📊 Interactive expense graphs and insights  
- 📁 Profile management (view & edit user details)  
- 📑 PDF parsing via Gemini AI to extract structured transaction data  
- ✅ Protected routes using JWT stored in localStorage/session  
- 🌐 Responsive and modern UI with Tailwind CSS  

---

## 🚀 Tech Stack

**Frontend:**  
- React  
- Redux Toolkit  
- Tailwind CSS  
- React Router DOM  
- Axios  

**Backend (Connected To):**  
- Node.js + Express  
- MongoDB (Mongoose)  
- JWT Authentication  
- Google Gemini AI API  

---


## 🛠️ Installation & Setup

# 1. Clone the repository
git clone https://github.com/Shivam2004-coder/PersonalFinanceAssistant_Frontend.git

# 2. Install dependencies
npm install

# 3. Create a .env file in the root directory and add:
VITE_BASE_URL=http://localhost:3000/

# 4. Run the frontend
npm run dev


### 👤 Author
Made by Shivam Vaishnav
Feel free to reach out for collaboration or feedback.

### 📄 License
This project is open-source and available under the [MIT License](https://opensource.org/licenses/MIT).
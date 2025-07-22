# ⚡ MERN Stack E-Commerce Platform

A **robust, full-featured E-Commerce web application** built using the powerful **MERN stack** (MongoDB, Express.js, React.js, Node.js), integrated with modern tools and best practices.

---

## 🚀 What’s Inside

This project replicates a real-world e-commerce workflow end-to-end, including:

- 🛒 **Product Management**: Add, update, delete, and list products by category  
- 🔐 **User Authentication**: Secure login with JWT and protected routes  
- 🛍️ **Shopping Cart & Checkout**: Persistent cart, order flow, and order history  
- 💳 **Payment Integration**: Seamless checkout with PayPal  
- 📦 **Admin Dashboard**: Manage products, orders, and users  
- 🌟 **Ratings & Reviews**: User-generated product feedback  
- 🖼️ **Image Uploads**: Integrated with Cloudinary  
- 📱 **Responsive UI**: Built with Tailwind CSS and Shadcn UI  

---

## 🧰 Tech Stack

| Technology                | Role                        |
|---------------------------|-----------------------------|
| **MongoDB**               | NoSQL Database              |
| **Express.js**            | Backend Framework           |
| **React.js**              | Frontend Library            |
| **Node.js**               | Server Runtime              |
| **Redux Toolkit**         | State Management            |
| **Tailwind CSS + Shadcn UI** | Responsive UI           |
| **Cloudinary**            | Media Storage               |
| **PayPal**                | Payment Gateway Integration |

---

## 🛠️ Installation Guide

### 1. Clone the Repository

```bash
git clone https://github.com/ravi-sidharth/mern-ecommerce.git
cd mern-ecommerce
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with the following content:

```env
PORT=5000
NODE_ENV=development

MONGODB_URL=your_mongo_connection_string
JWT_SECRET=your_jwt_secret

CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret

CLIENT_URL=http://localhost:5173

PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
PAYPAL_MODE=sandbox
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

### 4. Start the Application

**Backend:**

```bash
npm start
```

**Frontend:**

```bash
npm start
```

---

## 🗂️ Project Structure

```
mern-ecommerce/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── App.js
│   └── public/
└── README.md
```

---

## ✅ Security & Best Practices

- JWT-based authentication with route protection  
- HTTPS and data encryption recommended in production  
- CORS and CSRF protection implemented  
- PCI DSS-aligned payment handling  

---

## 🤝 Contributing

- Contributions are welcome via **Issues** and **Pull Requests**  
- Please open an issue before submitting major changes  

---

## 📬 Contact

- **Developer**: Ravi  
- **Email**: [thenewravy@gmail.com](mailto:thenewravy@gmail.com)

---

## 📄 License

Released under the [MIT License](LICENSE).

---

## 🙌 Loved building this? Let’s connect!

If you encounter any bugs or have ideas for improvement, feel free to reach out or open an issue.

---
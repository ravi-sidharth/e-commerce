# Fullstack E-Commerce Website

A modern, full-featured e-commerce web application with user authentication, admin product management, shopping cart, checkout, and more.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Frontend Features](#frontend-features)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- User authentication (Sign Up, Sign In)
- Admin dashboard for product management
- Product listing, filtering, and details view
- Shopping cart functionality
- Address management for users
- Order creation and management
- Secure API with CORS, Helmet, and cookies

---

## Tech Stack

- **Backend:** Node.js, Express, MongoDB
- **Frontend:** React.js or Next.js (not included here)
- **Security:** Helmet, CORS, Cookie-Parser
- **Logging:** Custom logger utility

---

## Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
    ```
    git clone https://github.com/ravi-sidharth/e-commerce.git
    cd e-commerce
    ```

2. **Install dependencies**
    ```
    npm install
    ```

3. **Setup environment variables**

    Create a `.env` file in the root directory:

    ```
    PORT=3000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. **Start the server**
    ```
    npm run dev
    ```

---

## API Endpoints

### Auth

| Method | Endpoint           | Description          |
|--------|--------------------|----------------------|
| POST   | `/api/auth/signup` | Register a new user  |
| POST   | `/api/auth/signin` | User login           |

### Admin - Products

| Method | Endpoint                  | Description           |
|--------|---------------------------|-----------------------|
| GET    | `/api/admin/products`     | List all products     |
| POST   | `/api/admin/products/add` | Add a new product     |
| PUT    | `/api/admin/products/:id` | Update a product      |
| DELETE | `/api/admin/products/:id` | Delete a product      |

### Shop - Products

| Method | Endpoint                       | Description            |
|--------|--------------------------------|------------------------|
| GET    | `/api/shop/products/get`       | Get filtered products  |
| GET    | `/api/shop/products/get/:id`   | Get product details    |

### Shop - Cart

| Method | Endpoint                              | Description           |
|--------|---------------------------------------|-----------------------|
| POST   | `/api/shop/cart/add`                  | Add item to cart      |
| GET    | `/api/shop/cart/get/:userId`          | Get user's cart items |
| PUT    | `/api/shop/cart/update-cart`          | Update cart item qty  |
| DELETE | `/api/shop/cart/:userId/:productId`   | Remove item           |

### Shop - Address

| Method | Endpoint                                         | Description         |
|--------|--------------------------------------------------|---------------------|
| POST   | `/api/shop/address/add`                          | Add new address     |
| GET    | `/api/shop/address/get/:userId`                  | Get all addresses   |
| PUT    | `/api/shop/address/update/:userId/:addressId`    | Edit address        |
| DELETE | `/api/shop/address/delete/:userId/:addressId`    | Delete address      |

### Shop - Orders

| Method | Endpoint                   | Description     |
|--------|----------------------------|-----------------|
| POST   | `/api/shop/order/add`      | Place order     |
| GET    | `/api/shop/order/:userId`  | Get orders      |

---

## Frontend Features

- **Auth Pages:** Sign up and sign in
- **Admin View:**
  - Header and sidebar components
  - Products page: create, list, update, delete products
- **Shopper View:**
  - Header component
  - Product listing page with filters and search
  - Product details dialog/modal
  - Cart component (add, update, remove items)
  - Home page with featured products
  - Account page (view/edit profile, addresses)
  - Checkout page (address selection, order summary)
  - Search page (keyword/product search)
  - Product review functionality

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

[MIT](LICENSE)

---

**Happy Coding! 🚀**



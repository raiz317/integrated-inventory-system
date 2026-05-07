# Integrated-Inventory-System
Integrated Inventory & Supplier Management System for internal operations.

A web-based application to manage product stock and supplier data in an integrated manner. This system features an analytical dashboard to monitor asset values and stock status in real-time.

## 🚀 Key Features

- **Monitoring Dashboard**: 
  - **Total Products**: Summary of the total registered SKUs.
  - **Total Asset Value**: Valuation of total goods (Price x Stock).
  - **Total Low Stock Items**: Quick identification of products that need immediate restocking.
- **Product Management**: CRUD functionality for product data (SKU, name, category, price, stock).
- **Supplier Directory**: Management of partner supplier data (industry, location, contact).

## 🛠️ Tech Stack

- **Backend**: Node.js & Express.js
- **Frontend Engine**: EJS (Embedded JavaScript Templates)
- **Database**: PostgreSQL
- **Development Tool**: Nodemon

## 📋 Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org)
- Nodemon Global:
  ```bash
  npm install -g nodemon
  ```

## ⚙️ Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/raiz317/integrated-inventory-system.git
   cd integrated-inventory-system
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Database Structure:**
   Ensure your database has the following tables:
   - **products**: `sku`, `name`, `category`, `price`, `stock`, `supplier`
   - **suppliers**: `suppliername`, `industry`, `location`, `phone`, `email`
   - **users**: `username`, `email`, `password`

## 🏃 Getting Started

Run the development server using nodemon:

```bash
nodemon index.js
```
*(Adjust `index.js` to your main entry point file if it differs)*

Open your browser and access:
[http://localhost:3000](http://localhost:3000)

## 📁 Folder Structure
- `views/`: Contains `.ejs` template files for the frontend UI.
- `public/`: Static files such as CSS and Images.
- `routes/`: API and page route configurations.
- `app.js` / `index.js`: Main Express server configuration.

---

## 🖥️ Web Interface

**Homepage View**
<img width="1900" alt="Screenshot Homepage" src="https://github.com/user-attachments/assets/072cf9d2-8290-4dc0-bde8-87ff8427dd6c" />

**Dashboard View**
<img width="1919" alt="Dashboard View" src="https://github.com/user-attachments/assets/47d009eb-2151-4eab-987f-287480733f57" />

**Products Page**
<img width="1919" alt="Product Page" src="https://github.com/user-attachments/assets/acd62ace-19b2-4acf-8894-04776a89a105" />

**Suppliers Page**
<img width="1919" alt="Supplier Page" src="https://github.com/user-attachments/assets/8926ad40-c1c7-49dd-84c8-d6457031e6ce" />

---
Created by **Rafid Faiz Putra**

# integrated-inventory-system
Integrated Inventory &amp; Supplier Management System for internal operations.

Aplikasi berbasis web untuk mengelola stok produk dan data supplier secara terintegrasi. Sistem ini dilengkapi dengan dashboard analitik untuk memantau nilai aset dan status stok barang secara real-time.

## 🚀 Fitur Utama

- **Dashboard Monitoring**: 
  - **Total Produk**: Rekapitulasi jumlah SKU yang terdaftar.
  - **Total Asset Value**: Valuasi total nilai barang (Harga x Stok).
  - **Total Low Stock Item**: Identifikasi cepat produk yang perlu segera di-restock.
- **Manajemen Produk**: CRUD data produk (SKU, nama, kategori, harga, stok).
- **Direktori Supplier**: Pengelolaan data mitra supplier (industri, lokasi, kontak).

## 🛠️ Tech Stack

- **Backend**: Node.js & Express.js
- **Frontend Engine**: EJS (Embedded JavaScript Templates)
- **Database**: PostgreSQL
- **Development Tool**: Nodemon

## 📋 Prasyarat

Pastikan perangkat kamu sudah terinstal:
- [Node.js](https://nodejs.org)
- Nodemon Global:
  ```bash
  npm install -g nodemon
  ```

## ⚙️ Instalasi

1. **Clone repositori:**
   ```bash
   git clone [https://github.com](https://github.com/raiz317/integrated-inventory-system.git)
   cd nama-proyek
   ```

2. **Instal dependensi:**
   ```bash
   npm install
   ```

3. **Struktur Database:**
   Pastikan database Anda memiliki tabel berikut:
   - **products**: `sku`, `name`, `category`, `price`, `stock`, `supplier`
   - **suppliers**: `suppliername`, `industry`, `location`, `phone`, `email`
   - **users**: `username`, `email`, `password`

## 🏃 Cara Menjalankan

Jalankan server pengembangan menggunakan nodemon:

```bash
nodemon index.js
```
*(Sesuaikan `app.js` dengan file entry point utama kamu jika berbeda)*

Buka browser dan akses:
[http://localhost:3000](http://localhost:3000)

## 📁 Struktur Folder
- `views/`: Berisi file template `.ejs` untuk tampilan frontend.
- `public/`: File statis seperti CSS dan Gambar.
- `routes/`: Pengaturan rute API dan halaman.
- `app.js`: Konfigurasi utama server Express.

---

Tampilan Web

Tampilan Homepage
<img width="1900" height="825" alt="Screenshot 2026-05-05 174329" src="https://github.com/user-attachments/assets/072cf9d2-8290-4dc0-bde8-87ff8427dd6c" />

Tampilan Dashboard
<img width="1919" height="831" alt="Dashboard instockflow" src="https://github.com/user-attachments/assets/47d009eb-2151-4eab-987f-287480733f57" />

Tampilan Halaman Products
<img width="1919" height="824" alt="product instockflow" src="https://github.com/user-attachments/assets/acd62ace-19b2-4acf-8894-04776a89a105" />

Tampilan Halaman Suppliers
<img width="1919" height="831" alt="supplier instockflow" src="https://github.com/user-attachments/assets/8926ad40-c1c7-49dd-84c8-d6457031e6ce" />



Dibuat oleh Rafid Faiz Putra

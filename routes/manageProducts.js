import express from 'express';
import db from "./db.js"; 

const router = express.Router();

router.get("/product", async (req, res) => {
    if (req.isAuthenticated()) {
        try {
            const searchProduct = req.query.search;
            const category = req.query.category;
            const supplier = req.query.supplier;

            const user = await db.query("SELECT username FROM users WHERE id = $1", [req.user.id]);
            let queryStr = "SELECT * FROM products WHERE 1=1 ";
            let dataProduct = [];
    
            if(searchProduct) {
                dataProduct.push(`%${searchProduct}%`);
                queryStr += " AND name ILIKE $" + dataProduct.length;
            }
            if(category) {
                dataProduct.push(category);
                queryStr += " AND category = $" + dataProduct.length;
            }
            if(supplier) {
                dataProduct.push(supplier);
                queryStr += " AND supplier_id = $" + dataProduct.length;
            }
    
            queryStr += " ORDER BY id ASC";
            const result = await db.query(queryStr, dataProduct);
            const categoryResult = await db.query("SELECT DISTINCT category FROM products ORDER BY category ASC");
            const supplierResult = await db.query("SELECT id, name FROM suppliers ORDER BY id ASC");
    
            res.render("product.ejs", {
                user : user.rows[0].username,
                dataProduct : result.rows.length, 
                products : result.rows, 
                searchProduct : searchProduct, 
                category : category,
                supplier : supplier,
                categories : categoryResult.rows, 
                suppliers :supplierResult.rows});
        } catch (error) {
            console.log(error);
            res.status(500).send("Terjadi kesalahan");
        }
    } else {
        res.redirect("/login");
    }
});

router.post("/add-product", async (req, res) => {
    if (req.isAuthenticated()) {
        try {
            const newProduct = {
                sku : req.body.sku,
                name : req.body.name,
                stock : req.body.stock,
                price : req.body.price,
                supplier : req.body.supplier,
                category : req.body.category,
            }

            const values = [newProduct.sku, newProduct.name, newProduct.stock, newProduct.price, newProduct.supplier, newProduct.category];

            const result = await db.query("INSERT INTO products (sku, name, stock, price, supplier_id, category) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", values);
            res.redirect('/product')
        } catch (error) {
            console.log(error)
            res.status(500).send("Terjadi kesalahan")
        }
    } else {
        res.redirect("/login");
    }
});

router.get("/edit-product/:id", async (req, res) => {
    if (req.isAuthenticated()) {
        try {
            const id = req.params.id;
            const result = await db.query("SELECT * FROM products WHERE id = $1", [id]);
            const supplierResult = await db.query("SELECT id, name FROM suppliers ORDER BY id ASC");
            const categoryResult = await db.query("SELECT DISTINCT category FROM products ORDER BY category ASC");

            if (result.rows.length > 0) {
                res.render("edit-product.ejs", {product : result.rows[0], suppliers :supplierResult.rows, categories : categoryResult.rows});
            } else {
                res.status(404).send("Product tidak di temukan")
            }
        } catch (error) {
            console.log(error);
            res.status(500).send("Terjadi kesalahan pada server");
        }
    } else {
        res.redirect("/login");
    }
});

router.post('/update-product/:id', async (req, res) => { 
    if(req.isAuthenticated()) {
        const id = req.params.id;
        const newProduct = {
            sku : req.body.sku,
            name : req.body.name,
            stock : req.body.stock,
            price : req.body.price,
            supplier : req.body.supplier,
            category : req.body.category,
        }
        try {
            const oldProduct = await db.query("SELECT * FROM products WHERE id = $1", [id]);

            await db.query("UPDATE products SET sku=$1, name=$2, stock=$3, price=$4, supplier_id=$5, category=$6 WHERE id=$7", 
            [newProduct.sku, newProduct.name, newProduct.stock, newProduct.price, newProduct.supplier, newProduct.category, id]);

            res.redirect('/product')
        } catch (error) {
            console.log(error);
            res.status(500).send("Terjadi kesalahan pada server");
        }
    } else {
        res.redirect("/login");
    }
});

router.get('/delete-product/:id', async (req, res) => {
    if(req.isAuthenticated()) {
        try {
            const id = req.params.id;

            await db.query("DELETE FROM products WHERE id = $1", [id]);

            res.redirect('/product');
        } catch (error) {
            console.log(error);
            res.status(500).send("Gagal menghapus product");
        }
    } else {
        res.redirect("/login");
    }
});

export default router;
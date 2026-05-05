import express from 'express';
import db from "./db.js";

const router = express.Router();

router.get("/dashboard", async (req, res) => {
    if (req.isAuthenticated()) {
        try {
            const user = await db.query("SELECT username FROM users WHERE id = $1", [req.user.id]);
            const lowStock = 4;
            
            const queryStr = `
                SELECT p.*, s.name AS supplier_name 
                FROM products p
                JOIN suppliers s ON p.supplier_id = s.id
                WHERE p.stock <= $1
                ORDER BY p.id ASC
            `;
            
            const stockProduct = await db.query(queryStr, [lowStock]);
    
            const countSupplier = await db.query("SELECT COUNT(*) AS total FROM suppliers");
            const countProducts = await db.query("SELECT COUNT(*) AS total FROM products");
            const assetResult = await db.query("SELECT SUM(price * stock) AS total_val FROM products");
    
            res.render("dashboard.ejs", { 
                user : user.rows[0].username,
                dataProduct: stockProduct.rows,
                lowStockCount: stockProduct.rows.length, 
                supplierCount: countSupplier.rows[0].total, 
                totalProducts: countProducts.rows[0].total,
                totalAsset: new Intl.NumberFormat('id-ID').format(assetResult.rows[0].total_val || 0)
            });
        } catch (error) {
            console.log(error);
            res.status(500).send("Terjadi kesalahan");
        }
    } else {
        res.redirect("/login");
    }
});

export default router;
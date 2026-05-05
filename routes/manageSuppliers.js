import express from 'express'; 
import db from "./db.js";

const router = express.Router();

router.get("/supplier", async (req, res) => {
    if (req.isAuthenticated()) {
        try {
            const searchSupplier = req.query.search;
            const user = await db.query("SELECT username FROM users WHERE id = $1", [req.user.id]);
            let queryStr = "SELECT * FROM suppliers";
            let dataSupplier = [];
    
            if (searchSupplier) {
                queryStr += " WHERE name ILIKE $1 or industry ILIKE $1";
                dataSupplier.push(`%${searchSupplier}%`);
            }
    
            queryStr += " ORDER BY id ASC";
            const result = await db.query(queryStr, dataSupplier);
            const newData = result.rows;
    
            res.render("supplier.ejs", {user : user.rows[0].username, dataSupplier : newData, suppliers : newData.length, search : searchSupplier});
        } catch (error) {
            console.log(error);
            res.status(500).send("Terjadi kesalahan");
        }
    } else {
        res.redirect("/login");
    }
});

router.post("/add-supplier", async (req, res) => {
    if (req.isAuthenticated()) {
        try {
            const newSupplier = {
                name : req.body.name,
                phone : req.body.phone,
                location : req.body.location,
                email : req.body.email,
                industry : req.body.industry,
            }

            const values = [newSupplier.name, newSupplier.phone, newSupplier.location, newSupplier.email, newSupplier.industry];

            const result = await db.query("INSERT INTO suppliers (name, phone, location, email, industry) VALUES ($1, $2, $3, $4, $5) RETURNING *", values);
            res.redirect('/supplier')
        } catch (error) {
            console.log(error);
            res.status(500).send("Terjadi kesalahan")
        }
    } else {
        res.redirect("/login");
    }
});

router.get("/edit-supplier/:id", async (req, res) => {
    if (req.isAuthenticated()) {
        try {
            const id = req.params.id;
            const result = await db.query("SELECT * FROM suppliers WHERE id = $1", [id]);

            if (result.rows.length > 0) {
                res.render("edit-supplier.ejs", {supplier : result.rows[0]});
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

router.post('/update-supplier/:id', async (req, res) => { 
    if (req.isAuthenticated()) {
        const id = req.params.id;
        const newSupplier = {
            name : req.body.name,
            phone : req.body.phone,
            location : req.body.location,
            email : req.body.email,
            industry : req.body.industry,
        };
        try {
            const oldSupplier = await db.query("SELECT * FROM suppliers WHERE id = $1", [id]);

            await db.query("UPDATE suppliers SET name=$1, phone=$2, location=$3, email=$4, industry=$5 WHERE id=$6", 
            [newSupplier.name, newSupplier.phone, newSupplier.location, newSupplier.email, newSupplier.industry, id]);

            res.redirect('/supplier')
        } catch (error) {
            console.log(error);
            res.status(500).send("Terjadi kesalahan pada server");
        }
    } else {
        res.redirect("/login");
    }
});

router.get('/delete-supplier/:id', async (req, res) => {
    if(req.isAuthenticated()) {
        try {
            const id = req.params.id;

            await db.query("DELETE FROM suppliers WHERE id = $1", [id]);

            res.redirect('/supplier');
        } catch (error) {
            console.log(error);
            res.status(500).send("Gagal menghapus supplier");
        }
    } else {
        res.redirect("/login");
    }
});

export default router;
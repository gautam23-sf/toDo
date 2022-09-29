const pool = require('./db');
const express = require('express')
const app = express();

app.use(express.json()); // req.body
app.use(express.urlencoded());



class Category {

   async fetchCategory(req, res){
    try {
        const allCategories = await pool.query(
            "SELECT * FROM category_list");
        return res.json(allCategories.rows);
    } catch (err){
        console.log(err.message);
        }

    }

   async addNewCategory(req, res){
    try{    
        const { cat_desc } = req.body;
        const newCategory = await pool.query(
                "INSERT INTO category_list (cat_desc) VALUES ($1) RETURNING *",
                [cat_desc]
            );
        return res.json(newCategory.rows[0]);
    } catch (err){
        console.log(err.message);
        }
    }

   async deleteAllCategory(){
    try{    
        const masterReset = await pool.query(
            'TRUNCATE category_list RESTART IDENTITY CASCADE');
        return res.json("Category was successfully deleted!");
    } catch (err){
        console.log(err.message);
        }
    }
}

module.exports = Category;
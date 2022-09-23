const express = require('express');
const pool = require('./db');
const app = express();
const cors = require('cors');
const helmet = require('helmet');

app.use(express.json()); // req.body
app.use(express.urlencoded());
app.use(cors());
app.use(helmet());


// ROUTES//

// get all categories
app.get('/category', async(req, res)=>{
    try{
     //await
     const allCategories = await pool.query(
         "SELECT * FROM category_list");
     res.json(allCategories.rows);
    } catch (err){
     console.log(err.message);
    }
 });

 // get all todo for a particular category id
app.get('/todo/:id', async(req, res)=>{
    try{
     //await
    const { id } = req.params;
    const allTodo = await pool.query(
         `SELECT * FROM todo_list WHERE cat_id = ${ id } ORDER BY todo_id`);
     res.json(allTodo.rows);
    } catch (err){
     console.log(err.message);
    }
 });
 
//create category
app.post('/category', async(req, res)=>{
   try{
    //await
    const { cat_desc } = req.body;
    const newCategory = await pool.query(
        "INSERT INTO category_list (cat_desc) VALUES ($1) RETURNING *",
        [cat_desc]
    );
    res.json(newCategory.rows[0]);
   } catch (err){
    console.log(err.message);
   }
});

// create todo for category id as input
app.post('/todo', async(req, res)=>{
   try{
     //await
    console.log    
     const {cat_id} = req.body;
     const { todo_desc } = req.body;
     const { todo_check_status } = req.body;
     
     const newTodo = await pool.query(
         "INSERT INTO todo_list (todo_desc, todo_check_status, cat_id) VALUES ($1, $2, $3) RETURNING *",
         [todo_desc, todo_check_status, cat_id]
     );
     res.json(newTodo.rows[0]);
    } catch (err){
     console.log(err.message);
    }
 });

// update category list. 
app.put('/category/:id', async(req, res)=>{
    try{
        //await
     const { id } = req.params;
     const { cat_desc } = req.body;
     const update_cat = await pool.query(
         "UPDATE category_list SET cat_desc = $1 WHERE cat_id = $2", [cat_desc, id]);
     res.json("Category was updated!");
    } catch (err){
     console.log(err.message);
    }
 });

// update todo item. 
app.put('/todo/:id', async(req, res)=>{
    try{
        //await
     const { id } = req.params;
     const { todo_desc } = req.body;
     const { todo_check_status } = req.body;
     const update_todoItem = await pool.query(
         "UPDATE todo_list SET todo_desc = $1, todo_check_status = $2 WHERE todo_id = $3", [todo_desc, todo_check_status, id]);
     res.json(update_todoItem);
    } catch (err){
     console.log(err.message);
    }
 });

// DELETE complete category. 
app.delete('/category', async(req, res)=>{
    try{
        //await
     const masterReset = await pool.query(
        'TRUNCATE category_list RESTART IDENTITY CASCADE');
     res.json("Category was successfully deleted!");
    } catch (err){
     console.log(err.message);
    }
 });

// DELETE todo item for a particular category. 
app.delete('/todo/:id', async(req, res)=>{
    try{
        //await
     const { id } = req.params;
     const deleteTodoItem = await pool.query(
         `DELETE FROM todo_list WHERE todo_id = ${id}`);
     res.json("todo item was successfully deleted!");
    } catch (err){
     console.log(err.message);
    }
 });
app.listen(3000, ()=>{
    console.log("server listening at port 3000");
}); 
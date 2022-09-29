const pool = require('./db');
const express = require('express')
const app = express();

app.use(express.json()); // req.body
app.use(express.urlencoded());

class Todo {

async fetchTodo(req, res){
    const { id } = req.params;
    const allTodo = await pool.query(
         `SELECT * FROM todo_list WHERE cat_id = ${ id } ORDER BY todo_id`);
    return res.json(allTodo.rows);
}

async addNewTodo(req, res){
    const {cat_id} = req.body;
    const { todo_desc } = req.body;
    const { todo_check_status } = req.body;
    
    const newTodo = await pool.query(
        "INSERT INTO todo_list (todo_desc, todo_check_status, cat_id) VALUES ($1, $2, $3) RETURNING *",
        [todo_desc, todo_check_status, cat_id]
    );
    return res.json(newTodo.rows[0]);
}

async deleteTodo(req, res){
    const { id } = req.params;
    const deleteTodoItem = await pool.query(
         `DELETE FROM todo_list WHERE todo_id = ${id}`);
    return res.json("todo item was successfully deleted!");

}

async updateTodo(req, res){
    const { id } = req.params;
    const { todo_desc } = req.body;
    const { todo_check_status } = req.body;
    const update_todoItem = await pool.query(
        "UPDATE todo_list SET todo_desc = $1, todo_check_status = $2 WHERE todo_id = $3", [todo_desc, todo_check_status, id]);
    return res.json(update_todoItem);
    
}

}
module.exports = Todo;

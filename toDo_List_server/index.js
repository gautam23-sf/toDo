const express = require('express');
const pool = require('./db');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const Category = require('./category');
const Todo = require('./todo');
const factoryLogger = require('./logger/factoryLogger');

app.use(express.json()); // req.body
app.use(express.urlencoded());
app.use(cors());
app.use(helmet());

const category = new Category();
const todo = new Todo();
const _factoryLogger = new factoryLogger() 

    app.get('/category', (req, res)=>{
        category.fetchCategory(req, res); 
        const selectLoggerInstance = _factoryLogger.loggerSelection('consoleLog');
        selectLoggerInstance.consoleLogs('Categories Fetched');
        selectLoggerInstance.countConsoleLogs();
        });


    //create category
    app.post('/category', (req, res)=>{
        category.addNewCategory(req, res);
        const selectLoggerInstance = _factoryLogger.loggerSelection('consoleLog');
        selectLoggerInstance.consoleLogs('Categories Created');
        selectLoggerInstance.countConsoleLogs();
    });

    // DELETE complete category. 
    app.delete('/category', async(req, res)=>{
        category.deleteAllCategory(req, res);
        const selectLoggerInstance = _factoryLogger.loggerSelection('consoleLog');
        selectLoggerInstance.consoleLogs('Categories Deleted, Master Reset');
        selectLoggerInstance.countConsoleLogs();
    });

    // get all todo for a particular category id
    app.get('/todo/:id', (req, res)=>{
        todo.fetchTodo(req, res);  
        const selectLoggerInstance = _factoryLogger.loggerSelection('dbLog');
        selectLoggerInstance.dbLogs('Todo Fetched');
        selectLoggerInstance.countDbLogs();

    });

    // create todo for category id as input
    app.post('/todo', async(req, res)=>{
        todo.addNewTodo(req, res); 
        const selectLoggerInstance = _factoryLogger.loggerSelection('dbLog');
        selectLoggerInstance.dbLogs('Todo Created');
        selectLoggerInstance.countDbLogs();
    });

    // update todo item. 
    app.put('/todo/:id', (req, res)=>{
        
        todo.updateTodo(req, res);
        const selectLoggerInstance = _factoryLogger.loggerSelection('dbLog');
        selectLoggerInstance.dbLogs('Todo Updated');
        selectLoggerInstance.countDbLogs();
    });


    // DELETE todo item for a particular category. 
    app.delete('/todo/:id', async(req, res)=>{
        todo.deleteTodo(req, res);
        const selectLoggerInstance = _factoryLogger.loggerSelection('dbLog');
        selectLoggerInstance.dbLogs('Todo Deleted');
        selectLoggerInstance.countDbLogs();
    });
 
app.listen(3000, ()=>{
    console.log("server listening at port 3000");
}); 
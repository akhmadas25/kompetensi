const { request } = require('express')
const router = require('express').Router()
// handle connection
const dbConnection = require('../connection/database')
const isLogin = false

router.get("/detailCollection/:id", function(request, response) {
    if (request.session.isLogin){
        const id = request.params.id
        const query1 = `SELECT * FROM task_tb WHERE collections_id = ${id} && is_done = 'done'`
        const query2 = `SELECT * FROM task_tb WHERE collections_id = ${id} && is_done = 'undone'`
        dbConnection.getConnection(function (err,conn) {
        if (err) throw err
        conn.query(query2, function (err, results) {
            if (err) throw err
            const task = []
    
            for (var result of results) {
            task.push({
                id: result.id,
                name: result.name,
                collections_id: result.collections_id
            })
            }
            conn.query(query1, function(err, results){
                if (err) throw err
            
            const done = []
    
            for (var result of results) {
            done.push({
                id: result.id,
                name: result.name,
                collections_id: result.collections_id
            })
            }
            response.render("collections/detail", {title: "collections", isLogin: request.session.isLogin,
            task, done })
            })
            conn.release()
        })
        })
    }
    else {
        response.redirect('/login')
    }
    
  })

router.post("/addTask", function (request, response){
    const {task, collection} = request.body
    const query = `INSERT INTO task_tb (name, collections_id) VALUES ("${task}", "${collection}")`
    dbConnection.getConnection(function(err,conn){
            if(err) throw err
            conn.query(query,function(err,result) {
                if (err) throw err

                request.session.message = {
                type: 'success',
                message: 'Add task has success',
                }

                response.redirect('/')
            })

            conn.release()
        })
})

router.post("/done/:id", function(request, response){
    const id = request.params.id
    const query = `UPDATE task_tb SET is_done = 'done' WHERE id = ${id}`
    dbConnection.getConnection(function(err,conn){
        if(err) throw err
        conn.query(query,function(err,result) {
            if (err) throw err
            response.redirect(`/detailCollection/${id}`)
        })

        conn.release()
    })
})

module.exports = router
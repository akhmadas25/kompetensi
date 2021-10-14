const { request } = require('express')
const router = require('express').Router()
// handle connection
const dbConnection = require('../connection/database')
const isLogin = false

router.get("/detailCollection/:id", function(request, response) {
    if (request.session.isLogin){
        const id = request.params.id
        const query = `SELECT * FROM task_tb WHERE collections_id = ${id}`
    
        dbConnection.getConnection(function (err,conn) {
        if (err) throw err
        conn.query(query, function (err, results) {
            if (err) throw err
            const collections = []
    
            for (var result of results) {
            collections.push({
                id: result.id,
                name: result.name,
                status: result.is_done,
                collections_id: result.collections_id
            })
            }
            response.render("collections/detail", {title: "collections", 
            isLogin: request.session.isLogin,
            collections
            })
        })
        conn.release()
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

module.exports = router
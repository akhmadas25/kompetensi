const { request } = require('express')
const router = require('express').Router()
// handle connection
const dbConnection = require('../connection/database')
const isLogin = false

// render signup
router.get('/signup', function(request,response) {
    const title = 'signup';
    response.render('auth/signup', {
      title
    });
  })
  // handle signup
router.post('/signup', function(request,response) {
    var {username, email, password} = request.body;
  
    if (username == '' || email == '' ||  password == '') {
      request.session.message = {
        type: 'danger',
        message: 'Please insert all field!',
      };
      return response.redirect('/signup')
    }
      const query = `INSERT INTO users_tb (username, email, password) VALUES ("${username}", "${email}", "${password}")`
      dbConnection.getConnection(function(err,conn){
        if(err) throw err
          conn.query(query,function(err,result) {
            if (err) throw err
  
            request.session.message = {
              type: 'success',
              message: 'successfully signup!',
            }
  
            response.redirect('/')
          })
  
          conn.release()
       })
  })

// render login
router.get('/login', function(request,response) {
    const title = 'Login'
    response.render('auth/login', {
      title,
      isLogin,
    })
  })
  // handle login
router.post('/login', function(request,response) {
    const { email, password } = request.body;
  
    if(email == '' || password == ''){
      request.session.message = {
        type: 'danger',
        message: 'Please insert all field!',
      };
  
      return response.redirect('login');
    }
  
    const query = `SELECT * FROM users_tb WHERE email = "${email}" AND password = "${password}"`;
    dbConnection.getConnection(function(err,conn){
      if(err) throw err;
      conn.query(query,function(err,results) {
        if (err) throw err;
   
        if (results.length == 0) {
          request.session.message = {
            type: 'danger',
            message: 'Email and password dont match!',
          }
          return response.redirect("login")
        } else {
  
          request.session.isLogin = true;
  
          request.session.user = {
            id: results[0].user_id,
            email: results[0].email,
            status: results[0].status
          }
            response.redirect('/')
        }
      });
      conn.release();
    });
  })
  // handle signout
router.get('/signout', function(request,response) {
    request.session.destroy();
    response.redirect('/');
  })

  
module.exports = router
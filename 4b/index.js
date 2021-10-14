// import package
const http = require("http")
const express = require("express")
const path = require("path")
const session = require('express-session')
const app = express()
const hbs = require("hbs")

// routing
const authRoute = require("./routes/auth")
const collectionsRoute = require("./routes/collections")

// set connection & middlewares
const dbConnection = require('./connection/database')
const { response } = require("express")

// set public
app.use("/public", express.static(path.join(__dirname, "public")))

app.use(express.urlencoded({ extended: false }))

// set views location to app 
app.set("views", path.join(__dirname, "views"))

// set template/view engine
app.set("view engine", "hbs")

// register view partials
hbs.registerPartials(path.join(__dirname, "views/partials"))

// use session
app.use(
  session(
    {
      cookie: {
        maxAge: 1000 * 60 * 60 * 2,
      },
      store: new session.MemoryStore(),
      resave: false,
      saveUninitialized: true,
      secret: 'SecretKey',
    }
  )
)

// session alert
app.use(function(req,res,next){
  res.locals.message = req.session.message
  delete req.session.message
  next()
})

// render index page
app.get("/", function(request, res) {
  const query = `SELECT * FROM collections_tb`

  dbConnection.getConnection(function (err,conn) {
    if (err) throw err
    conn.query(query, function (err, results) {
      if (err) throw err
      const collections = []

      for (var result of results) {
        collections.push({
          id: result.id,
          name: result.name,
          user_id: result.user_id
        })
      }
      res.render("index", {title: "Task app", 
      isLogin: request.session.isLogin,
      collections
      })
    })
    conn.release()
  })
})

// mount backend page
app.use("/", authRoute)
// mount collection route
app.use("/", collectionsRoute)

const server = http.createServer(app)
const port = 5000;
server.listen(port, () => {
  console.log('server running on port: ', port)
})
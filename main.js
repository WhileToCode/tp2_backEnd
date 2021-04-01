const pg = require('pg')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const ListesServices = require("./services/listesServices")
const ArticlesServices = require("./services/articlesService")

const app = express()
app.use(bodyParser.urlencoded({ extended: false })) // URLEncoded form data
app.use(bodyParser.json()) // application/json
app.use(cors())
app.use(morgan('dev')); // toutes les requêtes HTTP dans le log du serveur

//const connectionString = "postgres://user:password@192.168.56.101/instance"
const connectionString = "postgres://postgres:default@localhost/dbliste"
const db = new pg.Pool({ connectionString: connectionString })

const listeService = new ListesServices(db)
const articleService = new ArticlesServices(db)
require('./api/listes')(app, listeService)
require('./api/articles')(app, articleService)
require('./datamodel/seeder')(listeService, articleService)
    .then(app.listen(3333))





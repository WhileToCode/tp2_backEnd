const pg = require('pg')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
//const nodemailer = require('nodemailer')


const ListesServices = require("./services/listesServices")
const ArticlesServices = require("./services/articlesService")
const UserAccountServices = require("./services/userAccount")
const PartageService = require("./services/partageService")

const app = express()
app.use(bodyParser.urlencoded({ extended: false })) // URLEncoded form data
app.use(bodyParser.json()) // application/json
app.use(cors())
app.use(morgan('dev')); // toutes les requêtes HTTP dans le log du serveur
app.use(cookieParser()) // read cookies (obligatoire pour l'authentification)
//app.use(nodemailer())

//const connectionString = "postgres://user:password@192.168.56.101/instance"
const connectionString = "postgres://postgres:default@localhost/dbliste"
const db = new pg.Pool({ connectionString: connectionString })

//const partageService = new PartageService(db)
const userAccountService = new UserAccountServices(db)
const listeService = new ListesServices(db)
const partageService = new PartageService(db)

const articleService = new ArticlesServices(db)
const jwt = require('./jwt')(userAccountService)
require('./api/userAccount')(app, userAccountService, jwt)
require('./api/partage')(app, partageService, jwt)
require('./api/listes')(app, listeService, jwt)
require('./api/articles')(app, articleService, jwt)
//require('./api/userAccount')(app, userAccountService, jwt)
require('./datamodel/seeder')(listeService, articleService, userAccountService, partageService)
    .then(app.listen(3333))





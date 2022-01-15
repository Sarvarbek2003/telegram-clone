const express = require('express')
const path = require('path')
const ejs = require('ejs')
const PORT = process.env.PORT || 5000
const app = express()

app.engine('html', ejs.renderFile)
app.set('view engine', 'html')
app.use(express.static( path.join(__dirname, 'public')))
app.set('views',  path.join(__dirname, 'views'))


app.get('/', (req, res) => res.render('index'))
app.get('/login', (req, res) => res.render('login'))
app.get('/register', (req, res) => res.render('register'))


app.listen(PORT, () => console.log('server is running on http://localhost:' + PORT))
const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

const PORT = process.env.PORT;
const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
}).then(() => {
  console.log('Connected to Database')
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
}); // listen on port 3000

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected')
});// if mongoose is connected
  


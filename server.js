const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const fs = require('fs')
const cors = require('cors')

console.log('\x1Bc')

const port = process.env.PORT || 4000

const app = express()
// console.log('\x1Bc');
const initialIdeas = require('./ideas.json')
const ideas = new Map()
initialIdeas.forEach(idea => {
  ideas.set(idea.id, idea)
})

console.log(ideas.values())

const saveIdeas = () => {
  const ideasToSave = Array.from(ideas.values())
  fs.writeFileSync('ideas.json', JSON.stringify(ideasToSave))
}

app
  .use(morgan('dev'))
  .use(cors())
  .use(express.static('static'))
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .get('/ideas', (req, res) => {
    res.send(Array.from(ideas.values()))
  })
  .get('/ideas/new', (req, res) => {
    const idea = { id: Math.round(Math.random() * Date.now()), created_date: Date.now() }
    ideas.set(idea.id, idea)
    saveIdeas()
    res.send(idea)
  })
  .post('/idea/update', (req, res) => {
    console.log(req.body)
    const { id, title, body } = req.body
    const idea = Object.assign({}, ideas.get(id), { title, body })
    ideas.set(id, idea)
    console.log('UPDATE', req.body, id, title, body, idea)
    saveIdeas()
    res.send(idea)
  })
  .post('/idea/delete', (req, res) => {
    const { id } = req.body
    console.log('DELETE', id)
    ideas.delete(id)
    saveIdeas()
    res.send({ id })
  })
  .listen(port, () => console.log(`Server started at port: ${port}`))

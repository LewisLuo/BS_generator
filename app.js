const express = require('express')
const app = express()
const port = 3000
const handlebars = require('handlebars')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const people = {
  'engineer': {
    nameEng: 'engineer',
    name: '工程師',
    image: 'https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5668/angry-developer.jpg',
    task: ['加個按鈕', '加新功能', '切個版', '改一點 code'],
  },
  'designer': {
    nameEng: 'designer',
    name: '設計師',
    image: 'https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5667/angry-designer.jpg',
    task: ['畫一張圖', '改個 logo', '順便幫忙設計一下', '隨便換個設計'],
  },
  'entrepreneur': {
    nameEng: 'entrepreneur',
    name: '創業家',
    image: 'https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5669/angry-founder.jpg',
    task: ['週末加班', '要能賺錢', '想個 business model', '找 VC 募錢'],
  }
}

const phrase = ['很簡單', '很容易', '很快', '很正常']

let result = ''


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ entended: true }))

app.get('/', (req, res) => {
  result = '請選擇你想惹怒的對象！'
  res.render('index', { people, result })
})

app.post('/', (req, res) => {
  const target = req.body.target

  if (target) {
    result = `身為一個${people[target].name}，${people[target].task[randomIndex(4)]}，${phrase[randomIndex(4)]}吧！`
    console.log(target)
    res.render('index', { people, target, result })
  } else {
    result = '尚未選擇對象，請重新選取！'
    res.render('index', { people, target, result })
  }
})

app.listen(port, () => {
  console.log(`Express server is running on http://localhost:${port}`)
})

handlebars.registerHelper('checkRadio', function (a, b) {
  if (a === b) {
    return 'checked'
  }
})

function randomIndex(number) {
  return Math.floor(Math.random() * number)
}
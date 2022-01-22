const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")

app.set("view engine", "pug")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("public"))
app.use(cookieParser())



const { morningRoutine } = require("./public/data/data.json")
const { afternoonRoutine } = require("./public/data/data.json")
const { nightRoutine } = require("./public/data/data.json")


//Add display values to routine tasks
morningRoutine.map(task => {
  if (task.startMinutes < 10) task.displayStartMinutes = task.startMinutes + "0"
  else task.displayStartMinutes = task.startMinutes
})

morningRoutine.map(task => {
  if (task.endMinutes < 10) task.displayEndMinutes = task.endMinutes + "0"
  else task.displayEndMinutes = task.endMinutes
})

afternoonRoutine.map(task => {
  if (task.startMinutes < 10) task.displayStartMinutes = task.startMinutes + "0"
  else task.displayStartMinutes = task.startMinutes
})

afternoonRoutine.map(task => {
  if (task.endMinutes < 10) task.displayEndMinutes = task.endMinutes + "0"
  else task.displayEndMinutes = task.endMinutes
})

nightRoutine.map(task => {
  if (task.startMinutes < 10) task.displayStartMinutes = task.startMinutes + "0"
  else task.displayStartMinutes = task.startMinutes
})

nightRoutine.map(task => {
  if (task.endMinutes < 10) task.displayEndMinutes = task.endMinutes + "0"
  else task.displayEndMinutes = task.endMinutes
})



app.get('/', (req, res) => {
  res.render("index")
})

app.get('/morning', (req, res) => {
  if (req.query.day === "weekend") res.render("weekend")
  else {
    res.cookie("routine", "morningRoutine")
    res.render("morning", { morningRoutine })
  }
})

app.get('/afternoon', (req, res) => {
  if (req.query.day === "weekend") res.render("weekend")
  else {
    res.cookie("routine", "afternoonRoutine")
    res.render("afternoon", { afternoonRoutine })
  }
})

app.get('/night', (req, res) => {
  if (req.query.day === "weekend") res.render("weekend")
  else {
    res.cookie("routine", "nightRoutine")
    res.render("night", { nightRoutine })
  }
})


app.post('/', (req, res) => {
  const shift = req.body.shift
  const day = req.body.day
  res.redirect(`/${ shift }?day=${ day }`)
})

app.listen(3000, () => {
  console.log("The application is running on localhost:3000!")
})


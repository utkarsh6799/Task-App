const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/users')
const taskRouter = require('./routers/tasks')

const app = express()
const port = process.env.PORT || 3000


const multer = require('multer')
const upload = multer({
    dest: 'images'
})
app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
})


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port' + port)
})

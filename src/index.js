const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/users')
const taskRouter = require('./routers/tasks')

const app = express()
const port = process.env.PORT || 3000


// app.use((req, res, next) => {
//     if(req.method === 'GET'){
//           res.send('get requests are disabled')
//     }else{
//         next()
//     }
// })
// app.use((req, res, next) => {
//     res.status(503).send('Site under maintanance!')
// })




app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port' + port)
})

const Task = require('./models/task')
const User =require('./models/user')

const main = async () => {
    // const task = await Task.findById('5d31671567b43c3a0c03ff5b')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

   const user = await User.findById('5d31661b3f679c1cb0ebfaa7')
   await user.populate('tasks').execPopulate()
   console.log(user.tasks)

}

main()
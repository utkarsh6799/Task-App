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


// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//     const token = jwt.sign({ _id: 'abc123' }, 'thisiscourse', { expiresIn: '7 days'})
//     console.log(token)


//     const data = jwt.verify(token, 'thisiscourse')
//     console.log(data)
// }


// myFunction()


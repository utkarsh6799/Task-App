const express = require('express')
require('./db/mongoose')
const Users = require('./models/user')
const Tasks = require('./models/task')

const app = express()
const port = process.env.PORT || 3000


app.use(express.json())

 
app.post('/users', (req, res) => {
    const user = new Users(req.body)

    user.save().then(() => {
       res.status(201).send(user)
    }).catch((e) => {
        res.status(400).send(e)
         
    })
})

app.get('/users', (req, res) => {
    Users.find({}).then((users) => {
         res.send(users)
    }).catch((e) => {
        res.status(500).send(e)
    })
})
 
app.get('/users/:id', (req, res) => {
   
    const _id = req.params.id
    
    Users.findById(_id).then((users) => {
    
        if (!users){
            return res.status(404).send()
            
        }
        
       res.send(users)
    }).catch((e) => {
        res.status(500).send()
    })
    })

    app.get('/tasks', (req, res) => {
        Tasks.find({}).then((tasks) =>{
            res.send(tasks)
        }).catch((e) => {
            res.status(500).send()
        })
    })

    app.get('/tasks/:id', (req, res) => {
        const _id = req.params.id

        Tasks.findById(_id).then((tasks) => {
            if(!tasks){
                return res.status(404).send()
            }

            res.send(tasks)
        }).catch((e) => {
            res.status(500).send()
        })
    })

app.post('/task', (req, res) => {
    const task = new Tasks(req.body)

    task.save().then(() => {
        res.status(201).send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})
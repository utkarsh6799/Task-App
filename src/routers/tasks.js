const express = require('express')
const Tasks = require('../models/task')
const router = new express.Router()


router.get('/tasks', async (req, res) => {
        
    try {
        const tasks = await Tasks.find({})
        res.status(201).send(tasks)
    }catch (e){
         res.status(500).send()
    }

   
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
   
    try{
      const task = await Tasks.findById(_id)
      if(!task){
          return res.status(404).send()
      }

      res.status(200).send(task)
    } catch (e){
        res.status(500).send()
    }
   
})

router.post('/task', async (req, res) => {
const task = new Tasks(req.body)
 
try{
  await task.save()
  res.status(200).send(task)
} catch (e){
res.status(500).send()
}

})

router.patch('/tasks/:id', async (req, res) => {
const updates = Object.keys(req.body)
const allowedUpdates = [ 'name','description' ]
const isValidOpearation = updates.every((update) => {
       return allowedUpdates.includes(update)
})
 
if(!isValidOpearation){
    return res.status(400).send({ error: 'Invalid errors!' })
}


try{
    const task = await Tasks.findById(req.params.id)

    updates.forEach((update) => {
        task[update] = req.body[update]
    })

    await task.save()

   if(!task){
       return res.status(404).send()
   }

   res.status(200).send(task)
}catch (e){
res.status(500).send(e)
}
})


router.delete('/tasks/:id', async (req, res) => {
try{
  const task = await Tasks.findByIdAndDelete(req.params.id)
  if(!task){
      return res.status(404).send({error: 'Task not found!'})
  }

  res.status(200).send(task)
}catch (e) {
   res.status(500).send(e)
}
})


module.exports = router
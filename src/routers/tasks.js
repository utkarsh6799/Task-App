const express = require('express')
const Tasks = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

// GET /tasks?completed=false
//GET /tasks?limit=10&skip=0
router.get('/tasks', auth, async (req, res) => {
    const match = {}

    if (req.query.completed){
        match.completed = req.query.completed === 'true'
    }
        
    try {
        
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
              limit: parseInt(req.query.limit),
              skip:parseInt(req.query.skip)
            }
        }).execPopulate()
        res.status(201).send(req.user.tasks)
    }catch (e){
         res.status(500).send()
    }

   
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
   
    try{
    
     const task = await Tasks.findOne({ _id, owner: req.user._id })

      if(!task){
          return res.status(404).send()
      }

      res.status(200).send(task)
    } catch (e){
        res.status(500).send()
    }
   
})

router.post('/task', auth, async (req, res) => {
// const task = new Tasks(req.body)
 const task = new Tasks({
     ...req.body,
     owner: req.user._id
 })
try{
  await task.save()
  res.status(200).send(task)
} catch (e){
res.status(500).send()
}

})

router.patch('/tasks/:id', auth, async (req, res) => {
const updates = Object.keys(req.body)
const allowedUpdates = [ 'description','completed' ]
const isValidOpearation = updates.every((update) => {
       return allowedUpdates.includes(update)
})
 
if(!isValidOpearation){
    return res.status(400).send({ error: 'Invalid errors!' })
}


try{
    const task = await Tasks.findOne({ _id: req.params.id, owner: req.user._id })
    

   if(!task){
       return res.status(404).send()
   }

   updates.forEach((update) => {
    task[update] = req.body[update]
})

await task.save()

   res.status(200).send(task)
}catch (e){
res.status(500).send(e)
}
})


router.delete('/tasks/:id', auth, async (req, res) => {
try{
  const task = await Tasks.findOneAndDelete({_id:req.params.id, owner: req.user._id})
  if(!task){
      return res.status(404).send({error: 'Task not found!'})
  }

  res.status(200).send(task)
}catch (e) {
   res.status(500).send(e)
}
})


module.exports = router
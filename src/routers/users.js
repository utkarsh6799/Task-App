const express = require('express')
const Users = require('../models/user')
const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new Users(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch(e) {
        res.status(400).send(e)
    }

})

router.post('/users/login', async (req, res) => {
    try{ 
       const user = await Users.findByCredentials(req.body.email, req.body.password)
       res.send(user)
    }catch (e) {
         res.status(400).send()
    }
})

router.get('/users', async (req, res) => {

     try { 
        const users = await Users.find({})
        res.send(users)
     }catch (e){
    res.status(500).send()
     }

})
 
router.get('/users/:id', async (req, res) => {


   
    const _id = req.params.id

    try { 
        const user = await Users.findById(_id)
        if(!user){
            return res.status(404).send()
        }

        res.send(user)
    }catch (e){
        res.status(500).send()
    }    
})


router.patch('/users/:id', async (req, res) => {
        const updates = Object.keys(req.body)
        const allowedUpdates =[ 'name','email','age','password' ]

        const isValidOpearation = updates.every((update) => {
             return allowedUpdates.includes(update)
        })

        if(!isValidOpearation) {
            return res.status(400).send({ error: 'Invalid updates!'})
        }
        
        try{

            const user = await Users.findById(req.params.id)

            updates.forEach((update) => {
                user[update] = req.body[update]

            })

            await user.save()
        
          if(!user){
              return res.status(404).send()
          } 


        res.send(user)
        }catch (e){

           res.status(400).send(e) 

        }
    })

router.delete('/users/:id', async (req, res) => {
       
        try{
          const user = await Users.findByIdAndDelete(req.params.id)
          if(!user){
              return res.status(404).send({error:'User not found!'})
          }

          res.status(200).send(user)
        }catch (e) {
           res.status(500).send(e)
        }


    })



module.exports = router
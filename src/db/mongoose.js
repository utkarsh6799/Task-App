const mongoose = require('mongoose')
const validator = require('validator')


mongoose.connect('mongodb://127.0.0.1:27017/task-app-api', {
     useNewUrlParser: true, 
     useCreateIndex: true
})

const User = mongoose.model('User', {
    name: {
       type: String,
       required: true,
       trim: true
    },
    password: {
           type: String,
           trim: true,
           required: true,
           validate(value){
               if(value.length<=6) {
                   throw new Error("password is short")
               }
               if(value.toLowercase().includes("password")) {
                   throw new Error("change password")
               }
           }
    },
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }

    },
    age: {
       type: Number,
       default: 1,
       validate(value) {
          if(value<0) {
              throw new Error('Age must be positive no.')
          }
       }
    }
})


// const me = new User({
//     name: '   utkarsh   ',
//     age: 21,
//     email: 'MYEMAIL@SINGH.IO    ',
//     password: 'pas    '
// })

// me.save().then((me) => {  //me not required as the name is same
// console.log(me)
// }).catch((error) => {
//   console.log('Error', error)
// })

const Tasks = mongoose.model('Tasks', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: Boolean,
        default: false
    }
})

const you = new Tasks({
    name:'name ',
    
})

you.save().then(() => {
   console.log(you)
}).catch((error) => {
   console.log('Error', error)
})
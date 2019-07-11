

const mongoose = require('mongoose')
const validator = require('validator')


const Users = mongoose.model('User', {
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
               if(value.toLowerCase().includes("password")) {
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


module.exports = Users
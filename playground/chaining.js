require('../src/db/mongoose')

const User = require('../src/models/user')

//  User.findByIdAndUpdate('5d26310697b497425447dab8', { age: 2 }).then((user) => {
//             console.log(user)
//             return User.countDocuments({ age: 21 })
//  }).then((user) => {
//       console.log(user)
//  }).catch((e) => {
//      console.log(e)
//  })


 const updateAgeAndCount = async (id, age) => {
   const user = await User.findByIdAndUpdate(id, { age }) //shorthand of {age :age}
   const count = await User.countDocuments({ age })
   return count  
 }

       
 updateAgeAndCount('5d26310697b497425447dab8', 2).then((count) =>{
     console.log(count)
 }).catch((e) => {
     console.log(e)
 })
require('../src/db/mongoose')

const Task = require('../src/models/task')

// Task.findByIdAndDelete('5d273a9a8384665d58a3d55b').then((task) => {
//   console.log(task)
//   return Task.countDocuments({ description: false })
// }).then((task) => {
//     console.log(task)
// }).catch((e) => {
//     console.log(e)
// })


const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ description: false })
    return count
}

deleteTaskAndCount('5d24861d7f508367445a2fee').then((count) => {
     console.log(count)
}).catch((e) => {
  console.log(e)
})
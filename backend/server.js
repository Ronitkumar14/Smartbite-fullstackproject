import './Loadenv.js'
import app from "./App.js";
import connectdb from './src/config/db.js'

const Port=process.env.PORT

connectdb()
.then(()=>{
    console.log('database connected successfully')
})
.catch((error)=>{
    console.log(`something went wrong due to some error: ${error}`)
})
app.listen(Port,()=>{
    console.log(`app is running on the port ${Port}`)
})
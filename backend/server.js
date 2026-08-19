require("dotenv").config()
const app=require("./src/app")
const connectToDB = require("./src/config/data")


connectToDB()
// generateInterviewReport({Resume, SelfDescription, JobDescription}).catch((err) => {
//   console.error("AI service startup call failed:", err?.message || err)
// })

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})


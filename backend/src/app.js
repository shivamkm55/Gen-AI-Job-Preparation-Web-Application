const express=require("express");
const cookieParser = require("cookie-parser")
const cors=require("cors")
// writing all the routes here

const authRouter=require("./routes/auth.routes")

const app = express()
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173")
//   res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
//   res.header("Access-Control-Allow-Headers", "Content-Type,Authorization")
//   res.header("Access-Control-Allow-Credentials", "true")
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(204)
//   }
//   next()
// })

app.use(express.json())
app.use(cookieParser())
// using all the routes here


app.use("/api/auth",authRouter)
module.exports=app;
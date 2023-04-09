import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"
import companyRoutes from "./routes/companyRoutes.js"
import articleRoutes from "./routes/articlesRoutes.js"
import cors from "cors"

const app = express();
app.use(express.json())

dotenv.config();

connectDB();

//Set up CORS
const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function(origin, callback) {
        if(whitelist.includes(origin)){
            callback(null, true)
        } else {
            callback(new Error("Error de Cors"))
        }
    }
}

app.use(cors(corsOptions))

//Routing
app.use('/api/users', userRoutes)
app.use('/api/companies', companyRoutes)
app.use('/api/articles', articleRoutes)

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto ${PORT}`)
})
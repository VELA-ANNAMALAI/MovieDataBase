import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import bodyParser from "body-parser";


import { createUser } from "./webhook/clerk.js";
import { connectToDB } from "./MongoDB/index.js";
import FavoritesRoutes from "./routes/Favorites.routes.js";
import RemoveFav from "./routes/RemoveFav.routes.js";
import { ReviewRoutes } from "./routes/Review.routes.js";

dotenv.config();

const app=express();
const PORT =process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}));




app.get("/",(req,res)=> res.send("I'm Responding"))
app.post("/api/webhook/clerk",bodyParser.raw({type:"application/json"}), createUser)


app.use("/add-to-favorites",FavoritesRoutes)
app.use("/remove-from-favorites",RemoveFav)
app.use("/reviews",ReviewRoutes)



app.listen(PORT,()=>console.log(`server started on port : ${PORT}`))
await connectToDB();
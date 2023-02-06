import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import seeders from "./seeders/users.js";
import router from "./routes/index.js";
import cors from "cors"


const app = express();
const corsOption = {
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    exposedHeaders: [
      "x-auth-token",
      "authorization",
    ]
  };
//middleware
app.use(express.json());
app.use("/api", router);
app.use(cors(corsOption));
dotenv.config(); 
//configure mongoose
mongoose.set('strictQuery', false);

mongoose.connect(
    process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Connected to MongoDB");
            seeders();
        }
    }
);
app.listen(process.env.PORT, () => {
    console.log("Server is running on port :", process.env.PORT);
});
export default app;

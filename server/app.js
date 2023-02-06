import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import seeders from "./seeders/users.js";
import router from "./routes/index.js";
import cors from "cors"
import bodyParser from "body-parser";
const app = express();
dotenv.config(); 

//middleware
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
// app.use(express.json());
const corsOption = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: [
    "x-auth-token",
    "authorization",
  ]
};

app.use(cors(corsOption));

app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))
app.use("/api", router);
//configure mongoose

    app.listen(process.env.PORT, () => {
    console.log("Server is running on port :", process.env.PORT);
});
export default app;
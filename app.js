import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";


import { connectDB } from './db/db.js';
import formRouter from './routes/form.js';
import userRouter from './routes/user.js';

dotenv.config();

connectDB();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT;

app.use('/forms', formRouter);
app.use('/users',userRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

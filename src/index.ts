import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

// routes
// import userRoutes from "./routes/users";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// define the port to run on: if not specified, run on port 5000
const PORT = process.env.PORT || 5000;

// app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}`);
});

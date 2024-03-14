import { mongoose } from "mongoose";
// import { validator } from "validator";
import dotenv from "dotenv";

dotenv.config();

const startDB = () => {
  const dburl = `mongodb+srv://zubair:GSp8lwnAJ4uUUIft@todoscluster.zmapm4g.mongodb.net/?
                  retryWrites=true&w=majority`;

  mongoose
    .connect(dburl, {
      dbName: "SQACircle",
    })
    .then(() => {
      console.log("Db connected");
    })
    .catch((e) => {
      console.log("errror is " + e);
    });
};

export { startDB };

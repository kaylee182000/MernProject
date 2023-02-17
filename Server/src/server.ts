import app from "./app";
import mongoose from "mongoose";
import env from "./util/validate";

const port = env.PORT;
const url = env.MONGODB_URL;

//must have strictQuery
mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then(() => {
    console.log("welcome to Mongoose");
    app.listen(port, () => {
      console.log(`${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

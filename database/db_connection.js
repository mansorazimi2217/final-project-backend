import mongoose from "mongoose";

const DBconnection = async () => {
  await mongoose
    .connect(process.env.URI)
    .then(() => {
      console.log("Conneced successfully!");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default DBconnection;

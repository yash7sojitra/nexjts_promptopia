import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Email is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String,
  },
});

//In ordinary express server it is always up and running
//but in nextjs when a route is called each time a new route is being created
//To avoid making new models all the time we use models

// It tries to access a model named User from the models object.
// If a model named User already exists, it uses that model and assigns it to the User constant.
// If no model named User exists, it creates a new model named User using the UserSchema object and assigns it to the User constant.

const User = models.User || model("User", UserSchema);

export default User;

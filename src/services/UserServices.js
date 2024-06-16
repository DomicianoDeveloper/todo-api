import bcrypt from "bcrypt";
import User from "../models/User.js";

const saltRounds = 10;

class UserServices {
  static async createUser(username, email, password) {
    try {
      const passwordHash = await bcrypt.hash(password, saltRounds);

      const user = new User(username, email, passwordHash);

      return user;
    } catch (e) {
      console.log(e);
    }
  }
}

export default UserServices;

import User from "../models/User.js";

class UserServices {
  static createUser(username, email, password) {
    try {
      const user = new User(username, email, password);

      return user;
    } catch (e) {
      console.log(e);
    }
  }

  static getUserByUsername(username) {
    const user = db.users.find((user) => user.username == username);
    return user;
  }
}

export default UserServices;

import User from "../models/User.js";

class UserServices {
  static createUser(username, email, password) {
    try {
      let user, msg;

      console.log("testing if has username");
      if (this.hasUsername(username)) {
        msg = "username is already in use";

        return { user, msg };
      }

      console.log("testing if has email");
      if (this.hasEmail(email)) {
        msg = "email is already in use";

        return { user, msg };
      }

      console.log("creating new user");
      user = new User(username, email, password);

      return { user, msg };
    } catch (e) {
      console.log(e);

      const msg = "Internal server error";

      return { _, msg };
    }
  }

  static getUserByUsername(username) {
    const user = db.users.find((user) => user.username == username);
    return user;
  }

  static getUserByID(id) {
    const user = db.users.find((user) => user.id == id);
    return user;
  }

  static hasUsername(username) {
    const user = db.users.find((user) => user.username === username);
    return user ? true : false;
  }

  static hasEmail(email) {
    const user = db.users.find((user) => user.email === email);
    return user ? true : false;
  }

  static deleteUser(id) {
    const user = this.getUserByID(id);
    db.users = this.removeItem(db.users, user);
  }

  static removeItem(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }
}

export default UserServices;

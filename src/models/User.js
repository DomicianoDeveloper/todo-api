import { v4 as uuidv4 } from "uuid";

class User {
  constructor(username, email, passwordHash) {
    this.id = uuidv4();
    this.username = username;
    this.email = email;
    this.passwordHash = passwordHash;
  }

  save() {
    db.users.push(this);
  }
}

export default User;

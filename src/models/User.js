import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

const saltRounds = 10;

class User {
  constructor(username, email, password) {
    this.id = uuidv4();
    this.username = username;
    this.email = email;

    const salt = bcrypt.genSaltSync(saltRounds);
    this.passwordHash = bcrypt.hashSync(password, salt);
  }

  save() {
    db.users.push(this);
  }

  async compare(password) {
    return await bcrypt.compare(password, this.passwordHash);
  }
}

export default User;

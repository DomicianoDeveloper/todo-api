import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

const saltRounds = 10;

class User {
  constructor(username, email, password) {
    this.id = uuidv4();
    this.username = username;
    this.email = email;
    this.passwordHash = this.encryptPassword(password);
  }

  save() {
    db.users.push(this);
  }

  async compare(password) {
    return await bcrypt.compare(password, this.passwordHash);
  }

  update(username, email, password) {
    this.username = username || this.username;
    this.email = email || this.email;
    this.passwordHash = this.encryptPassword(password) || this.passwordHash;
  }

  encryptPassword(password) {
    if (!password) {
      return;
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    const passwordHash = bcrypt.hashSync(password, salt);
    return passwordHash;
  }
}

export default User;

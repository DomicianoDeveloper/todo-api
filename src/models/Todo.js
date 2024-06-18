import { v4 as uuidv4 } from "uuid";

class Todo {
  constructor(user_id, title, description) {
    this.id = uuidv4();
    this.user_id = user_id;
    this.title = title;
    this.description = description;
    this.created_at = new Date();
    this.last_updated = new Date();
  }

  save() {
    db.todos.push(this);
  }

  update(title, description) {
    this.title = title || this.title;
    this.description = description || this.description;
    this.last_updated = new Date();
  }
}

export default Todo;

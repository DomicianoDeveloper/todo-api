import Todo from "../models/Todo.js";

class TodoServices {
  static createTodo(user_id, title, description) {
    const todo = new Todo(user_id, title, description);
    return todo;
  }

  static getTodo(id) {
    const todo = db.todos.find((todo) => todo.id === id);
    return todo;
  }

  static getAllTodo(user_id, limit) {
    let todoArray = db.todos.filter((todo) => todo.user_id == user_id);

    if (limit) {
      todoArray = todoArray.slice(0, limit);
    }

    return todoArray;
  }

  static deleteTodo(id) {
    const todo = this.getTodo(id);

    if (!todo) {
      return false;
    }

    db.todos = this.removeItem(db.todos, todo);
    return true;
  }

  static removeItem(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }
}

export default TodoServices;

export class Todo {

  static fromJson({ tarea, id, completado, creado }) {

    const tempTodo = new Todo(tarea);

    tempTodo.id = id;
    tempTodo.creado = creado;
    tempTodo.completado = completado;

    return tempTodo;
  }

  constructor(tarea) {
    this.tarea = tarea;

    this.completado = false;
    this.id = new Date().getTime();
    this.creado = new Date();
  }
}
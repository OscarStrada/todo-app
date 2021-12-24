import { Todo } from "../classes";
import { todoList } from "../index";

// Referencias en el HTML
const divTodoList = document.querySelector('.todo-list');
console.log(divTodoList);
const textInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed')
const filters = document.querySelector('.filters')
const anchorFilters = document.querySelectorAll('.filtro')

export const crearTodoHTML = (todo) => {
  const htmlTodo = `
  <li class="${(todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
    <div class="view">
      <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''}>
      <label>${todo.tarea}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
  </li>`

  const div = document.createElement('div');
  div.innerHTML = htmlTodo;

  divTodoList.append(div.firstElementChild);

}

// Eventos
textInput.addEventListener('keyup', (e) => {
  if (e.keyCode === 13 && textInput.value.length > 0) {
    const nuevoTodo = new Todo(textInput.value);
    todoList.nuevoTodo(nuevoTodo);

    crearTodoHTML(nuevoTodo);
    textInput.value = '';

    console.log(todoList);
  }
});

divTodoList.addEventListener('click', (e) => {
  const nombreElemento = e.target.localName; // input, label o button
  const todoElemento = e.target.parentElement.parentElement;
  const todoId = todoElemento.getAttribute('data-id');

  // Hizo click en el check
  if (nombreElemento.includes('input')) {
    todoList.marcarCompletado(todoId);
    todoElemento.classList.toggle('completed');
  } else if (nombreElemento.includes('button')) {
    todoList.eliminarTodo(todoId);
    divTodoList.removeChild(todoElemento);
  }

  console.log(todoList);
})

btnBorrar.addEventListener('click', () => {
  todoList.eliminarCompletados();

  for (let i = divTodoList.children.length - 1; i >= 0; i--) {
    const elemento = divTodoList.children[i];
    if (elemento.classList.contains('completed')) {
      divTodoList.removeChild(elemento);
    }
  }
});

filters.addEventListener('click', (e) => {

  const filtro = e.target.text;
  if (!filtro) { return; };

  anchorFilters.forEach(e => e.classList.remove('selected'));

  for (const elemento of divTodoList.children) {

    elemento.classList.remove('hidden');
    const completado = elemento.classList.contains('completed');

    switch (filtro) {

      case 'Pendientes':
        if (completado) {
          elemento.classList.add('hidden');
        }
        break;

      case 'Completados':
        if (!completado) {
          elemento.classList.add('hidden');
        }
        break;
    }
  }
});
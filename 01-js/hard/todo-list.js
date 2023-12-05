/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  constructor(){
     this.TodoList = new Array();
  }

  add(todo){
      this.TodoList.push(todo);
  }

  clear(){
      this.TodoList = new Array();
  }

  getAll(){
      return this.TodoList;
  }

  get(index){
    if(index<0 || index>=this.TodoList.length) return null ;
    return this.TodoList[index];
  }
  
  update(index , todo){
    if(index<0 || index>=this.TodoList.length) return null ;
    this.TodoList[index] = todo;
  }

  remove(index){
    if(index<0 || index>=this.TodoList.length) return null ;
     this.TodoList.splice(index,1);
  }

}

module.exports = Todo;

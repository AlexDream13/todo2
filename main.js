const selectAllButton = document.getElementById('selectAll');
const input = document.getElementById('input');
const textValue = document.getElementById('textValue');
const ulElement = document.getElementById('list');

let todoList = [];

input.addEventListener('keydown', (event) => {
   
   if((event.key == 'Enter' || event.keyCode === 13) && (input.value)){
      todoList.unshift({
         content: input.value,
         done:false,
         selected: false,
      });
      input.value = ''; 
      upgradeView();
      
   }
});

function upgradeView (){
   ulElement.innerHTML = '';
   
      for(let index = 0; index < todoList.length; index++){
      const todoItem = todoList[index];

      const liElement = document.createElement('li');
      liElement.className = 'list-group-item d-flex justify-content-between';
      ulElement.append(liElement);

      const divForm = document.createElement('div');
      divForm.className = 'form-group form-check';
      liElement.append(divForm);

      const checkElement = document.createElement('input');
      checkElement.className = 'form-check-input';
      checkElement.id = 'todoItem'+ index;
      checkElement.setAttribute('type', 'checkbox');
      checkElement.checked = todoItem.selected;
      divForm.append(checkElement);

      const labelElement = document.createElement('label');
      labelElement.className = 'form-check-label';
      if(todoItem.done){labelElement.className += ' todoDone'}
      labelElement.setAttribute('for', 'todoItem'+ index);
      labelElement.innerText = todoItem.content;
      divForm.append(labelElement);

      const divButtons = document.createElement('div');
      liElement.append(divButtons);

      const buttonDoneElement = document.createElement('button');
      buttonDoneElement.setAttribute('type', 'button');
      buttonDoneElement.className = 'btn btn-primary mr-1';
      if(todoItem.done){
         buttonDoneElement.innerText = 'Выполнено';
      }else{
         buttonDoneElement.innerText = 'Не выполнено'; 
      }
      
      divButtons.append(buttonDoneElement);

      const buttonRemoveElement = document.createElement('button');
      buttonRemoveElement.setAttribute('type', 'button');
      buttonRemoveElement.className = 'btn btn-danger';
      buttonRemoveElement.innerText = 'Удалить';
      divButtons.append(buttonRemoveElement);

      buttonDoneElement.addEventListener('click', () => {
         todoItem.done = !todoItem.done;
         upgradeView ();
         });
      buttonRemoveElement.addEventListener('click', () => {
         
         if(todoItem.selected)todoList = todoList.filter(currentTodoItem => currentTodoItem !== todoItem);
         upgradeView ();
         });
      checkElement.addEventListener('change', () => {
         todoItem.selected = checkElement.checked;
         });
      }
}


document.getElementById('doneAction').addEventListener('click', () => {
   for (const todoItem of todoList){
      if(todoItem.selected){
         todoItem.done = true;
         todoItem.selected = false;
      }
   }
   upgradeView();
});
document.getElementById('restoreAction').addEventListener('click', () => {
   for (const todoItem of todoList){
      if(todoItem.selected){
         todoItem.done = false;
         todoItem.selected = false;
      }
   }
   upgradeView();
});

document.getElementById('removeAction').addEventListener('click', () => {
   for (const todoItem of todoList){
   if(todoItem.selected)todoList = todoList.filter(currentTodoItem => currentTodoItem !== todoItem);
   }
   upgradeView();
   
});
selectAllButton.addEventListener('click', () => {
   for (const todoItem of todoList){
      todoItem.selected = true;
   }
   upgradeView();
   
});




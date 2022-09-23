import { Component, OnInit } from '@angular/core';
import { Category } from '../category.model';
import { Todo_item } from '../todo_item.model';
import { UserdataService } from '../userdata.service';
import { ApiCallService } from '../api-call.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  categoryName : string = "";
  toDo_list_details: Todo_item[] = [];
  categoryId: number;
  todoCheckItemUpdate : Todo_item; 
  checkedElementIndex: number;
  categorySelected: boolean = false;

  constructor(private userdataservice : UserdataService,
              private apicallservice : ApiCallService) { }

  ngOnInit(): void {
    if(this.categoryName === " "){
      this.categorySelected = false;
    }

    this.userdataservice.toDoCategoryUpdate.subscribe((data: Category)=>{  
      this.categoryName = data.cat_desc;
      this.categoryId = data.cat_id;
      this.categorySelected = true;
      // fetch the todo list 
      this.apicallservice.onFetchTodolist(this.categoryId).subscribe((responseData)=>{
        this.toDo_list_details = responseData;
      });
    });

    this.userdataservice.displayToDoList.subscribe((newTodoItem: Todo_item)=>{
      this.toDo_list_details.push(newTodoItem);

      this.apicallservice.onFetchTodolist(this.categoryId).subscribe((responseData)=>{
        this.toDo_list_details = responseData;
      });
    });

  }

  deleteToDoItem(deleteItem:HTMLInputElement){
    let deleteConfirm = confirm("Do you want to delete the item");
    if(deleteConfirm === true){
      this.apicallservice.onDeleteTodoItem(Number(deleteItem.id)).subscribe(()=>{
        
        // api call for fetch the todo list after delete
        this.apicallservice.onFetchTodolist(this.categoryId).subscribe((responseData)=>{
          this.toDo_list_details = responseData;
        });
      });
    }
  }


  editToDoItem(editElement: HTMLInputElement){
  
   this.userdataservice.editToDoListItem.next(Number(editElement.id));
  

  }
// strike thorough the todo item. 
  onChecked(checkElement : HTMLInputElement, labelEle:HTMLLabelElement){
    
    for( let todoCheckedItem of this.toDo_list_details){
    
      if(todoCheckedItem.todo_id == Number(checkElement.id) ){
        if(checkElement.checked === true){
          todoCheckedItem.todo_check_status = true;
          this.checkedElementIndex = Number(checkElement.id);
          this.todoCheckItemUpdate = todoCheckedItem; 
          break;
          
        }
        else{
        
          todoCheckedItem.todo_check_status = false; 
          this.todoCheckItemUpdate = todoCheckedItem; 
        }
      }
   }
        this.apicallservice.onUpdateTodoItem(this.todoCheckItemUpdate).subscribe(()=>{
          
          this.apicallservice.onFetchTodolist(this.categoryId).subscribe((responseData)=>{
            this.toDo_list_details = responseData;
          });
      })
  }
}

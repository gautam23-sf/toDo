import { BootstrapOptions, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subscription, fromEvent, Observable} from 'rxjs';
import { UserdataService } from '../userdata.service';
import { ApiCallService } from '../api-call.service';
import { Todo_item, Post_Todo} from '../todo_item.model';
import { Category } from '../category.model';


@Component({
  selector: 'app-userinput',
  templateUrl: './userinput.component.html',
  styleUrls: ['./userinput.component.css']
})
export class UserinputComponent implements OnInit {


  @ViewChild('f') userinputForm: NgForm;
  userinputToDoList : Boolean = false;
  categoryList: Category[] = [];
  categoryArray : string[] = [];
  categoryItem: Category;
  toDoList: Todo_item[] = [];
  postTodoItem : Post_Todo  = {todo_desc: "", todo_check_status: false, cat_id : 0};
  todoItem : Todo_item  = {todo_desc: "", todo_check_status: false, cat_id : 0, todo_id: 0};
  toDoListCategoryItem: Category;
  resetStatus: boolean = false;
  editStatus: boolean = false;
  updateToDoListItemsBtn: Boolean = false;
  focusOnInputElement: Boolean = false;
  editItemIndex : number;
  on_update : boolean = false;
  edit_obj: object = { };
  // editValue : string = "";
  editInputText : string = ""
  
  
  
  constructor(private userdataservice : UserdataService,
    private http: HttpClient,
    private apicallservice : ApiCallService) {
    }
    
    ngOnInit(): void {
      
      this.apicallservice.onFetchCategory().subscribe((responseData)=>{
        for ( const category of responseData){
          this.categoryArray.push(category.cat_desc);
          this.categoryList.push(category);
        }
      });
      
      this.userdataservice.toDoCategoryUpdate.subscribe((data)=>{
      if(data){
        this.userinputToDoList = true;
        this.toDoListCategoryItem = data;
        this.updateToDoListItemsBtn = false;
        
      }
    });
    
    this.userdataservice.editToDoListItem.subscribe((todoEditIndex : number )=>{
      if(todoEditIndex > 0){
        this.apicallservice.onFetchTodolist(this.toDoListCategoryItem.cat_id).subscribe((responseData)=>{
          this.toDoList = responseData;  
          for(let todoEditItem of this.toDoList){
            if(Number(todoEditItem.todo_id) === todoEditIndex){
              this.editInputText = todoEditItem.todo_desc;
            }
          }        
        });
        this.resetStatus = true;
        this.updateToDoListItemsBtn = true;
        this.editItemIndex = todoEditIndex;
      }
    });
    
    this.userdataservice.resetToHomePage.subscribe((toHomePage)=>{
      if(toHomePage){
        this.userinputToDoList = false;
        this.resetStatus = false;
        this.focusOnInputElement = true;
      }
    });
  }
  
  onSubmit(){
      if(this.userinputForm.control.contains('category_list_items') && this.userinputForm.form.value.category_list_items.trim() !== ''){
        
        const newCatItem : string = this.userinputForm.form.value.category_list_items.toUpperCase();
        
        let checkDuplicateCategory  = this.categoryArray.indexOf(newCatItem);;
        if(checkDuplicateCategory >= 0){
          alert("The CATEGORY with the same name exists, please enter the unique name!!");
        }
        else{
          this.categoryArray.push(newCatItem);

          // Post category data to DB
          this.apicallservice.onPostCategory(newCatItem).subscribe((responseData)=>{
          this.categoryItem = responseData;
          this.userdataservice.appendCategoryList.next(this.categoryItem);
          this.userinputForm.reset();
          })
        }; 
       
      }
    
      else if(this.userinputForm.control.contains('toDo_list_items') && this. userinputForm.form.value.toDo_list_items.trim() !== ''){
  
        // initialize the todo Post data item
        this.postTodoItem.todo_desc = this.userinputForm.form.value.toDo_list_items.toUpperCase();
        this.postTodoItem.todo_check_status = false,
        this.postTodoItem.cat_id = this.toDoListCategoryItem.cat_id;
        // call API for Post request to todo item
        this.apicallservice.onPostTodoItem(this.postTodoItem).subscribe((responseData)=>{
          this.todoItem = responseData;
          this.userdataservice.displayToDoList.next(this.todoItem); // update the servcie with any change in the input to do details. 
        })
        this.userinputForm.reset();
      }
      else{
        alert("Please enter the valid Alphanumeric value of input field");
        this.userinputForm.reset();
      }
  }


  onReset(){
    this.resetStatus = false;
    this.userinputForm.reset();
    this.updateToDoListItemsBtn = false;
  }

  onUpdate(editedTodoItem : string){
    this.apicallservice.onFetchTodolist(this.toDoListCategoryItem.cat_id).subscribe((responseData)=>{
      this.toDoList = responseData;  
  
      for(let todoEditItem of this.toDoList){
        if(Number(todoEditItem.todo_id) === this.editItemIndex){
           todoEditItem.todo_desc = editedTodoItem.toUpperCase() ;
           this.apicallservice.onUpdateTodoItem(todoEditItem).subscribe((responseData)=>{
           console.log(responseData);
           this.userdataservice.displayToDoList.next(todoEditItem);
           })
          }
          else continue;
        }        
      });
    this.on_update = true;
    this.resetStatus = false;
    this.userinputForm.reset();
    this.updateToDoListItemsBtn = false;
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from './category.model';
import { Todo_item} from './todo_item.model';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {
  appendCategoryList: BehaviorSubject<Category> = new BehaviorSubject({cat_id:0 , cat_desc: ""});
  toDoCategoryUpdate : BehaviorSubject<Category> = new BehaviorSubject ({cat_id:0 , cat_desc: ""});
  displayToDoList : BehaviorSubject<Todo_item> = new BehaviorSubject<Todo_item>(
    {todo_id:0,
     todo_desc:"", 
     todo_check_status : false, 
     cat_id:0 
    });
  editToDoListItem : BehaviorSubject<number> = new BehaviorSubject<number> (0);
  resetToHomePage : BehaviorSubject<boolean> = new BehaviorSubject (true);

  constructor() { }
}

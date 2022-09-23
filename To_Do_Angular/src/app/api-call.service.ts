import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './category.model';
import { Todo_item, Post_Todo} from './todo_item.model';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  constructor(private http : HttpClient) { }
  // Api's
  onPostCategory(addNewCategory : string): Observable<Category>{
    const newCatItem = {cat_desc : addNewCategory};
    const headers = { 'content-type': 'application/json'} ;
    const responseType = "json";
    return this.http.post<Category>("http://localhost:3000/category", newCatItem, {'headers': headers, 'responseType' : responseType})
  }

  onFetchCategory():Observable<Category[]> {
  return this.http.get<Category[]>("http://localhost:3000/category", {'responseType' : 'json'});
  }

  // for deleting all the categories and related todos 
  onMasterReset(){
   return this.http.delete(`http://localhost:3000/category`);
  }


  onPostTodoItem(newTodoItem : Post_Todo): Observable<Todo_item>{
    const headers = { 'content-type': 'application/json'} ;
    const responseType = "json";
    return this.http.post<Todo_item>("http://localhost:3000/todo", newTodoItem , {'headers': headers, 'responseType' : responseType})
  }

  onFetchTodolist(cat_id:number):Observable<Todo_item[]> {
    return this.http.get<Todo_item[]>(`http://localhost:3000/todo/${cat_id}`, 
    { 'responseType' : 'json'
    });
  }
  
  onUpdateTodoItem(todoEditItem : Todo_item){
   return this.http.put(`http://localhost:3000/todo/${todoEditItem.todo_id}`, todoEditItem,{ 'responseType' : 'json'})
  }
  
  onDeleteTodoItem(todoDeleteIndex:number){
   return this.http.delete(`http://localhost:3000/todo/${todoDeleteIndex}`)
  }

}

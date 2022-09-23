import { Component, OnInit } from '@angular/core';
import { UserdataService } from '../userdata.service';
import { ApiCallService } from '../api-call.service';
import { Category } from '../category.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
categories: object[];
categoryArray : string[] = [];
categoryList : Category[] = [];
newCategoryItem : Category;
selectedTodoCategoryItem: Category = {cat_desc:"", cat_id : 0};

  constructor(private userdataservice: UserdataService, 
              private apicallservice : ApiCallService ) { }

  ngOnInit(): void {
    
    this.apicallservice.onFetchCategory()
    .subscribe((responseData)=>{
      for ( const category of responseData){
        this.categoryArray.push(category.cat_desc);
        this.categoryList.push(category);
      }
      }); 
    
    this.userdataservice.appendCategoryList.subscribe((data: Category)=>{
     this.newCategoryItem = data;
     this.categoryList.push(this.newCategoryItem);
    });
  }

  displayCategoryToDo(event:HTMLElement){
    this.selectedTodoCategoryItem.cat_desc = event.innerText;
    this.selectedTodoCategoryItem.cat_id = Number(event.id);
    // update service for the category selected from the list of categories in the sidebar
    this.userdataservice.toDoCategoryUpdate.next(this.selectedTodoCategoryItem);
  }
  
  onbackToHomePage(){
    this.userdataservice.resetToHomePage.next(true);
  }


  onMasterReset(){
    const resetAll : boolean = confirm("You are about RESET , All data will be lost"); 
    if(resetAll === true){
      this.apicallservice.onMasterReset().subscribe(()=>{
        console.log("Master reset");

        this.apicallservice.onFetchCategory().subscribe((responseData)=>{
          this.categoryList = responseData;
        });
      })
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { TodoService } from './shared/todo.service'
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {

  toDoListArray: any[];

  constructor(private toDoService : TodoService) { }

  ngOnInit(): void {
    this.toDoService.getList().snapshotChanges().subscribe(
      item =>{
        this.toDoListArray = [];
        item.forEach( element =>{
          var x = element.payload.toJSON();
          x["$key"] = element.key;
          this.toDoListArray.push(x);
        })
      });
  }


  onAdd(itemTitle){
    this.toDoService.addItem(itemTitle.value);
    itemTitle.value = null;
  }

  onDelete($key : string){
    this.toDoService.removeItem($key);
  }

  onDeleteAll(){
   this.toDoListArray.forEach(element =>{
     this.toDoService.removeItem(element.key);
   });
    
  }

}

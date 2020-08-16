import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  toDoList: AngularFireList<any>;
  constructor(private firebasedb: AngularFireDatabase) { }

  getList(){
    this.toDoList = this.firebasedb.list('items');
    return this.toDoList;
  }

  addItem(item: string){
    this.toDoList.push({
      name: item
    });
  }

  removeItem($key: string){
    this.toDoList.remove($key);
  }
}

import { Component, OnInit} from '@angular/core';
import { MainService } from '../main.service';
declare var $:any;
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers: [MainService]
})
export class MainPageComponent implements OnInit {
   val = 500;
   isDropAllowed = (dragData: any) => {
    return dragData > this.val;
  }

  constructor(
     public mainservice : MainService,
  ) { 
    
  }
  loader:boolean=true;
  succesMessage;
  errorMessage;
  error:boolean=false;
  success:boolean=false;
  ngOnInit() {
    this.getLists();
    this.getTaskLists();
    console.log(this.loader);
  }
  
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasklist, event.previousIndex, event.currentIndex);
    console.log(this.tasklist,'movies');
    console.log(event.previousIndex,'movies');
    console.log(event.currentIndex,'movies');
  }
  removeItem(item: any, list: Array<any>) {
    let index = list.map(function (e) {
      return e.name
    }).indexOf(item.name);
    list.splice(index, 1);
  }
  cleardata(){
    $('#do_somthing').val('');
    this.editButton=false;
  }
  userlist:any;
  getLists(){ 
    this.loader=true;
    console.log('tests');
    this.mainservice.getList().subscribe(
    res => {
      this.loader=false;
      this.userlist=res.users;
       console.log(res,'res');
    }, 
    err=>{
      this.loader=false;
       console.log(err,'err');
    });
  }
 tasklist:any;
 getTaskLists(){ 
    this.loader=true;
    console.log('tests');
    this.mainservice.getTaskList().subscribe(
    res => {
      this.loader=false;
      this.tasklist=res.tasks;
       console.log(res.tasks,'this.tasklist');
    },
    err=>{
      this.loader=false;
       console.log(err,'err');
    });
  }

 
 
  addTask_note:any;
  createTask(event){
    this.loader=true;
    this.addTask_note = "";
    this.addTask_note = $('#do_somthing').val();
    this.mainservice.createTask(this.selectedUser,this.addTask_note).subscribe(
      res => {
         this.getTaskLists();
         this.loader=false;
         this.addTask_note = null;
         this.selectedUser='';
         this.succesMessage="Task Created Successfully"
      }, 
      err => {
        this.loader=false;
        this.errorMessage="Something went wrong"
        console.log(err);
     });
  }

  //to delete note
  deleteTask(task){
    this.loader=true;
    this.mainservice.deleteTask(task.id).subscribe(
      res => {
        this.loader=false;
        this.getTaskLists();
        this.succesMessage="Task Deleted Successfully"
      }, 
      err => {
        this.loader=false;
        console.log(err);
        this.errorMessage="Something went wrong"
      });
  }
  editButton:boolean=false;
  editTask(task_details){
    console.log(task_details,'task_details');
    $('#myModal').modal('show');
    $('#do_somthing').val(task_details.message);
    this.editButton=true;
    this.selectedUser=task_details.id;
    this.addTask_note=task_details.message;
  }
  //to edit notes
  edit_note:any;
  UpdateTask(){
    this.loader=true;
    this.addTask_note = "";
    this.addTask_note = $('#do_somthing').val();
    this.mainservice.editTasks(this.selectedUser,this.addTask_note).subscribe(
      res => {
        this.getTaskLists();
        this.addTask_note = null;
        this.selectedUser='';
        this.loader=false;
        this.succesMessage="Task Deleted Successfully"
      }, 
      err => {
        this.loader=false;
        this.errorMessage="Something went wrong"
        console.log(err);
    });
  }
   selectedUser:any;
   changeSub(event){
     this.selectedUser=event.target.value;
     console.log(this.selectedUser,'event');
   }
   search_val:any;
   search(){
     this.loader=true;
     this.search_val=$('#search').val();
     var nameCapitalized = this.search_val.charAt(0).toUpperCase() + this.search_val.slice(1)
     this.tasklist = this.tasklist.filter(year =>{
      if(year.assigned_name == nameCapitalized){
        return year 
      }
     })
      setTimeout(() => {
         this.loader=false;
      }, 500)
   }
   ClearSearch(){
     this.getTaskLists();
     this.search_val=null;
     $('#search').val('');
   }
}

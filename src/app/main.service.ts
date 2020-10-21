import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { catchError, retry, map } from 'rxjs/operators';
import { Http, Response, Headers, RequestOptions,URLSearchParams } from '@angular/http';
import { environment } from "../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class MainService {
   options: RequestOptions;
  constructor(private http: Http) { 
  	 this.options = this.getHeaders();
  }
  private extractData(res: Response) {
    let body = res.json();
    return body; 
  }
  private handleError (error: Response | any) {
    return throwError(error.message || error);
  } 
  headers: Headers;
  getHeaders(): RequestOptions {
    this.headers = new Headers();
    this.headers.append('AuthToken', "UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a");
    this.headers.append('Cache-Control', 'no-cache, no-store, must-revalidate');
    this.headers.append('Pragma', 'no-cache');
    this.headers.append('Expires', '0');
    return new RequestOptions({headers: this.headers});
   }
  getList(){
  	console.log('tests');
    let url = environment.apiBaseUrl + "/tests/tasks/listusers";
    return this.http
      .get(url, this.options)
      .pipe(map(this.extractData), catchError(this.handleError));
  }
  createTask(selectedUser,task){
    let url = environment.apiBaseUrl+ "/tests/tasks/create";
    let formData = new FormData();
    formData.append("message", task);
    formData.append("assigned_to",selectedUser);
    return this.http.post(url,formData,this.options)
      .pipe(map(this.extractData), 
      catchError(this.handleError));
  }
  getTaskList(){
  	console.log('tests');
    let url = environment.apiBaseUrl + "/tests/tasks/list";
    return this.http
      .get(url, this.options)
      .pipe(map(this.extractData), catchError(this.handleError));
  }
  deleteTask(task_id){
  	let url = environment.apiBaseUrl+ "/tests/tasks/delete";
    let formData = new FormData();
    formData.append("taskid", task_id);
    return this.http.post(url,formData,this.options)
      .pipe(map(this.extractData), 
      catchError(this.handleError));
  }
  editTasks(selectedUser,task){
  	let url = environment.apiBaseUrl+ "/tests/tasks/update";
    let formData = new FormData();
    formData.append("message", task);
    formData.append("taskid",selectedUser);
    return this.http.post(url,formData,this.options)
      .pipe(map(this.extractData), 
      catchError(this.handleError));
  }
}

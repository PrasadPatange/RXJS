import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError, switchMap, of } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

 public apiUrl:string = 'http://localhost:3000/users';

  constructor(private http:HttpClient) { }

  // Get All
  getAllUser():Observable<User>{
    return this.http.get<User>(`${this.apiUrl}`)
    .pipe(
       switchMap((res: any) => {
        return of(res);
      }),
      catchError(this.errorHandler)
    )
  }

  // Create User
  CreateUser(userData:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}`,userData)
    .pipe(
      switchMap((res: any) => {
        return of(res);
      }),
      catchError(this.errorHandler)
    )
  }

  // get SingleUser
  getSingleUser(id:any):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${id}`)
    .pipe(
      switchMap((res: any) => {
        return of(res);
      }),
      catchError(this.errorHandler)
    )
  }

  // update User
  updateUser(data:any):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/${data.id}`,data)
    .pipe(
      switchMap((res: any) => {
        return of(res);
      }),
      catchError(this.errorHandler)
    )
  }

  // delete User
  deleteUser(data:any){
    return this.http.delete<any>(`${this.apiUrl}/${data.id}`)
    .pipe(
      switchMap((res: any) => {
        return of(res);
      }),
      catchError(this.errorHandler)
    )
  }

  // Search User 
  getUserList(searchTerm: string | number) {
    // return this.http.get(this.apiUrl + "?q=" + searchTerm)
    return this.http.get(`${this.apiUrl}?q=${searchTerm}`)
    .pipe(
           switchMap((res:any) => {
              return of(res);
           }),
           catchError(this.errorHandler)
    )
  }

  errorHandler(error:HttpErrorResponse){
    return throwError(error.message || "Server Error")
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://fletnix-backend-eight.vercel.app/';

  constructor(private http: HttpClient) { }

  getContent(query : any): Observable<any>{
    return this.http.get(`${this.baseUrl}content/${query}`).pipe(catchError(this.handleError));
  }

  login(payload : any){
    return this.http.post<any>(`${this.baseUrl}login/` , payload).pipe(
      catchError(this.handleError)
    );
  }

  register(payload : any){
    return this.http.post<any>(`${this.baseUrl}register/` , payload).pipe(
      catchError(this.handleError)
    );
  }


  

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}

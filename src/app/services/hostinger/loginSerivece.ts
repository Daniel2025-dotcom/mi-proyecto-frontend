import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginUserDto {
  email: string;
  password: string;
}
export interface LoginResponseDto {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private http = inject(HttpClient); 
  private apiUrl = 'http://localhost:8080/login';

  userValidator(loginUserDto: LoginUserDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(`${this.apiUrl}/validator`, loginUserDto);
  }
}
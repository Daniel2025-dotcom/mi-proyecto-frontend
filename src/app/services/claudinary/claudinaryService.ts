import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
export interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
}
@Injectable({
  providedIn: 'root'
})
export class CloudinaryService{
  private http = inject(HttpClient); 
  private apiUrl = `https://api.cloudinary.com/v1_1/${environment.cloudinary.cloudName}/image/upload`;

   upImg(sourceImg: File): Observable<CloudinaryResponse> {
    const formData = new FormData();
    formData.append('file', sourceImg);
    formData.append('upload_preset', environment.cloudinary.uploadPreset);  //el nombre es obligatorio, el e, tipo que espera post en claudynary
    return this.http.post<CloudinaryResponse>(this.apiUrl,formData);
  }

}
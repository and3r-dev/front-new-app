import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Process } from '../models/process';

const baseUrl = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  constructor(private http: HttpClient) { }

  getCidadesEstados(): Observable<any> {
    return this.http.get('https://servicodados.ibge.gov.br/api/v1/localidades/municipios');
   }

   postProcess(process: FormData): Observable<any> {
    return this.http.post<Process>(`${baseUrl}processo/cadastrar`, process);
  }

   putProcess(process: FormData): Observable<any> {
    return this.http.put<Process>(`${baseUrl}processo/editar`, process);
  }

  getProcess(): Observable<any> {
    return this.http.get(`${baseUrl}`);
  }

  getProcessPerPage(data: HttpParams): Observable<any> {
    return this.http.get(`${baseUrl}`, { params: data} );
  }

  getProcessById(process_id: number): Observable<any> {
    return this.http.get(`${baseUrl}processo/${process_id}`);
  }

}

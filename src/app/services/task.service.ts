import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:9000/api';

  constructor(private http: HttpClient) {}

  // Obter todas as tarefas
  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tasks`);
  }

  // Adicionar uma nova tarefa
  addTask(title: string, description: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/tasks`, { title, description });
  }

  // Atualizar uma tarefa existente
  updateTask(id: number, title: string, description: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/tasks/${id}`, { title, description });
  }

  // Deletar uma tarefa
  deleteTask(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/tasks/${id}`);
  }
}

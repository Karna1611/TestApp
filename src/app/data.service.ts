import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DummyData } from './data.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataUrl = 'assets/data.json';
  private data: DummyData[] = [];

  constructor(private http: HttpClient) {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.http.get<{ DummyData: DummyData[] }>(this.dataUrl).pipe(
      map(response => response.DummyData)
    ).subscribe((data) => {
      this.data = data;
    });
  }

  getDummyData(): Observable<DummyData[]> {
    return of(this.data);
  }

  addEmployee(newEmployee: DummyData): Observable<void> {
    this.data.push(newEmployee);
    return of();
  }

  updateEmployee(updatedEmployee: DummyData): Observable<void> {
    // Update the local data array
    const index = this.data.findIndex(emp => emp.id === updatedEmployee.id);
    if (index !== -1) {
      this.data[index] = updatedEmployee;
    }
    // Logic to update the JSON file on the server would go here

    return new Observable<void>(observer => {
      observer.next();
      observer.complete();
    });
  }

  deleteEmployee(id: string): Observable<void> {
    this.data = this.data.filter(e => e.id !== id);
    return of();
  }
}

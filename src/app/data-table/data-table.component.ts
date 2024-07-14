import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { DummyData } from '../data.model';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  data: DummyData[] = [];
  cols: any[] = [];

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadData();
    this.setupColumns();
  }

  loadData(): void {
    this.dataService.getDummyData().subscribe(
      (response) => {
        this.data = response;
        console.log('Data loaded:', this.data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  setupColumns(): void {
    this.cols = [
      { field: 'id', header: 'ID', visible: false },
      { field: 'EmployeeId', header: 'Employee ID', visible: true },
      { field: 'EmployeeName', header: 'Employee Name', visible: true },
      { field: 'DateOfJoining', header: 'Date of Joining', visible: true },
      { field: 'DateOfBirth', header: 'Date of Birth', visible: true },
      { field: 'Salary', header: 'Salary', visible: true }
    ];
  }

  formatDate(date: any): string {
    const d = new Date(date);
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  formatSalary(value: any): string {
    if (typeof value === 'string') {
      const parsedValue = parseFloat(value);
      if (!isNaN(parsedValue)) {
        return parsedValue.toLocaleString('en-US');
      }
    }
    return value.toString();
  }

  onEdit(employee: DummyData): void {
    this.router.navigate(['/edit-employee', employee.id]);
  }
}

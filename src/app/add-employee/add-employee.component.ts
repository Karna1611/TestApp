import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { DummyData } from '../data.model';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      EmployeeId: ['', Validators.required],
      EmployeeName: ['', Validators.required],
      DateOfJoining: ['', Validators.required],
      DateOfBirth: ['', Validators.required],
      Salary: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      this.dataService.getDummyData().subscribe(data => {
        const newId = (Math.max(...data.map(e => parseInt(e.id))) + 1).toString();
        const newEmployee: DummyData = {
          id: newId,
          EmployeeId: this.employeeForm.value.EmployeeId,
          EmployeeName: this.employeeForm.value.EmployeeName,
          DateOfJoining: this.employeeForm.value.DateOfJoining,
          DateOfBirth: this.employeeForm.value.DateOfBirth,
          Salary: this.employeeForm.value.Salary
        };
        
        this.dataService.addEmployee(newEmployee).subscribe(() => {
          this.router.navigate(['/data-table']);
        });
      });
    } else {
      this.employeeForm.markAllAsTouched(); // Mark all fields as touched to display validation messages
    }
  }
}

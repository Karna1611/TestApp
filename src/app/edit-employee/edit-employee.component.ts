import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { DummyData } from '../data.model';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  employeeForm!: FormGroup;
  employee!: DummyData;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.dataService.getDummyData().subscribe(data => {
        this.employee = data.find(emp => emp.id === id)!;
        this.createForm();
      });
    });
  }

  createForm(): void {
    this.employeeForm = this.fb.group({
      id: [{ value: this.employee.id, disabled: true }],
      EmployeeId: [this.employee.EmployeeId, Validators.required],
      EmployeeName: [this.employee.EmployeeName, Validators.required],
      DateOfJoining: [this.employee.DateOfJoining, Validators.required],
      DateOfBirth: [this.employee.DateOfBirth, Validators.required],
      Salary: [this.employee.Salary, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const updatedEmployee: DummyData = {
        ...this.employee,
        EmployeeId: this.employeeForm.value.EmployeeId,
        EmployeeName: this.employeeForm.value.EmployeeName,
        DateOfJoining: this.employeeForm.value.DateOfJoining,
        DateOfBirth: this.employeeForm.value.DateOfBirth,
        Salary: this.employeeForm.value.Salary
      };

      this.dataService.updateEmployee(updatedEmployee).subscribe(() => {
        this.router.navigate(['/data-table']);
      });
    }
  }
}

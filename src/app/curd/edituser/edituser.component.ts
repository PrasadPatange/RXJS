import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css'],
})
export class EdituserComponent implements OnInit {
  public userId: any;

  public userForm!: FormGroup;
  public errorMessage: any;
  public success: any;

  constructor(
    public apiService: ApiService,
    public fb: FormBuilder,
    public activateRoute: ActivatedRoute,
    public route: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.activateRoute.snapshot.params['id'];
    this.fetchUserForm(this.userId);
  }
  fetchUserForm(id: any) {
    this.userForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
    this.apiService.getSingleUser(id).subscribe((res) => {
      this.userForm.patchValue({
        id: res.id,
        name: res.name,
        email: res.email,
      });
    });
  }

  get formControl() {
    return this.userForm.controls;
  }

  updateUser() {
    const user = this.userForm.value;
    this.apiService.updateUser(user).subscribe(
      (data: any) => {
        this.success = `${data.name} Updated Successfully`;
        setTimeout(() => {
          this.success = false;
          this.route.navigate(['/']);
        }, 3000);
      },
      (err: any) => {
        this.errorMessage = err;
        setTimeout(() => {
          this.errorMessage = false;
        }, 3000);
      }
    );
  }
}

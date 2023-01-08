import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {


  public userForm! :FormGroup;
  public errorMessage:any;
  public success:any;

  constructor(public fb : FormBuilder,public apiService:ApiService ,public route:Router) { }

  ngOnInit(): void {
    this.CreateUserForm();
  }

  CreateUserForm(){
    this.userForm = this.fb.group({
      name: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.email]]
    })
  }
  
  get formControl(){
    return this.userForm.controls;
  }

  submit(){
    const userData = this.userForm.value;
    this.apiService.CreateUser(userData).subscribe((user:User)=>{
      this.success =  `${user.name} Added Successfully`;
      setTimeout(() => {
          this.route.navigate(['/']);
      }, 3000);
    },
    (err:any)=>{
      this.errorMessage = err;
    }
    )

  }

}

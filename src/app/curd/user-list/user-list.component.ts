import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, pluck, switchMap } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {


  public userList : any = [];
  public singleUser : any;
  public errorMsg:any;
  public deleteErr:any;
  public userName:any;

   // Search
   @ViewChild('searchForm') searchForm!: NgForm;
   searchCount : any;

  constructor(public apiService : ApiService) { }

  ngOnInit(): void {
    this.getAllUser();
  }

   // Search
   ngAfterViewInit(): void {
    const formValue = this.searchForm.valueChanges;
    formValue?.pipe(
      // pluck('searchTerm'),   
      map(x => x.searchTerm),   
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(data => this.apiService.getUserList(data)),


    ).subscribe((res:any) =>{
      this.userList = res;
      console.log("Search : ",this.userList )
      this.searchCount = Object.keys(res).length;
      console.log("searchCount : ",this.searchCount )
    })
    
  } 

  

  getAllUser(){
    this.apiService.getAllUser().subscribe((data:any) => {
      this.userList = data;
  })
  }

  viewUser(id:any){
    this.apiService.getSingleUser(id).subscribe((data:any)=>{
      this.singleUser = data;
    },
    (err:any) => {
      setTimeout(() => {
        this.errorMsg = err;
      }, 3000);
    }
    )
  }
  deleteUser(data:any){
    this.userName = `${data.name} Deleted Successfully!`;
    setTimeout(() => {
      this.userName = false;
    }, 3000);
    this.apiService.deleteUser(data).subscribe((data:any)=>{
          this.getAllUser();
    },
    (err:any)=>{
      setTimeout(() => {
        this.deleteErr = err;
      }, 3000);
    }
    )
  }
}

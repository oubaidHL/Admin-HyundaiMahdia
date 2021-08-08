import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/users';
import { Response } from 'src/app/models/response';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit {
  
  @Input() users: User[];
  userModalOpen = false;
  selectedUser : User;
  delete = false;
  userToBeDelete: User;
  file: File;
  progress = 0;
  baseUrlImage = `${environment.api_imageUser}`;
  userSub;
  isAuth = false;

  constructor(private router: Router,private UsersService:UsersService,private fileService: FileUploadService) { }
  ngOnInit(): void {
    this.userSub = this.UsersService.getUsers().subscribe(
      (response: Response)=>{
        this.users = response.result;
      },
      (error)=>{
        console.log(error);

      }

    )
  }

  onEdit(user: User):void {
    this.userModalOpen = true;
    this.selectedUser = user;

  }

  onDelete(user: User): void{
    this.delete = true;
    this.userToBeDelete = user;
  }

  addUser():void {
    this.selectedUser = undefined;
    this.userModalOpen = true;
  }

  handleCancelDelete(){
    this.delete = false;
  }

  

  handleConfirmDelete(){
    this.UsersService.deleteUser(this.userToBeDelete).subscribe(
      (data: Response)=>{
        if(data.status == 200){
          // Delete user Image
          this.fileService.deleteImage(this.userToBeDelete.image).subscribe(
            (data: Response)=>{
              console.log(data);

            }
          )
          console.log(data);

          // Update Frontend
          const index = this.users.findIndex(p => p.idUser == this.userToBeDelete.idUser);
          this.users.splice(index,1);

        }else{
          console.log(data.message);
        }
      }
    )
    this.handleCancelDelete();
  }

  handleFinish(event){
    if(event && event.user){
      let user = event.user ? event.user : null;
      this.file = event.file ? event.file : null;
      console.log(user);
      if(this.selectedUser){
        //Edit user
        user.iduser = this.selectedUser.idUser;
        this.edituserToServer(user);
      }else{
        //Add user
       this.addUserToServer(user);
      }
    }
    this.userModalOpen = false;
  }


  uploadImage(event){
    return new Promise(
      (resolve)=>{
        switch (event.type) {
          case HttpEventType.Sent:
            console.log("Requete envoyée avec succès");
            break;
          case HttpEventType.UploadProgress:
            this.progress = Math.round(event.loaded / event.total * 100);
            if(this.progress == 100){
              resolve(true);
            }
            break;
          case HttpEventType.Response:
            console.log(event.body);
            setTimeout(() => {
              this.progress = 0;
            }, 1500);

        }
      }
    )
  }

  addUserToServer(user){
    this.UsersService.addUser(user).subscribe(
      (data: Response)=>{
        if(data.status == 200){
          // Update frontend
          if(this.file){
            this.fileService.uploadImageUser(this.file).subscribe(
              (event: HttpEvent<any>)=>{
                this.uploadImage(event).then(
                  ()=>{
                    user.iduser = data.args.lastInsertId;
                    user.Category = user.category;
                    this.users.push(user);
                  }
                );
              }
            )
          }

        }

      }
    )
  }

  edituserToServer(user){
    this.UsersService.editUsers(user).subscribe(
      (data: Response)=>{
        if(data.status == 200){
          if(this.file){
            this.fileService.uploadImageUser(this.file).subscribe(
              (event: HttpEvent<any>)=>{
                this.uploadImage(event).then(
                  ()=>{
                     // update frontend
                     this.updateUsers(user);
                  }
                );
              }
            );
            this.fileService.deleteImageUser(user.oldImage).subscribe(
              (data: Response)=>{
                console.log(data);
              }
            );
          }else{
             // update frontend
              this.updateUsers(user);
          }


        }else{
          console.log(data.message);

        }
      }
    )
  }

  updateUsers(user){
     // update frontend
     const index = this.users.findIndex(p =>p.idUser == user.iduser);
     user.Category = user.category;
     this.users = [
       ...this.users.slice(0,index),
       user,
       ...this.users.slice(index+1)
     ]
  }
  logout(){

    this.UsersService.logout();
    this.isAuth = this.UsersService.isAuth;
    this.router.navigate(['login']);
  }

}
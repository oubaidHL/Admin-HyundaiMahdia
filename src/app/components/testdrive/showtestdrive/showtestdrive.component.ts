import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Response } from 'src/app/models/response';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { environment } from 'src/environments/environment';
import { CategoriesService } from '../../../services/categories.service';
import { Category } from '../../../models/category';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-showtestdrive',
  templateUrl: './showtestdrive.component.html',
  styleUrls: ['./showtestdrive.component.css']
})
export class ShowtestdriveComponent implements OnInit {

  @Input() categorys: Category[];
  catModalOpen = false;
  selectedCat: Category;
  delete = false;
  catToBeDelete: Category;
  file: File;
  progress = 0;
  baseUrlImage = `${environment.api_imageCat}`;
  catSub;
  isAuth = false;

  constructor(private router: Router,private UsersService:UsersService,private CategoriesService: CategoriesService,private fileService: FileUploadService) { }

  ngOnInit(): void {
    this.catSub = this.CategoriesService.getCategory().subscribe(
      (response: Response)=>{
        this.categorys = response.result;
      },
      (error)=>{
        console.log(error);

      }

    )
  }

  onEdit(cat: Category):void {
    this.catModalOpen = true;
    this.selectedCat = cat;

  }

  onDelete(cat: Category): void{
    this.delete = true;
    this.catToBeDelete = cat;
  }

  addCat():void {
    this.selectedCat = undefined;
    this.catModalOpen = true;
  }

  handleCancelDelete(){
    this.delete = false;
  }

  handleConfirmDelete(){
    this.CategoriesService.deleteCat(this.catToBeDelete).subscribe(
      (data: Response)=>{
        if(data.status == 200){
          // Delete Product Image
          this.fileService.deleteImage(this.catToBeDelete.icon).subscribe(
            (data: Response)=>{
              console.log(data);

            }
          )
          console.log(data);

          // Update Frontend
          const index = this.categorys.findIndex(p => p.idCategory == this.catToBeDelete.idCategory);
          this.categorys.splice(index,1);

        }else{
          console.log(data.message);
        }
      }
    )
    this.handleCancelDelete();
  }

  handleFinish(event){
    if(event && event.cat){
      let cat = event.cat ? event.cat : null;
      this.file = event.file ? event.file : null;
      console.log(cat);
      if(this.selectedCat){
        //Edit Product
        cat.idCategory = this.selectedCat.idCategory;
        this.editCatToServer(cat);
      }else{
        //Add Product
       this.addCatToServer(cat);
      }
    }
    this.catModalOpen = false;
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
  logout(){

    this.UsersService.logout();
    this.isAuth = this.UsersService.isAuth;
    this.router.navigate(['login']);

  }

  addCatToServer(cat){
    this.CategoriesService.addCat(cat).subscribe(
      (data: Response)=>{
        if(data.status == 200){
          // Update frontend
          if(this.file){
            this.fileService.uploadImage(this.file).subscribe(
              (event: HttpEvent<any>)=>{
                this.uploadImage(event).then(
                  ()=>{
                    cat.idCategory = data.args.lastInsertId;
                    this.categorys.push(cat);
                  }
                );
              }
            )
          }

        }

      }
    )
  }

  editCatToServer(cat){
    this.CategoriesService.editCat(cat).subscribe(
      (data: Response)=>{
        if(data.status == 200){
          if(this.file){
            this.fileService.uploadImage(this.file).subscribe(
              (event: HttpEvent<any>)=>{
                this.uploadImage(event).then(
                  ()=>{
                     // update frontend
                     this.updateProducts(cat);
                  }
                );
              }
            );
            this.fileService.deleteImage(cat.oldImage).subscribe(
              (data: Response)=>{
                console.log(data);
              }
            );
          }else{
             // update frontend
              this.updateProducts(cat);
          }


        }else{
          console.log(data.message);

        }
      }
    )
  }

  updateProducts(cat){
     // update frontend
     const index = this.categorys.findIndex(p =>p.idCategory == cat.id);
     cat.Category = cat.category;
     this.categorys = [
       ...this.categorys.slice(0,index),
       cat,
       ...this.categorys.slice(index+1)
     ]
  }

}

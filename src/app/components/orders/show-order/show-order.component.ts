import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Orders } from 'src/app/models/order';
import { Product } from 'src/app/models/product';
import { Response } from 'src/app/models/response';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment';
import { OrdersService } from '../../../services/orders.service';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-show-order',
  templateUrl: './show-order.component.html',
  styleUrls: ['./show-order.component.css']
})
export class ShowOrderComponent implements OnInit {

  @Input() orders: Orders[];
  @Input() products: Product[];
  orderModalOpen = false;
  selectedOrder: Orders;
  delete = false;
  orderToBeDelete: Orders;
  file: File;
  progress = 0;
  baseUrlImage = `${environment.api_imageProd}`;
  orderSub;
  productSub;
  isAuth = false;
  statusForm: FormGroup;
  errorMessage;
  successMessage;

  constructor(private fb: FormBuilder,private router: Router,private UsersService:UsersService,private OrdersService: OrdersService,private ProductsService:ProductsService,private fileService: FileUploadService) { }

  ngOnInit(): void {
    this.orderSub = this.OrdersService.getOrders().subscribe(
      (response: Response)=>{
        this.orders = response.result;
      },
      (error)=>{
        console.log(error);

      }

    )
    this.initRegisterForm();
  }

  initRegisterForm(): void{
    this.statusForm = this.fb.group({
      status: this.fb.control('', ),
    });
  }
  onSubmit(order:Orders): void{
    const status = 'test';
    const id = order.idOrder;

    const orderStatus: Orders = {
      status: status,
      idOrder: id,
  };
    this.OrdersService.editOrder(orderStatus)
    
  }


  onEdit(order: Orders):void {
    this.orderModalOpen = true;
    this.selectedOrder = order;

  }

  onDelete(order: Orders): void{
    this.delete = true;
    this.orderToBeDelete = order;
  }

  addOrder():void {
    this.selectedOrder = undefined;
    this.orderModalOpen = true;
  }

  handleCancelDelete(){
    this.delete = false;
  }
  getproductbyid($order){
    this.ProductsService.getProdcutsById($order)
  }


  logout(){

    this.UsersService.logout();
    this.isAuth = this.UsersService.isAuth;
    this.router.navigate(['login']);

  }

  handleConfirmDelete(){
    this.OrdersService.deleteOrder(this.orderToBeDelete).subscribe(
      (data: Response)=>{
        if(data.status == 200){
          console.log(data);

          // Update Frontend
          const index = this.orders.findIndex(p => p.idProduct == this.orderToBeDelete.idProduct);
          this.orders.splice(index,1);

        }else{
          console.log(data.message);
        }
      }
    )
    this.handleCancelDelete();
  }

  /* handleFinish(event){
    if(event && event.order){
      let order = event.order ? event.order : null;
      this.file = event.file ? event.file : null;
      console.log(order);
      if(this.selectedOrder){
        //Edit order
        order.idProduct = this.selectedOrder.idProduct;
        this.editOrderToServer(order);
      }else{
        //Add order
       this.addOrderToServer(order);
      }
    }
    this.orderModalOpen = false;
  }


 
  addOrderToServer(order){
    this.OrdersService.addOrder(order).subscribe(
      (data: Response)=>{
        if(data.status == 200){
          // Update frontend
          if(this.file){
            this.fileService.uploadImage(this.file).subscribe(
              (event: HttpEvent<any>)=>{
                this.uploadImage(event).then(
                  ()=>{
                    order.idProduct = data.args.lastInsertId;
                    order.Category = order.category;
                    this.products.push(order);
                  }
                );
              }
            )
          }

        }

      }
    )
  }

  editOrderToServer(order){
    this.OrdersService.editOrder(order).subscribe(
      (data: Response)=>{
        if(data.status == 200){
          if(this.file){
            this.fileService.uploadImage(this.file).subscribe(
              (event: HttpEvent<any>)=>{
                this.uploadImage(event).then(
                  ()=>{
                     // update frontend
                     this.updateProducts(order);
                  }
                );
              }
            );
            this.fileService.deleteImage(order.oldImage).subscribe(
              (data: Response)=>{
                console.log(data);
              }
            );
          }else{
             // update frontend
              this.updateProducts(order);
          }


        }else{
          console.log(data.message);

        }
      }
    )
  }

  updateProducts(order){
     // update frontend
     const index = this.products.findIndex(p =>p.idProduct == order.idProduct);
     order.Category = order.category;
     this.products = [
       ...this.products.slice(0,index),
       order,
       ...this.products.slice(index+1)
     ]
  }*/

}

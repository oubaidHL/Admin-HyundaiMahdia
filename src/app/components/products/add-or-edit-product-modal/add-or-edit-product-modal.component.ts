import { ProductsService } from '../../../services/products.service';
import { Category } from '../../../models/category';
import { CategoriesService } from '../../../services/categories.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Input, OnDestroy, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-or-edit-product-modal',
  templateUrl: './add-or-edit-product-modal.component.html',
  styleUrls: ['./add-or-edit-product-modal.component.css']
})
export class AddOrEditProductModalComponent implements OnInit, OnChanges, OnDestroy {

  @Input() product: Product;
  @Output() finish = new EventEmitter();
  productForm: FormGroup;
  categories: Category[];
  categorySub: Subscription;
  idCategory = 1;
  file: File;

  constructor(private fb: FormBuilder, private categoriesService: CategoriesService,private productService: ProductsService) {
    this.productForm = fb.group({
      productInfos: fb.group({
        name: ['',Validators.required],
        description: ['',Validators.required],
        price: ['',Validators.required],
        stock: ['',Validators.required]
      }),
      illustration: fb.group({
        image: [null,Validators.required]
      })
    })
   }

   selectCategory(idCategory: number){
    this.idCategory = idCategory;
  }


  get isProductInfosInvalid(): boolean{
    return this.productForm.get('productInfos').invalid;
  }

  get isIllustrationInvalid(): boolean{
    if(this.product){
      return false;
    }
    return this.productForm.get('illustration').invalid;
  }

  handleCancel(){
    this.finish.emit();
    this.close();
  }

  handleFinish(){
    let product = {
      ...this.productForm.get('productInfos').value,
      ...this.productForm.get('illustration').value,
      category: this.idCategory,
      oldImage: null
    }

    if(this.product){
      product.oldImage = this.product.oldImage;
    }

    if(this.file){
      product.image = this.file.name;
    }else{
      product.image = this.product.oldImage;
    }

    this.finish.emit({product: product, file: this.file ? this.file : null});
    this.close();
  }

  close(){
    this.productForm.reset();
    this.idCategory = 1;
  }

  detecteFiles(event){
    this.file = event.target.files[0];
  }

  updateForm(product: Product){
    this.productForm.patchValue({
      productInfos:{
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
      }
    });
    product.oldImage = product.image;
    this.selectCategory(product.idCategory);

  }
  

  ngOnInit(): void {
    this.categorySub = this.categoriesService.getCategory().subscribe(
      (response)=>{
        this.categories = response.result;
        //console.log(this.categories);
      }
    )
  }

   ngOnChanges(): void{
     if(this.product){
       this.updateForm(this.product);
     }
   }

  ngOnDestroy(): void{
    this.categorySub.unsubscribe();
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, FormBuilder, Validators } from '@angular/forms';
import { Employees } from 'src/app/models/employees.model';
import { newOrder } from 'src/app/models/newOrder.model';
import { Product } from 'src/app/models/product.model';
import { Shippers } from 'src/app/models/shippers.model';
import { UtilitiesService } from '../../services/utilities.service'
import { CurrencyPipe } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})

export class NewOrderComponent implements OnInit {
  createOrderForm: FormGroup

  tax: any;
  taxableValue: string;

  employees: Employees[] = [];
  shippers: Shippers[] = [];
  products: Product[] = [];

  constructor(
    private ordersService: OrdersService,
    private utilitiesService: UtilitiesService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NewOrderComponent>,
    private currencyPipe: CurrencyPipe,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) { 
    this.createOrderForm = this.formBuilder.group({
      employee: new FormControl('', [Validators.required]),
      shipper: new FormControl('', [Validators.required]),
      shipName: new FormControl('', [Validators.required, Validators.maxLength(40)]),
      shipAddress: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      shipCity: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      shipCountry: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      orderDate: new FormControl('', [Validators.required]),
      requiredDate: new FormControl('', [Validators.required]),
      shippedDate: new FormControl('', [Validators.required]),
      freight: new FormControl('', [Validators.required]),
      product: new FormControl('', [Validators.required]),
      unitPrice: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required, Validators.maxLength(4)]),
      discount: new FormControl('', [Validators.required, Validators.max(1), Validators.min(0)])
    })
  }  

  ngOnInit(): void {
    this.getEmployees();
    this.getShippers();
    this.getProducts();

    this.createOrderForm.valueChanges.subscribe( form => {
      if (form.freight) {
        this.createOrderForm.patchValue({
          freight: this.currencyPipe
          .transform(form.freight.replace(/\D/g, '').replace(/^0+/, ''), '', '', '1.0-0')
        }, {emitEvent: false})
      }
    });

    this.createOrderForm.valueChanges.subscribe( form => {
      if (form.unitPrice) {
        this.createOrderForm.patchValue({
          unitPrice: this.currencyPipe
          .transform(form.unitPrice.replace(/\D/g, '').replace(/^0+/, ''), '', '', '1.0-0')
        }, {emitEvent: false})
      }
    });
  } 

  getEmployees() {
    this.utilitiesService.getEmployees()
      .subscribe(employees => {
        this.employees = employees;
      })
  }

  getShippers() {
    this.utilitiesService.getShippers()
      .subscribe(shippers => {
        this.shippers = shippers;
      })
  }

  getProducts() {
    this.utilitiesService.getProducts()
      .subscribe(products => {
        this.products = products;
      })
  }

  closeModal() {
    this.dialogRef.close();
  }

  createOrder() {
    const newOrder: newOrder = {
      custid: this.data['custid'],
      employeeId: this.createOrderForm.value.employee.empid,
      shipperId: this.createOrderForm.value.shipper.shipperid,
      shipName: this.createOrderForm.value.shipName,
      shipAddress: this.createOrderForm.value.shipAddress,
      shipCity: this.createOrderForm.value.shipCity,
      shipCountry: this.createOrderForm.value.shipCountry,
      orderDate: this.createOrderForm.value.orderDate,
      requiredDate: this.createOrderForm.value.requiredDate,
      shippedDate: this.createOrderForm.value.shippedDate,
      freight: this.createOrderForm.value.freight,
      productId: this.createOrderForm.value.product.productid,
      unitPrice: this.createOrderForm.value.unitPrice,
      quantity: this.createOrderForm.value.quantity,
      discount: this.createOrderForm.value.discount
    }
    
    this.ordersService.createOrder(newOrder)
      .subscribe(newOrder => {
        console.log(newOrder);
    })
  }
}

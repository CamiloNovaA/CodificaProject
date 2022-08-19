import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CustomersService } from '../../services/customers.service'
import { CustomerSalesPrediction } from 'src/app/models/customerSalesPrediction.model';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { CustomersDetailsComponent } from '../customers-details/customers-details.component';
import { NewOrderComponent } from '../new-order/new-order.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})

export class CustomersComponent implements OnInit {
  displayedColumns: string[] = ['customerName', 'lastOrderDate', 'nextPredictedOrder', 'ViewOrders', 'NewOrders'];
  dataSource = new MatTableDataSource<CustomerSalesPrediction>();  
  customerSalesPrediction: CustomerSalesPrediction[] = [];
  customerSP: CustomerSalesPrediction;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private customersService: CustomersService,
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getSalesPrediction();
  }

  getSalesPrediction() {
    this.customersService.getSalesPredictionByCustomer()
      .subscribe(customersSalesPrediction => {
        this.dataSource = new MatTableDataSource(customersSalesPrediction);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  tableSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(filterValue: Event) {    
    this.dataSource.filter = (filterValue.target as HTMLInputElement).value.trim().toLowerCase();
  }

  viewOrders(customerSalesPrediction: CustomerSalesPrediction) {
    const dialogRef = this.dialog.open(CustomersDetailsComponent, {
      width: '1080px',
      data: customerSalesPrediction
    });    

    dialogRef.afterClosed().subscribe(result => {
      this.customerSP = customerSalesPrediction;
    });
  }

  createOrder(customerSalesPrediction: CustomerSalesPrediction) {
    const dialogRef = this.dialog.open(NewOrderComponent, {
      width: '1080px',
      data: customerSalesPrediction
    });    

    dialogRef.afterClosed().subscribe(result => {
      this.getSalesPrediction();
    });
  }
}
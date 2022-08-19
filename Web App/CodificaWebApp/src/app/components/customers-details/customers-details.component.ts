import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { Order } from 'src/app/models/order.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-customers-details',
  templateUrl: './customers-details.component.html',
  styleUrls: ['./customers-details.component.scss']
})
export class CustomersDetailsComponent implements OnInit {
  displayedColumns: string[] = ['OrderID', 'RequiredDate', 'ShippedOrder', 'ShipName', 'ShipAddress', 'ShipCity'];
  dataSource = new MatTableDataSource<Order>();
  orders: Order[] = [];
  customerName: string;
  id: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private ordersService : OrdersService,
    private _liveAnnouncer: LiveAnnouncer,
    public dialogRef: MatDialogRef<CustomersDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) { }

  ngOnInit(): void {
    console.log(this.data['customerName']);

    this.customerName = this.data['customerName']
    this.getOrders(this.data['custid']);
  }

  closeModal() {
    this.dialogRef.close();
  }

  getOrders(id: Number) {
    this.ordersService.getOrdersByClientId(id)
    .subscribe(ordersByClient => {
      this.dataSource = new MatTableDataSource(ordersByClient);
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
}
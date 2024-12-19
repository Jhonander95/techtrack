import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { FormsModule } from '@angular/forms';

import { InputTextarea } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-input',
  standalone: true,
  imports: [
    FormsModule,
    InputTextarea,
    ButtonModule,
    CardModule
  ],
  templateUrl: './order-input.component.html',
  styleUrl: './order-input.component.css'
})
export class OrderInputComponent {

  orderInput: string = '';

  constructor(
    private dataService: DataService, 
    private router: Router,
    private orderService: OrderService
  ) {}

  processOrder(): void {
    this.dataService.processInput(this.orderInput);
    const data = this.dataService.getProcessedData();
    console.log(data);
    this.orderService.saveData(data).subscribe(res => {
      console.log(res);
      
    })
  }

}

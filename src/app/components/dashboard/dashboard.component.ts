import { Component, OnInit } from '@angular/core';
import { jqxChartModule } from 'jqwidgets-ng/jqxchart'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ jqxChartModule ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

   // Propiedades del gráfico
   data!: any[];
   xAxis: any;
   valueAxis: any;
   seriesGroups!: any[];

   constructor() {}

  ngOnInit(): void {
    // Datos de ejemplo
    this.data = [
      { day: 'Lunes', orders: 5 },
      { day: 'Martes', orders: 10 },
      { day: 'Miércoles', orders: 8 },
      { day: 'Jueves', orders: 12 },
      { day: 'Viernes', orders: 7 },
    ];

     // Configuración de los ejes
     this.xAxis = {
      dataField: 'day',
      displayText: 'Días',
    };

    this.valueAxis = {
      unitInterval: 2,
      minValue: 0,
      maxValue: 15,
      displayValueAxis: true,
      description: 'Órdenes procesadas',
    };

    // Configuración de los grupos de series
    this.seriesGroups = [
      {
        type: 'column',
        series: [
          {
            dataField: 'orders',
            displayText: 'Órdenes',
          },
        ],
      },
    ];

  }  

}

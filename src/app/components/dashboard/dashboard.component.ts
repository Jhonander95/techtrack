import { Component, OnInit } from '@angular/core';
import { jqxChartModule } from 'jqwidgets-ng/jqxchart'
import { ReportsService } from '../../services/reports.service';

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

   constructor(private reportsServices: ReportsService) {}

  ngOnInit(): void {

    this.reportsServices.getCurrentWeekData().subscribe(res => {
      console.log(res);
      this.data = this.transformData(res);
    })

    // Datos de ejemplo
    this.data = [
      { day: 'Lunes', orders: 5 },
      { day: 'Martes', orders: 10 },
      { day: 'Miércoles', orders: 8 },
      { day: 'Jueves', orders: 12 },
      { day: 'Viernes', orders: 7 },
      { day: 'Sábado', orders: 4 }
    ];

     // Configuración de los ejes
     this.xAxis = {
      dataField: 'day',
      displayText: 'Días',
    };

    this.valueAxis = {
      unitInterval: 1,
      minValue: 0,
      maxValue: 10,
      displayValueAxis: true,
      description: 'Órdenes procesadas',
    };

    // Configuración de los grupos de series
    this.seriesGroups = [
      {
        type: 'column',
        series: [
          {
            dataField: 'orderCount',
            displayText: 'Órdenes',
          },
        ],
      },
    ];

  }  

  // Método para transformar los datos recibidos
  private transformData(data: any[]): any[] {
    const result: { day: string; orderCount: number }[] = [];

    // Contar las órdenes por día
    data.forEach(item => {
      const createdAt = item.createdAt.toDate(); // Convertir _Timestamp a Date
      const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const day = createdAt.toLocaleDateString('es-ES', options); // Obtener la fecha en formato de cadena con día de la semana

      const existing = result.find(r => r.day === day);
      if (existing) {
        existing.orderCount++;
      } else {
        result.push({ day: day, orderCount: 1 });
      }
    });

    return result;
  }

}

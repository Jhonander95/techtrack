import { Component, OnInit,  } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { jqxChartModule } from 'jqwidgets-ng/jqxchart'
import { ReportsService } from '../../services/reports.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ jqxChartModule, NgFor, NgIf, TableModule, ButtonModule ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

   // Propiedades del gráfico
   data!: any[];
   xAxis: any;
   valueAxis: any;
   seriesGroups!: any[];
   ordersByWeek: any[] = [];
   ordersByDay: { day: string; orders: any[] }[] = []; // Almacena las órdenes por día
   selectedDayOrders: any[] = []; // Almacena las órdenes del día seleccionado
   showTable: boolean = false; // Controla la visibilidad de la tabla

   constructor(private reportsServices: ReportsService) {}

  ngOnInit(): void {

    this.reportsServices.getCurrentWeekData().subscribe(res => {
      this.ordersByWeek = res;
      this.data = this.transformData(res);
      console.log(this.ordersByDay);
      console.log(this.ordersByWeek);
      
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
    this.ordersByDay = []; // Reiniciar la lista de órdenes por día

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
        this.ordersByDay.push({ day: day, orders: [item] }); // Inicializar con la primera orden
      }
    });

    // Agrupar órdenes por día
    data.forEach(item => {
      const createdAt = item.createdAt.toDate();
      const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const day = createdAt.toLocaleDateString('es-ES', options);

      const existing = this.ordersByDay.find(r => r.day === day);
      if (existing) {
        existing.orders.push(item); // Agregar la orden al día correspondiente
      }
    });

    return result;
  }

  // Método para manejar el clic en la gráfica
  onChartClick(event: any): void {
    const clickedDay = event.args.dataField; // Obtener el día clicado
    const orders = this.ordersByDay.find(day => day.day === clickedDay);
    if (orders) {
      this.selectedDayOrders = orders.orders; // Obtener las órdenes del día seleccionado
      this.showTable = true; // Mostrar la tabla
    }
  }
  
  onClick(){
    this.showTable = true;
  }

}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private processedData: any = null;

  processInput(input: string): void {
    const data: any = {};

    // Procesar los datos de entrada
    const lines = input.split(/,\s*/);
    lines.forEach(line => {
      const [key, value] = line.split(/:\s*/, 2);
      if (key && value) {
        data[key.trim()] = value.trim();
      }
    });

    this.processedData = data;
  }

  getProcessedData(): any {
    return this.processedData;
  }
}


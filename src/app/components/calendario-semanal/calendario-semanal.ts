import { Component, input } from '@angular/core';

@Component({
  selector: 'app-calendario-semanal',
  imports: [],
  templateUrl: './calendario-semanal.html',
  styleUrl: './calendario-semanal.css'
})
export class CalendarioSemanal {
  dias = input<number[]>([]);
}

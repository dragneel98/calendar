import { Component } from '@angular/core';
import { MCalendar } from '../../models/calendarHeader.model';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  headers: MCalendar.header = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"]
  calendarDate: MCalendar.body[] = []
  totalItems = 42
  private date = new Date()

  constructor(){
    this.CreateCalendarDate()
  }

  CreateCalendarDate() {
    const firstDayInMonth = this.getSelectDate(this.date.getFullYear(), this.date.getMonth(),1).getDay()
    const previousMonth = this.getSelectDate(this.date.getFullYear(), this.date.getMonth(), 0).getDate()

    for (let i = firstDayInMonth; i >= 0; i--) {
      this.calendarDate.push({day: previousMonth - (i - 1) });
      // console.log(this.calendarDate);
    }
    const daysInMonth = this.getSelectDate(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate()
    for (let i = 1; i <= daysInMonth; i++) {
      this.calendarDate.push({day: i});
    }
    const calendarLength = this.calendarDate.length
    for (let i = 1; i <= (this.totalItems - calendarLength); i++) {
      this.calendarDate.push({day: i});
    }

  }

  private getSelectDate(year:number, month:number, day:number){
    return new Date(year, month, day)
  }
}

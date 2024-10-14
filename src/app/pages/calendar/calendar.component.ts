// import { Component, effect } from '@angular/core';
// import { MatButton } from '@angular/material/button';
// import { CommonModule } from '@angular/common';
// import { DialogService } from '../../services/dialog.service';
// import { createEvent, updateEvent, findEvent } from '../../helper/calendar';
// import { NCalendar } from '../../models/calendar.model';

// @Component({
//   selector: 'app-calendar',
//   standalone: true,
//   imports: [
//     MatButton,
//     CommonModule
//   ],
//   templateUrl: './calendar.component.html',
//   styleUrl: './calendar.component.css'
// })
// export class CalendarComponent {
//   headers: NCalendar.Header = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"]
//   calendarData: NCalendar.Body[] = [];
//   totalItems = 42
//   private date = new Date()
//   private findEvent = findEvent;
//   // constructor(){
//   //   // this.CreateCalendarDate()
//   //   private readonly dialogService: DialogService
//   // }{
//   //   this.createCalendarData();
//   //   effect(() => {
//   //     if (this.dialogService.getEvent) {
//   //       this.handleEvent(this.dialogService.getEvent);
//   //     }
//   //   });
//   // }
//   constructor(
//     private readonly dialogService: DialogService
//   ) {
//     this.createCalendarData();
//     effect(() => {
//       if (this.dialogService.getEvent) {
//         this.handleEvent(this.dialogService.getEvent);
//       }
//     });
//   }

//   private handleEvent(item: NCalendar.IEvent) {
//     const newCalendarData = [...this.calendarData];

//     const findEvent = this.findEvent(newCalendarData, item);

//     if (!findEvent) {
//       createEvent(newCalendarData, item);
//     } else {
//       updateEvent(newCalendarData, item, findEvent);
//     }

//     this.calendarData = newCalendarData;
//   }

//   private createCalendarData() {
//     const currentMonth = this.date.getMonth(); // Este es el mes actual con base 0
//     const firstDayInMonth = this.getSelectDate(this.date.getFullYear(), currentMonth,1).getDay()
//     const previousMonth = this.getSelectDate(this.date.getFullYear(), currentMonth, 0).getDate()

//     for (let i = firstDayInMonth; i >= 0; i--) {
//       this.calendarData.push({
//         day: previousMonth - (i - 1),
//         isCurrentMonth: false,
//         isCurrentDay: false
//        });
//     }
//     const daysInMonth = this.getSelectDate(this.date.getFullYear(), currentMonth+ 1, 0).getDate()
//     for (let i = 1; i <= daysInMonth; i++) {
//       const newDate = this.getSelectDate(this.date.getFullYear(), currentMonth, i)
//       // console.log(newDate);
//       // console.log(this.GetFormDate(this.date) === this.GetFormDate(newDate));
//       console.log(this.GetFormDate(this.date));
//       this.calendarData.push({
//         day: i,
//         isCurrentDay: this.GetFormDate(this.date) === this.GetFormDate(newDate),
//         isCurrentMonth: true
//       });
//     }
//     const calendarLength = this.calendarData.length
//     for (let i = 1; i <= (this.totalItems - calendarLength); i++) {
//       this.calendarData.push({
//         day: i,
//         isCurrentDay: false,
//         isCurrentMonth: false
//       });
//     }
//   }

//   private GetFormDate (date:Date){
//     // return (`${date.getFullYear}/${date.getMonth}/${date.getDay}`)
//     return (`${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`)
//   }

//   private getSelectDate(year:number, month:number, day:number){
//     return new Date(year, month, day)
//   }
// }

import { Component, effect } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogService } from '../../services/dialog.service';
import { MatMenuModule } from '@angular/material/menu';
import { createEvent, findEvent, formatDate, getSelectedDate, updateEvent, templateCalendarData } from '../../helper/calendar';
import { NCalendar } from '../../models/calendar.model';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    MatButtonModule,
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {

  private totalItems = 42;

  private date = new Date();

  private findEvent = findEvent;

  headers: NCalendar.Header = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  calendarData: NCalendar.Body[] = [];

  constructor(
    private readonly dialogService: DialogService
  ) {
    this.createCalendarData();
    effect(() => {
      if (this.dialogService.getEvent) {
        this.handleEvent(this.dialogService.getEvent);
      }
    });
  }

  //Replaced createEvent with handleEvent
  private handleEvent(item: NCalendar.IEvent) {
    const newCalendarData = [...this.calendarData];

    const findEvent = this.findEvent(newCalendarData, item);

    if (!findEvent) {
      createEvent(newCalendarData, item);
    } else {
      updateEvent(newCalendarData, item, findEvent);
    }

    this.calendarData = newCalendarData;
  }

  private createCalendarData() {
    const firstDayInMonth = getSelectedDate(this.date, 1).getDay();
    const previousMonth = getSelectedDate(this.date).getDate();


    for (let index = firstDayInMonth; index > 0; index --) {
      this.calendarData.push(templateCalendarData(previousMonth - (index - 1), getSelectedDate(this.date, previousMonth - (index - 1), -1)));
    }


    const daysInMonth = getSelectedDate(this.date, 0, 1).getDate();

    for (let index = 1; index <= daysInMonth; index++) {
      const newDate = getSelectedDate(this.date, index);

      this.calendarData.push(
        {
          ...templateCalendarData(index, newDate),
          isCurrentDay: formatDate(this.date) === formatDate(newDate),
          isCurrentMonth: true,
        }
      );
    }

    const calendarLength = this.calendarData.length;

    for (let index = 1; index <= (this.totalItems - calendarLength); index++) {
      this.calendarData.push(templateCalendarData(index, getSelectedDate(this.date, index, 1)));
    }

  }

  removeEvent(calendarIndex: number, eventIndex: number) {
    const newCalendarData = [...this.calendarData];
    newCalendarData[calendarIndex].events.splice(eventIndex, 1);
    this.calendarData = newCalendarData;
  }

  openModal() {
    this.dialogService.openDialog();
  }

  openModalEdit(event: NCalendar.IEvent) {
    this.dialogService.openDialog(event);
  }
}

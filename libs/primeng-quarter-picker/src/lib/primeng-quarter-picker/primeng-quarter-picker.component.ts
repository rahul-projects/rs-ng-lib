import { Component, forwardRef, Input, OnInit } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import * as moment from "moment";

@Component({
  selector: 'rsng-primeng-quarter-picker',
  templateUrl: './primeng-quarter-picker.component.html',
  styleUrls: ['./primeng-quarter-picker.component.scss'],
  providers: [
    {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => PrimengQuarterPickerComponent),
        multi: true
    }
  ]
})
export class PrimengQuarterPickerComponent implements ControlValueAccessor, OnInit {

  @Input() minDate!: Date;
  @Input() maxDate!: Date;
  @Input() selectionMode: 'single' | 'range' = 'range';

  private readonly todaysMoment = moment();
  private yearsList: Array<number> = [];

  fromYears: Array<number> = [];
  toYears: Array<number> = [];

  selectedFromYear: number | undefined = 2021;
  selectedToYear: number | undefined = 2021;

  private quartersList = [
      {id: 1, label: 'Jan - Feb - Mar'},
      {id: 2, label: 'Apr - May - Jun'},
      {id: 3, label: 'Jul - Aug - Sep'},
      {id: 4, label: 'Oct - Nov - Dec'}
  ];

  fromQtrs = [...this.quartersList];
  toQtrs = [...this.quartersList];

  selectedFromQuarter: {id: number, label: string} | undefined = this.fromQtrs[0];
  selectedToQuarter: {id: number, label: string} | undefined = this.toQtrs[0];

  private model = `${this.selectedFromYear}-Q${this.selectedFromQuarter?.id}:${this.selectedToYear}-Q${this.selectedToQuarter?.id}`;
  private quarterModelChange!: (model: unknown) => void;

  private emitModel() {
      if (this.selectionMode === 'range') {
          if (this.selectedFromYear && this.selectedFromQuarter && this.selectedToYear && this.selectedToQuarter) {
              this.model = `${this.selectedFromYear}-Q${this.selectedFromQuarter.id}:${this.selectedToYear}-Q${this.selectedToQuarter.id}`;
              this.quarterModelChange(this.model);
          }
      } else {
          if (this.selectedFromYear && this.selectedFromQuarter) {
              this.model = `${this.selectedFromYear}-Q${this.selectedFromQuarter.id}`;
              this.quarterModelChange(this.model);
          }
      }
  }

  private adjustQuartersWrtCurrentYear() {
      if (this.selectedFromYear === this.todaysMoment.year()) {
          this.fromQtrs = [...this.quartersList.filter(q => q.id <= this.todaysMoment.quarter())];
      }

      if (this.selectionMode === 'range') {
          if (this.selectedToYear === this.todaysMoment.year()) {
              this.toQtrs = [...this.quartersList.filter(q => q.id <= this.todaysMoment.quarter())];
          }
      }
  }

  private adjustQuartersOptions(changedFromQuarterId?: number, changedToQuarterId?: number) {
      if (this.selectedFromYear !== this.selectedToYear) {
          this.fromQtrs = [...this.quartersList];
          this.toQtrs = [...this.quartersList];
      } else {
          if (changedFromQuarterId) {
              this.toQtrs = [...this.quartersList.filter(q => q.id >= changedFromQuarterId)];
              if (!this.selectedToQuarter || changedFromQuarterId > this.selectedToQuarter.id) {
                  this.selectedToQuarter = this.toQtrs.length === 1 ? this.toQtrs[0] : undefined;
              }
          }
          if (changedToQuarterId) {
              this.fromQtrs = [...this.quartersList.filter(q => q.id <= changedToQuarterId)];
              if (!this.selectedFromQuarter || changedToQuarterId < this.selectedFromQuarter.id) {
                  this.selectedFromQuarter = this.fromQtrs.length === 1 ? this.fromQtrs[0] : undefined;
              }
          }

          // year changed to same then reset the quarter selection
          if (!(changedFromQuarterId || changedToQuarterId)) {
              if ( (!this.selectedFromQuarter || !this.selectedToQuarter) || this.selectedToQuarter.id < this.selectedFromQuarter.id) {
                  this.selectedFromQuarter = this.fromQtrs.length === 1 ? this.fromQtrs[0] : undefined;
                  this.selectedToQuarter = this.toQtrs.length === 1 ? this.toQtrs[0] : undefined;
              }
          }
      }
      this.adjustQuartersWrtCurrentYear();
  }

  ngOnInit(): void {
      this.toYears = [...this.yearsList.filter(y => this.selectedFromYear && y >= this.selectedFromYear)];
      this.fromYears = [...this.yearsList.filter(y => this.selectedToYear && y <= this.selectedToYear)];

      let maxYrLimit = this.todaysMoment.toDate().getFullYear();
      let minYrLimit = maxYrLimit - 5;

      const maxDateParam: Date = this.maxDate;
      const minDateParam: Date = this.minDate;

      if (maxDateParam || minDateParam) {
        if (maxDateParam) {
          maxYrLimit = maxDateParam.getFullYear();
        }
        if (minDateParam) {
          minYrLimit = minDateParam.getFullYear();
        }
      }

      for(let i = minYrLimit; i <= maxYrLimit; i++) {
          this.yearsList.push(i);
      }

      this.fromYears = [...this.yearsList];
      this.selectedFromYear = maxYrLimit;
      this.selectedFromQuarter = this.quartersList[this.todaysMoment.quarter() - 1];

      if (this.selectionMode === 'range') {
          this.toYears = [...this.yearsList];
          this.selectedToYear = maxYrLimit;
          this.selectedToQuarter = this.selectedFromQuarter;    
      }

      this.adjustQuartersWrtCurrentYear();
  }

  onFromQuarterChange(event: any) {
      if (this.selectionMode === 'range') {
          this.adjustQuartersOptions(event.value.id, undefined);
      }
      this.emitModel();
  }

  onToQuarterChange(event: any) {
      this.adjustQuartersOptions(undefined, event.value.id);
      this.emitModel();
  }

  onFromYearChange(event: any) {
      const previousFromYr = this.selectedFromYear;
      this.selectedFromYear = event.value;
      if (this.selectionMode === 'range') {
          this.toYears = [...this.yearsList.filter(y => y >= event.value)];
          if (previousFromYr && event.value > previousFromYr) {
              this.selectedToYear = undefined;
          }
          this.adjustQuartersOptions();
      } else {
          // MEMO: need to reset quarters based on year selection.
          if (this.selectedFromYear === this.todaysMoment.year()) {
              this.fromQtrs = [...this.quartersList.filter(q => q.id <= this.todaysMoment.quarter())];
          } else {
              this.fromQtrs = [...this.quartersList];
          }
      }
      this.emitModel();
  }

  onToYearChange(event: any) {
      this.fromYears = [...this.yearsList.filter(y => y <= event.value)];
      if (this.selectedToYear && event.value < this.selectedToYear ) {
          this.selectedFromYear = undefined;
      }
      this.selectedToYear = event.value;
      this.adjustQuartersOptions();
      this.emitModel();
  }

  writeValue(obj: any): void {
      if (obj && typeof 'string' && (obj as string).split(':').length === 2 && (obj as string).split('-').length === 3) {
          this.model = obj;
          const rangeParts: Array<string> = this.model.split(':');
          rangeParts.forEach((r, index, self) => {
              const yearAndQtr: Array<string> = r.split('-');
              const yr = Number(yearAndQtr[0]);
              const qtr = this.quartersList[Number(yearAndQtr[1].substr(1, 1)) - 1];
              if (index === 0) {
                  this.selectedFromYear = yr;
                  this.selectedFromQuarter = qtr;
              } else {
                  this.selectedToYear = yr;
                  this.selectedToQuarter = qtr;
              }
          });
          this.fromYears = [...this.yearsList.filter(y => this.selectedToYear && y <= this.selectedToYear)];
          if (this.selectionMode === 'range') {
              this.toYears = [...this.yearsList.filter(y => this.selectedFromYear && y >= this.selectedFromYear)];
              this.adjustQuartersOptions();
          }
      }
  }

  registerOnChange(fn: any): void {
      this.quarterModelChange = fn;
  }

  registerOnTouched(fn: any): void {
      //
  }

  setDisabledState?(isDisabled: boolean): void {
      //
  }

}

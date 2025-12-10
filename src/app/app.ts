
import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterComponent } from './counter';
import { StorageService } from './storage.service';
import { ThemeService } from './theme.service';
import { ChartComponent } from './chart/chart';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { FormsModule } from '@angular/forms';

interface Measurement {
  id: number;
  startTime: Date;
  endTime: Date | null;
  trucks: number;
  cars: number;
  motorcycles: number;
  bicycles: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, CounterComponent, ChartComponent, FormsModule],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(-15px)' }),
          stagger(100, [
            animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true }),
        query(':leave', [
          animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.9)' }))
        ], { optional: true })
      ])
    ]),
    trigger('itemAnimation', [
      transition('void => *', [ // More explicit 'enter' transition
        style({ opacity: 0, transform: 'translateY(-15px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition('* => void', [ // More explicit 'leave' transition
        animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.9)' }))
      ])
    ])
  ]
})
export class AppComponent {
  private storageService = inject(StorageService);
  private themeService = inject(ThemeService);

  measurements = signal<Measurement[]>([]);
  isDarkMode = this.themeService.isDarkMode;

  // Signals for time range selection
  timeSlots = this.generateTimeSlots();
  selectedStartTime = signal<string>('');
  selectedEndTime = signal<string>('');

  constructor() {
    const storedMeasurements = this.storageService.getMeasurements();
    const parsedMeasurements = storedMeasurements.map((m: any) => ({
      ...m,
      startTime: new Date(m.startTime),
      endTime: m.endTime ? new Date(m.endTime) : null,
    }));
    this.measurements.set(parsedMeasurements);

    effect(() => {
      this.storageService.saveMeasurements(this.measurements());
    });
  }

  // Computed signal for overall vehicle flow
  overallFlow = computed(() => {
    const start = this.selectedStartTime();
    const end = this.selectedEndTime();

    if (!start || !end || start >= end) {
      return 0;
    }

    const [startHour, startMinute] = start.split(':').map(Number);
    const [endHour, endMinute] = end.split(':').map(Number);

    let totalVehiclesInRange = 0;

    for (const measurement of this.measurements()) {
      const measurementEnd = measurement.endTime ?? new Date();

      const rangeStart = new Date(measurement.startTime);
      rangeStart.setHours(startHour, startMinute, 0, 0);

      const rangeEnd = new Date(measurement.startTime);
      rangeEnd.setHours(endHour, endMinute, 0, 0);

      if (measurement.startTime >= rangeStart && measurementEnd <= rangeEnd) {
        totalVehiclesInRange += measurement.trucks + measurement.cars + measurement.motorcycles + measurement.bicycles;
      }
    }

    const rangeDurationInMs = (endHour - startHour) * 3600000 + (endMinute - startMinute) * 60000;
    const rangeDurationInHours = rangeDurationInMs / 3600000;

    if (rangeDurationInHours <= 0) {
      return 0;
    }

    return Math.round(totalVehiclesInRange / rangeDurationInHours);
  });

  totalVehicles = computed(() => {
    return this.measurements().reduce((total, m) => total + m.trucks + m.cars + m.motorcycles + m.bicycles, 0);
  });

  chartData = computed(() => {
        const totals = this.measurements().reduce((acc, measurement) => {
      acc.trucks += measurement.trucks;
      acc.cars += measurement.cars;
      acc.motorcycles += measurement.motorcycles;
      acc.bicycles += measurement.bicycles;
      return acc;
    }, { trucks: 0, cars: 0, motorcycles: 0, bicycles: 0 });

    return [
      { name: 'Trucks', value: totals.trucks },
      { name: 'Cars', value: totals.cars },
      { name: 'Motorcycles', value: totals.motorcycles },
      { name: 'Bicycles', value: totals.bicycles },
    ];
  });

  addMeasurement() {
    const now = new Date();
    this.measurements.update(values => {
      const updatedValues = values.map((m, index) => {
        if (index === values.length - 1 && m.endTime === null) {
          return { ...m, endTime: now };
        }
        return m;
      });
      const newId = (values[values.length - 1]?.id ?? 0) + 1;
      const newMeasurement: Measurement = {
        id: newId,
        startTime: now,
        endTime: null,
        trucks: 0, cars: 0, motorcycles: 0, bicycles: 0,
      };
      return [...updatedValues, newMeasurement];
    });
  }

  increment(id: number, vehicle: keyof Omit<Measurement, 'id' | 'startTime' | 'endTime'>) {
    this.measurements.update(values =>
      values.map(m => m.id === id ? { ...m, [vehicle]: m[vehicle] + 1 } : m)
    );
  }

  getFlowRate(measurement: Measurement): number {
    const endTime = measurement.endTime ?? new Date();
    const durationInMs = endTime.getTime() - measurement.startTime.getTime();
    if (durationInMs <= 0) return 0;
    const durationInHours = durationInMs / 3600000;
    const totalVehicles = measurement.trucks + measurement.cars + measurement.motorcycles + measurement.bicycles;
    if (totalVehicles === 0) return 0;
    return Math.round(totalVehicles / durationInHours);
  }

  generateTimeSlots(): string[] {
    const slots = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 30) {
        slots.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
      }
    }
    return slots;
  }

  clearAll() {
    this.measurements.set([]);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}

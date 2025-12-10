
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <div class="counter-card" (click)="onIncrement()">
      <span class="counter-label">{{ label() }}</span>
      <div class="counter-value">{{ count() }}</div>
    </div>
  `,
  styleUrls: ['./counter.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent {
  label = input.required<string>();
  count = input.required<number>();
  increment = output<void>();

  onIncrement() {
    this.increment.emit();
  }
}

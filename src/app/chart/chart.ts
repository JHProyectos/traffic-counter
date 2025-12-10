
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.html',
  styleUrls: ['./chart.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgxChartsModule]
})
export class ChartComponent {
  data = input.required<{ name: string; value: number }[]>();

  // Chart options
  view: [number, number] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Vehicle';
  showYAxisLabel = true;
  yAxisLabel = 'Count';
  colorScheme = 'vivid';
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-test',
  imports: [],
  templateUrl: './test.html',
  styleUrl: './test.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestComponent {

}

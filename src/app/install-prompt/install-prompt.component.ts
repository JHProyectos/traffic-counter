import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-install-prompt',
  template: `
    <div class="install-prompt">
      <p>Want a better experience? Install our app!</p>
      <div class="buttons">
        <button (click)="install.emit()">Install</button>
        <button (click)="dismiss.emit()">Later</button>
      </div>
    </div>
  `,
  styles: [`
    .install-prompt {
      position: fixed;
      bottom: 1rem;
      left: 1rem;
      right: 1rem;
      background-color: var(--surface-color);
      color: var(--text-color);
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 2000;
    }
    p {
      margin: 0;
    }
    .buttons button {
      margin-left: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      border: none;
      cursor: pointer;
    }
    .buttons button:first-child {
      background-color: var(--primary-color);
      color: white;
    }
    .buttons button:last-child {
      background-color: transparent;
      color: var(--text-color);
      border: 1px solid var(--text-color);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class InstallPromptComponent {
  install = output<void>();
  dismiss = output<void>();
}

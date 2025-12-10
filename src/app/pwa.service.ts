
import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  private promptEventSignal = signal<any>(null);

  isInstallable = computed(() => this.promptEventSignal() != null);

  constructor() {
    if (typeof window !== 'undefined') {
        window.addEventListener('beforeinstallprompt', (event) => {
          event.preventDefault();
          this.promptEventSignal.set(event);
        });
    }
  }

  promptToInstall() {
    const event = this.promptEventSignal();
    if (!event) {
        return;
    }
    
    event.prompt();
    
    event.userChoice.then((choiceResult: { outcome: string; }) => {
      console.log(`User choice: ${choiceResult.outcome}`);
      this.dismissPrompt();
    });
  }

  dismissPrompt() {
    this.promptEventSignal.set(null);
  }
}

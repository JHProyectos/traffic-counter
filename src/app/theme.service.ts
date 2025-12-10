
import { Injectable, signal, effect } from '@angular/core';

const THEME_KEY = 'theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isDarkMode = signal<boolean>(false);

  constructor() {
    if (typeof window !== 'undefined' && window.localStorage) {
        const savedTheme = localStorage.getItem(THEME_KEY);
        if (savedTheme) {
        this.isDarkMode.set(JSON.parse(savedTheme));
        }
    }

    effect(() => {
        if (typeof window !== 'undefined' && window.document) {
            if (this.isDarkMode()) {
                document.body.classList.add('dark-theme');
            } else {
                document.body.classList.remove('dark-theme');
            }
            if (typeof window !== 'undefined' && window.localStorage) {
                localStorage.setItem(THEME_KEY, JSON.stringify(this.isDarkMode()));
            }
        }
    });
  }

  toggleTheme() {
    this.isDarkMode.update(value => !value);
  }
}

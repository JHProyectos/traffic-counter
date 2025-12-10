
import { Injectable } from '@angular/core';

const STORAGE_KEY = 'traffic_measurements';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  getMeasurements(): any[] {
    if (typeof window !== 'undefined' && window.localStorage) {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }else{
        return [];
    }
  }

  saveMeasurements(data: any) {
    if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setItem(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getItem(key: string) {
    const item = localStorage.getItem(key);
    if (item) {
      try {
        return JSON.parse(item);
      } 
      catch (error) {
        return item;
      }
    } else {
      return null;
    }
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
  removeAll() {
    localStorage.clear();
  }
}

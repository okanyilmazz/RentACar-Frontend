import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setItem(name: string, data: any) {
    let json = JSON.stringify(data);
    localStorage.setItem(name, json);
  }
  getItem(name: string) {
    let json = localStorage.getItem(name);
    let data = JSON.parse(json);
    return data;
  }
  removeItem(name: string) {
    localStorage.removeItem(name);
  }
  removeAll() {
    localStorage.clear();
  }
}

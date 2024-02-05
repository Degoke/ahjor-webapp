import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  hasNetworkError = signal<boolean>(false);

  constructor() { }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public installPrompt;
  public isInstalled: boolean;

  constructor() { }
}

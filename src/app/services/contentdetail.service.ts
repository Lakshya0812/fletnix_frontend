import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContentdetailService {
  private content: any;

  constructor() { }


  setContent(data: any): void {
    this.content = data;
  }

  getContent(): any {
    return this.content;
  }
}

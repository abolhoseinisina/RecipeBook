import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rb-header',
  template: `
    <p>
      header works!
    </p>
  `,
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

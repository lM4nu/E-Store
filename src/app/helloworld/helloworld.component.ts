import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'helloworld',
  template: ` <h2>Hello World</h2> 
  <p>This is my first component!</p> `
  //templateUrl: './helloworld.component.html',
  //styleUrls: ['./helloworld.component.css']
})
export class HelloworldComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

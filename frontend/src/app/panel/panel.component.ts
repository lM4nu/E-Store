import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {


respuesta = '';
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http
      .get('http://localhost:8080/demo/all', {responseType: 'json'})
      .subscribe((resp:any)=>{
          this.respuesta = resp;
          console.log(this.respuesta);
          
      }),
      (error: any) => {
        console.log(error);
      };
  }

}

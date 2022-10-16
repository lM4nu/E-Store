import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth.service';
import { LocalStorageService } from '../services/localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
	  private authService: AuthService,
	  private localStorageService: LocalStorageService,
	  private router: Router
  ) { }

  ngOnInit(): void {
  }


  login(formData:any){
	  this.authService.logear(formData.form.value)
	  .subscribe((res:any) => {
		  this.localStorageService.setToken(res.token);
		  this.localStorageService.setUserId(res.id);
		  this.router.navigate(['/home']);
	  },(err) => { console.log(err)})
  }
}

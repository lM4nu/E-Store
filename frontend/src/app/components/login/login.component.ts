import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/localstorage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
	  private userService: UserService,
	  private localStorageService: LocalStorageService,
	  private router: Router
  ) { }

  ngOnInit(): void {
  }


  login(formData:any){
		this.userService.logear(formData.form.value).subscribe(
			(res:any) =>{ 
				if(res.success){
					this.localStorageService.setToken(res.token);
					this.localStorageService.setUserId(res.id);
					this.router.navigate(['/home']);

				}else{
				console.log(res); 
				}
			},
			(error) => { console.log(error)}
		)
  }


  

}

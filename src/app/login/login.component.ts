import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import {LoginService} from '../shared/services/login.service';
import {AuthService} from '../shared/services/auth.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
     email: string;
     password: number;
    constructor(public router: Router, public login: LoginService, public authservice: AuthService) { }


    ngOnInit() {}

    onLoggedin() {
        const data = {
            'email': this.email,
            'password': this.password
        }
        console.log(data,'pop');
        this.login.login(data).subscribe(
            (successData) => {
                this.success(successData);
            },
            (error) => {
                this.failure(error);
            }
        );

    }
    public success(successData) {
        this.responseData = successData;
        if(this.responseData){
            this.authservice.setToken(this.responseData.token);
            localStorage.setItem('isLoggedin', 'true');
            this.router.navigate(['dashboard']);
        }

    }

    public failure(error) {
      console.log(error);

    }
}

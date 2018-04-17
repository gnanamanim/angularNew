import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable()
export class AuthService {

    constructor(private router: Router) { }

    loggedIn() {
        return (this.getToken() === undefined || this.getToken() === '' || this.getToken() == null) ?  false : true;
    }

    clearToken() {
        sessionStorage.removeItem('mt-patient-age');
    }

    setToken(token ) {

        sessionStorage.setItem('userToken', token);
    }
    getToken() {
        return sessionStorage.getItem('userToken');
    }


    /**
     * Checks wether used is logged in
     * and Redirects to users repository
     */
    checkAuthentication() {
        if (this.loggedIn()) {
            // route to home component
            alert('checkAuthentication');
            this.router.navigate(['/dashboard']);
        }
    }
}

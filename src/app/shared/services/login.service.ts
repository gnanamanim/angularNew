import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ConfigurationService} from './configuration.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class LoginService {

    constructor( public configurationService: ConfigurationService, public http: HttpClient) { }
    // getFormUrlEncoded(toConvert) {
    //     const formBody = [];
    //     for (const property in toConvert) {
    //         const encodedKey = encodeURIComponent(property);
    //         const encodedValue = encodeURIComponent(toConvert[property]);
    //         formBody.push(encodedKey + ':' + encodedValue);
    //     }
    //     return formBody.join('&');
    // }
    login(data) {
        const json = JSON.stringify(data);
        //let body = this.getFormUrlEncoded(data);
        // console.log(body,'body');
        // const token = this.authService.getToken();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
        };
        const url = this.configurationService.getHost() + '/Testctrl/login';
        return this.http.post(url , json)
            .map(this.extractData )
            .catch(this.handleError);

    }

    private extractData(res: Response) {
        console.log(res,'res');
        const body = res;
        return body || {};
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            // const body = error.json() || '';
            const err = error || JSON.stringify(error);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(error);
    }

}

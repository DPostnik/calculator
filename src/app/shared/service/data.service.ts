import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Data} from "../interfaces";

@Injectable()
export class DataService{

  constructor(private http: HttpClient) {
  }

  sendData(data: Data){
    return this.http.post<String>(`${environment.fbUrl}data.json`, data);
  }

}

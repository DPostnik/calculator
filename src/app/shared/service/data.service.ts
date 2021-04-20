import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Data} from "../interfaces";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable()
export class DataService{

  constructor(private http: HttpClient) {
  }

  sendData(data: Data){
    return this.http.post<Data>(`${environment.fbUrl}data.json`, data)
  }

  getData(): Observable<Data[]>{
    return this.http.get<Data[]>(`${environment.fbUrl}data.json`)
      .pipe(map((response: {[key: string]: any}) => {
        return Object
          .keys(response)
          .map(key => ({
            ...response[key],
            value: response[key].value,
            date: new Date(response[key].date)
          }))
      }))
  }

  remove(): Observable<void>{
    return this.http.delete<void>(`${environment.fbUrl}data.json`)
  }


}

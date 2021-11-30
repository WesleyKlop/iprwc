import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map, Observable, tap } from 'rxjs'
import { Response } from './response'

@Injectable({
  // All other services should be able to use this.
  providedIn: 'root',
})
export class ApiService {
  private httpHeaders = new HttpHeaders({
    Accept: 'application/json',
  })

  protected constructor(
    private http: HttpClient,
  ) {
  }

  public signOut() {
    this.httpHeaders.delete('Authorization')
  }

  public get<R>(url: string): Observable<R> {
    return this.request<R>('GET', url)
  }

  protected request<R>(method: string, url: string, body?: any): Observable<R> {
    return this.http.request<Response<R>>(method, '/api' + url, {
      body,
      observe: 'body',
      headers: this.httpHeaders,
    })
      .pipe(
        tap(response => {
          console.log('Received response:', response)
          if ('jwt' in response.meta) {
            this.httpHeaders.set('Authorization', `Bearer ${response.meta.jwt}`)
          }
        }),
        map(response => response.data),
      )
  }
}

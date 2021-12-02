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

  protected constructor(private http: HttpClient) {}

  public clearAuthorization(): void {
    this.httpHeaders = this.httpHeaders.delete('Authorization')
  }

  public get<R>(url: string): Observable<R> {
    return this.request<R>('GET', url)
  }

  protected request<R>(method: string, url: string, body?: any): Observable<R> {
    return this.http
      .request<Response<R>>(method, '/api' + url, {
        body,
        observe: 'body',
        headers: this.httpHeaders,
      })
      .pipe(
        tap((response) => {
          console.log('Received response:', response)
          if (this.shouldUpdateAuthorization(response.meta?.jwt)) {
            this.setAuthorization(response.meta.jwt)
            localStorage.setItem('app.jwt', response.meta.jwt)
          }
        }),
        map((response) => response.data),
      )
  }

  public post<R>(url: string, body: Record<any, any>): Observable<R> {
    return this.request<R>('POST', url, body)
  }

  public setAuthorization(jwt: string): void {
    this.httpHeaders = this.httpHeaders.set('Authorization', `Bearer ${jwt}`)
  }

  private shouldUpdateAuthorization(jwt?: string): jwt is string {
    if (!jwt) {
      return false
    }

    return this.httpHeaders.get('Authorization') !== `Bearer ${jwt}`
  }
}

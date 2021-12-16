import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, map, Observable, tap, throwError } from 'rxjs'
import { Response } from './response'
import { ValidationError } from '../errors/ValidationError'
import { AuthenticationError } from '../errors/AuthenticationError'

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
          console.debug('Received response:', url, response)
          if (this.shouldUpdateAuthorization(response.meta?.jwt)) {
            this.setAuthorization(response.meta.jwt)
            localStorage.setItem('app.jwt', response.meta.jwt)
          }
        }),
        map((response) => response.data),
        catchError((response) => {
          console.warn('We got an error!', response.status, response.error)
          switch (response.status) {
            case 401:
            case 403:
              if (response.status === 401) {
                this.clearAuthorization()
              }
              return throwError(
                () =>
                  new AuthenticationError(
                    response.error.message,
                    response.status,
                  ),
              )
            case 422:
              console.error('err', response)
              return throwError(
                () => new ValidationError(response.error.errors),
              )
          }
          console.debug('But we could not handle it :(')
          return throwError(() => response)
        }),
      )
  }

  public post<R>(
    url: string,
    body: Record<any, any> | FormData,
  ): Observable<R> {
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

  public patch<R>(
    url: string,
    body: Record<any, any> | FormData,
  ): Observable<R> {
    return this.request<R>('PATCH', url, body)
  }

  delete<R = void>(url: string) {
    return this.request<R>('DELETE', url)
  }
}

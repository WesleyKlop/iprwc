import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Image } from '../models'
import { ApiService } from './api.service'

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private apiService: ApiService) {}

  uploadImage(file: File): Observable<Image> {
    const formData = new FormData()
    formData.set('image', file)
    return this.apiService.post('/images', formData)
  }
}

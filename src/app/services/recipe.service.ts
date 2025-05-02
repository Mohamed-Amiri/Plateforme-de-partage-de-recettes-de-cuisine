import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private apiUrl = 'https://www.themealdb.com/api/json/v1/1/';

  constructor(private http: HttpClient) {}

  getRecipes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}search.php?s=`);
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}categories.php`);
  }
  getRandomMeal(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}random.php`);
  }

  getMealById(id: string | null): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}lookup.php?i=${id}`);
  }
}

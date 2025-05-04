import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RatingSystemComponent } from '../../components/rating-system/rating-system.component';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  imports: [CommonModule,  RatingSystemComponent],
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: any;
  ingredients: { ingredient: string; measure: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.http.get<any>(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).subscribe(response => {
        if (response.meals && response.meals.length > 0) {
          this.recipe = response.meals[0];
          this.extractIngredients();
        }
      });
    }
  }

  extractIngredients(): void {
    for (let i = 1; i <= 20; i++) {
      const ingredient = this.recipe[`strIngredient${i}`];
      const measure = this.recipe[`strMeasure${i}`];

      if (ingredient && ingredient.trim() !== '') {
        this.ingredients.push({ ingredient, measure });
      }
    }
  }

  getYoutubeEmbedUrl(url: string): string {
    const videoId = url.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}`;
  }
}

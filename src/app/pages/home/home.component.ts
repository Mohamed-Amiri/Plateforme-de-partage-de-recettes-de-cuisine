import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Meal } from '../../meal/meal.module';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [
    RouterLink, CommonModule,
  ],
  styleUrls: ['./home.component.css'],
  standalone: true
})
export class HomeComponent implements OnInit {
  trendingMeals: Meal[] = [];
  isLoading = true;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.loadTrendingMeals();
  }

  loadTrendingMeals(): void {
    this.isLoading = true;
    this.recipeService.getRecipes()
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (response: { meals: Meal[] }) => {
          if (response && response.meals) {
            this.trendingMeals = response.meals.slice(0, 6); // Take only 6 recipes

            // Add animation delay dynamically
            this.trendingMeals.forEach((meal, index) => {
              (meal as any).animationDelay = `${0.1 * index}s`;
            });
          }
        },
        error: (error) => {
          console.error('Error fetching trending meals:', error);
        }
      });
  }

  // Track items for better performance
  trackByMealId(index: number, meal: Meal): string {
    return meal.idMeal;
  }
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Required for ngModel two-way binding
import { HttpClientModule } from '@angular/common/http';  // Required for HTTP requests
import { RouterModule } from '@angular/router';  // Required for routing
import { RecipeService } from '../../services/recipe.service';
import { Meal } from '../../meal/meal.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-list',
  standalone: true,  // This makes the component standalone
  imports: [FormsModule, HttpClientModule, RouterModule, CommonModule],  // Import needed modules for this component
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  searchQuery: string = '';
  meals: Meal[] = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe(
      (response: { meals: Meal[]; }) => {
        this.meals = response.meals;
      },
      (error: any) => {
        console.error('Error fetching meals:', error);
      }
    );
  }

  get filteredMeals() {
    return this.meals.filter(meal =>
      meal.strMeal.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}

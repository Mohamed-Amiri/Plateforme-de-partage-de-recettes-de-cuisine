import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {ActivatedRoute, RouterModule } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Meal } from '../../meal/meal.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterModule, CommonModule],
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  meals: Meal[] = [];
  filteredMeals: Meal[] = [];

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe(
      (response: { meals: Meal[] }) => {
        this.meals = response.meals;
        this.filterMeals(); // initial filtering
      },
      (error: any) => console.error('Error fetching meals:', error)
    );

    // Get query params on load or change
    this.route.queryParams.subscribe(params => {
      this.filterMeals(params['search'] || '', params['category'] || 'All');
    });
  }

  filterMeals(search: string = '', category: string = 'All') {
    const query = search.toLowerCase();
    this.filteredMeals = this.meals.filter(meal => {
      const matchSearch = meal.strMeal.toLowerCase().includes(query) || meal.strChef?.toLowerCase().includes(query);
      const matchCategory = category === 'All' || meal.strCategory === category;
      return matchSearch && matchCategory;
    });
  }
}

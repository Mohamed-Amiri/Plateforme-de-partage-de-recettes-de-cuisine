import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../services/recipe.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  trendingMeals: any[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    // Appeler le service pour obtenir des recettes aléatoires
    this.loadTrendingMeals();
  }

  loadTrendingMeals(): void {
    const requests = Array.from({ length: 6 }).map(() =>
      this.recipeService.getRandomMeal()
    );

    Promise.all(requests.map(obs => obs.toPromise()))
      .then(results => {
        this.trendingMeals = results.map(res => res.meals[0]);
      })
      .catch(error => {
        console.error('Erreur lors du chargement des recettes tendances', error);
      });
  }
}

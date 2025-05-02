import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Import for routing
import { RecipeService } from '../../services/recipe.service'; // Importing the service
import { CommonModule } from '@angular/common';
import {RatingSystemComponent} from '../../components/rating-system/rating-system.component';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,  // Mark this component as standalone
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
  imports: [

    CommonModule,
    RatingSystemComponent
  ]
})
export class RecipeDetailComponent {
  meal: any;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    const mealId = this.route.snapshot.paramMap.get('id');
    this.recipeService.getMealById(mealId).subscribe(
      (mealData) => {
        this.meal = mealData.meals[0]; // assuming the data structure is like { meals: [...] }
      },
      (error) => {
        console.error('Error fetching meal data', error);
      }
    );
  }
}

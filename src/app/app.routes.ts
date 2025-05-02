import { Routes } from '@angular/router';
import { RecipeDetailComponent } from './pages/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './pages/recipe-list/recipe-list.component';

export const routes: Routes = [
  { path: '', component: RecipeListComponent },
  { path: 'recipes', component: RecipeListComponent },
  { path: 'recipes/:id', component: RecipeDetailComponent },  // <-- Make sure the route matches this pattern
];

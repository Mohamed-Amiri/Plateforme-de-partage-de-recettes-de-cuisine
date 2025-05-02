import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class NavbarComponent implements OnInit {
  searchQuery: string = '';
  selectedCategory: string = 'All';
  categories: string[] = [];

  constructor(private router: Router, private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.getCategories().subscribe(
      (res: any) => {
        this.categories = res.categories.map((cat: any) => cat.strCategory);
      },
      err => console.error(err)
    );
  }

  search() {
    this.router.navigate(['/recipes'], {
      queryParams: {
        search: this.searchQuery,
        category: this.selectedCategory
      }
    });
  }
}

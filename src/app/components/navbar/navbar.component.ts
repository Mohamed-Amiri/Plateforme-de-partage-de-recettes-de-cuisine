import { Component, OnInit, HostListener } from '@angular/core';
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
  isMobileMenuOpen: boolean = false;
  isScrolled: boolean = false;

  constructor(private router: Router, private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.getCategories().subscribe(
      (res: any) => {
        this.categories = res.categories.map((cat: any) => cat.strCategory);
      },
      err => console.error(err)
    );
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  search() {
    this.router.navigate(['/recipes'], {
      queryParams: {
        search: this.searchQuery,
        category: this.selectedCategory
      }
    });
    this.isMobileMenuOpen = false; // Ferme le menu après recherche sur mobile
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}

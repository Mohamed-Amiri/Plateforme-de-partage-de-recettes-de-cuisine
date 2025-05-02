import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {RecipeListComponent} from './pages/recipe-list/recipe-list.component';
import {HomeComponent} from './pages/home/home.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {FooterComponent} from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HomeComponent,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CookShare';
}

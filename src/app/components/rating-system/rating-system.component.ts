import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rating-system',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rating-system.component.html',
  styleUrls: ['./rating-system.component.css']
})
export class RatingSystemComponent {
  @Input() mealId!: string;
  rating: number = 0;
  comment: string = '';
  reviews: { rating: number; comment: string; date: Date }[] = [];

  submitReview() {
    if (this.rating > 0 && this.comment.trim()) {
      this.reviews.push({ rating: this.rating, comment: this.comment.trim(), date: new Date() });
      this.rating = 0;
      this.comment = '';
    }
  }
}

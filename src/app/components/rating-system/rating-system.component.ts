import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rating-system',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rating-system.component.html',
  styleUrls: ['./rating-system.component.css']
})
export class RatingSystemComponent implements OnInit {
  @Input() mealId!: string;
  rating: number = 0;
  comment: string = '';
  reviews: { rating: number; comment: string; date: Date }[] = [];

  ngOnInit() {
    this.loadReviews();
  }

  loadReviews() {
    const stored = localStorage.getItem(`reviews-${this.mealId}`);
    if (stored) {
      this.reviews = JSON.parse(stored);
    }
  }

  saveReviews() {
    localStorage.setItem(`reviews-${this.mealId}`, JSON.stringify(this.reviews));
  }

  submitReview() {
    if (this.rating > 0 && this.comment.trim()) {
      const newReview = {
        rating: this.rating,
        comment: this.comment.trim(),
        date: new Date()
      };
      this.reviews.unshift(newReview);
      this.saveReviews();
      this.rating = 0;
      this.comment = '';
    }
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContentdetailService } from '../../services/contentdetail.service';

@Component({
  selector: 'app-contentdetails',
  standalone: true,
  imports: [],
  templateUrl: './contentdetails.component.html',
  styleUrl: './contentdetails.component.css'
})
export class ContentdetailsComponent {
  movie: any = {}

  constructor(private router: Router , private contentDetails : ContentdetailService) {}

  ngOnInit(): void {
    this.movie = this.contentDetails.getContent()
  }
}

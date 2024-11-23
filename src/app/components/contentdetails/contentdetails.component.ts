import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContentdetailService } from '../../services/contentdetail.service';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-contentdetails',
  standalone: true,
  imports: [MatDialogModule],
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

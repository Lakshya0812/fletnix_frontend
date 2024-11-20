import { Component } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { MatSpinner } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [MatSpinner , CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {

  isLoading$: any;
  
  constructor(private loaderService: LoaderService) {
    this.isLoading$ = this.loaderService?.isLoading$;
  }
  
  
}

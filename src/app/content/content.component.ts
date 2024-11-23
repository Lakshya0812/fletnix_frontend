import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {  MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { HeaderComponent } from '../components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { ContentdetailService } from '../services/contentdetail.service';
import { ContentdetailsComponent } from '../components/contentdetails/contentdetails.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatSelectModule, FormsModule,
    MatPaginatorModule , HeaderComponent , MatIconModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {
  netflixData: any[] = []
  allData : any = []
  filteredData: any[] = [];
  searchQuery: string = '';
  filterType: string = 'all';
  error: string | null = null;
  pageIndex = 0
  appliedFilters : any = {}
  pageSize = 15
  totalItems = 0
  currentPage = 1;
  nextPageUrl: string | null = null;
  previousPageUrl: string | null = null;

  constructor(private apiService: ApiService , private router : Router , private route : ActivatedRoute , private loaderService : LoaderService , private contentDetails : ContentdetailService , private dialog : MatDialog) { }

  ngOnInit(): void {
    
    // this.loaderService.show()

    this.fetchData()

    
      // this.loaderService.hide()

    
    // this.route.queryParams.subscribe((params : any) => {
    //   console.log(params , 'params')
    //   if(Object.keys(params).length){
    //     this.loaderService.show()

    //     setTimeout(() => {
    //       let queryArr = []
    //       let queryStr = ''
    //       if(params.search){
    //         queryArr.push(`search=${params.search}`)
    //       }
    //       if(params.type){
    //         queryArr.push(`type=${params.type}`)
    //       }
    //       if(queryArr.length){
    //         queryStr = `?${queryArr.join('&')}`
    //       }
    //       console.log(queryStr , 'query')
    //       this.apiService.getContent(queryStr).subscribe(
    //         (data) => {
    //           console.log(JSON.parse(data.data))
    //           this.pageIndex = 1
    //           this.allData = JSON.parse(data.data)
    //           this.updateTableData(1)
    //           this.totalPages = data.metadata.total_pages
    //           this.loaderService.hide()
    //         },
    //         (error) => {
    //           this.error = error;
    //           this.loaderService.hide()
    //         }
    //       );
    //     } , 1000)
    //   }else{
    //     this.apiService.getContent('').subscribe(
    //       (data) => {
    //         console.log(JSON.parse(data.data))
    //         this.pageIndex = 1
    //         this.allData = JSON.parse(data.data)
    //         this.updateTableData(1)
    //         this.totalPages = data.metadata.total_pages
    //         this.loaderService.hide()
    //       },
    //       (error) => {
    //         this.error = error;
    //         this.loaderService.hide()
    //       }
    //     );
    //   }
    //   this.appliedFilters = { ...params };
    //   this.searchQuery = params.search ? params.search : ''
    //   this.filterType = params.type ? params.type : 'all' 
    // });
  }

  fetchData(){
    this.route.queryParams
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((params: any) => {
          let query = '';
          let queryArr = [];
          this.appliedFilters = { ...params };
          if (params.search) {
            queryArr.push(`search=${params.search}`);
          }
          if (params.type) {
            queryArr.push(`type=${params.type}`);
          }
          if (params.page) {
            queryArr.push(`page=${params.page}`);
          }
          if (queryArr.length) {
            query = `?${queryArr.join('&')}`;
          }
          this.searchQuery = params.search ? params.search : '';
          this.filterType = params.type ? params.type : 'all';
          return this.apiService.getContent(query);
        })
      )
      .subscribe(
        (data: any) => {
          this.netflixData = JSON.parse(data.data);
          this.totalItems = data.metadata.total_items;
          this.pageIndex = data.metadata.current_page;
          this.currentPage = data.metadata.current_page;
          this.nextPageUrl = data.metadata.next_page_url;
          this.previousPageUrl = data.metadata.previous_page_url;
        },
        (error) => {
          this.error = error;
        }
      );
  }

  onFilterChange(key: string, value: any): void {
    if(value != null){
      this.appliedFilters[key] = value;
    }
    this.appliedFilters = {...this.appliedFilters , page : 1}
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.appliedFilters,
      queryParamsHandling: 'merge',
    });
  }

  resetFilters(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {},
    });
  }



  handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex + 1; // Convert 0-based index to 1-based page
  }

  updateTableData(page : any){
    console.log(this.allData , page)
    const startIndex = page * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.netflixData = this.allData.slice(startIndex , endIndex)
    console.log(this.netflixData , 'data')
  }

  viewDetails(item : any){
    console.log(item , ';item')
    this.contentDetails.setContent(item)
    this.dialog.open(ContentdetailsComponent , {
      data : item
    })

  }
  goToNextPage() {
    if (this.nextPageUrl) {
      this.updateQueryParams(this.currentPage + 1);
    }
  }

  goToPreviousPage() {
    if (this.previousPageUrl) {
      this.updateQueryParams(this.currentPage - 1);
    }
  }

  updateQueryParams(page: number) {
    // this.appliedFilters = {...this.appliedFilters , page : page}
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        ...this.appliedFilters,
        page: page
      },
      queryParamsHandling: 'merge' // Merge new page number with existing query params
    });
  }

}

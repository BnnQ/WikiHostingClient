import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  searchQuery: string = '';
  categories: string[] = [];
  selectedCategory: string | null = null;
  wikiName: string[] =[];
  numbResult: any = 0;
  search: string = "";
  WikisId :number[] = [];
  wikiDetails: any[] = []
  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCategories().subscribe(categories => {
      this.categories = categories;
    });

    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'] || ''; 
    });
    // this.onSearchRoute(this.searchQuery);
    this.onSearch({ target: { value: this.searchQuery } });
  }

  getCategories(): Observable<string[]> {
    const apiUrl = 'https://localhost:7133/Topic';
  return this.http.get<{ name: string }[]>(apiUrl)
    .pipe(
      map(categories => categories.map(category => category.name))
    );
  }

  onCategorySelected(category: string | null): void {
    if(this.selectedCategory == category){
      this.selectedCategory = null;
    }else{
      this.selectedCategory = category;
      console.log(this.selectedCategory);
      this.onSearch({ target: { value: this.searchQuery } });
    }
  }

  onSearchRoute(query: string): void {
    if (query.length >= 1) {
      let apiUrl = `https://localhost:7133/Wiki?search=${query}`;
      this.http.get<any[]>(apiUrl).subscribe(
          (response) => {
              this.wikiDetails = response.map(item => {
                  return {
                      name: item.name,
                      MainWikiImagePath: item.mainWikiImagePath
                  };
              }); 
              this.numbResult = this.wikiDetails.length;
              this.search = query;
              this.WikisId = response.map(item=>item.id);
              console.log(this.wikiDetails);
          },
          (error) => {
              console.error(error);
          }
      );
  } else {
      this.wikiDetails = [];
  }
  }

  

  onSearch(event: any): void {
    
    const query = event.target.value;
    this.searchQuery = query;
    if (query.length >= 1) {
      let apiUrl = `https://localhost:7133/Wiki?search=${query}`;
      if (this.selectedCategory!=null) {
        apiUrl += `&topic=${this.selectedCategory}`;
      }   
        this.http.get<any[]>(apiUrl).subscribe(
            (response) => {
                this.wikiDetails = response.map(item => {
                    return {
                        name: item.name,
                        MainWikiImagePath: item.mainWikiImagePath
                    };
                }); 
                this.numbResult = this.wikiDetails.length;
                this.search = query;
                this.WikisId = response.map(item=>item.id);
                console.log(this.wikiDetails);
            },
            (error) => {
                console.error(error);
            }
        );
        console.log(apiUrl);
    } else {
        this.wikiDetails = [];
    }
}
}

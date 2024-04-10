import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  categories: string[] = [];
  selectedCategory: string | null = null;
  wikiName: string[] =[];
  numbResult: any = 0;
  search: string = "";
  WikisId :number[] = [];
  wikiDetails: any[] = []
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getCategories().subscribe(categories => {
      this.categories = categories;
    });
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
    }
  }

  onSearch(event: any): void {
    const query = event.target.value;
    if (query.length >= 1) {
      let apiUrl = `https://localhost:7133/Wiki?search=${query}`;
      this.http.get<any[]>(apiUrl).subscribe(
        (response) => {
          this.wikiName = response.map(item => item.name); 
          this.numbResult = this.wikiName.length;
          this.search = query;
          this.WikisId = response.map(item=>item.id);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.wikiName = [];
    }

  }

  getWikisDetails(){
    this.WikisId.forEach(id=>{
      const apiUrl=``;
      this.http.get<any>(apiUrl).subscribe(
        (response)=>{
          this.wikiDetails.push({
            id: response.id,
            
          })
        }
      )
    })
  }
}

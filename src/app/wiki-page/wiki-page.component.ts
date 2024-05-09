import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageFeedDto } from '../../models/dto/page-feed-dto';
import {SERVICE_IDENTIFIERS} from "../app.module";
import {IUserRepository} from "../../services/abstractions/i-user-repository";
import {IPageRepository} from "../../services/abstractions/i-page-repository";
import {faComment, faHeart, faShareSquare, faThumbsUp} from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: 'app-wiki-page',
  templateUrl: './wiki-page.component.html',
  styleUrl: './wiki-page.component.css'
})
export class WikiPageComponent implements OnInit {
  category!: string;
  topicImage: string = '';
  topicId!:number;
  wikiEntries: any[] = [];
  searchQuery!: string
  pages: PageFeedDto[] = [];
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router,@Inject(SERVICE_IDENTIFIERS.IPageRepository) private readonly pageRepository: IPageRepository,
  @Inject(SERVICE_IDENTIFIERS.IUserRepository) private readonly userRepository: IUserRepository) {
}
protected readonly faThumbsUp = faThumbsUp;
  protected readonly faComment = faComment;
  protected readonly faShareSquare = faShareSquare;
  protected readonly faHeart = faHeart;

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe((params) => {
      this.category = params['category'];
    });
    await this.getCategory();
    // this.getWiki();
    this.pages = await this.pageRepository.getPopularPagesByTopic(20, this.topicId);
    console.log(this.pages);
  }
  
  async getCategory() {
    const apiUrl = `https://localhost:7133/Topic?search=${this.category}`;
    try {
      const data = await this.http.get<any>(apiUrl).toPromise();
      if (data.length > 0) {
        this.topicImage = data[0].topicImage;
        this.topicId = data[0].id;
      } else {
        console.error('No topic found.');
      }
    } catch (error) {
      console.error('Error fetching topic:', error);
    }
  }

  search(){
    if(this.searchQuery){
      this.router.navigate(['/search'], { queryParams: { query: this.searchQuery } });
    }
  }


  
}


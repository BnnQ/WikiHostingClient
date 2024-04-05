import {Component, Inject, OnInit} from '@angular/core';
import {faComment, faHeart, faShareSquare, faThumbsUp} from "@fortawesome/free-regular-svg-icons";
import {Page} from "../../models/page";
import {SERVICE_IDENTIFIERS} from "../app.module";
import {IUserRepository} from "../../services/abstractions/i-user-repository";
import {IPageRepository} from "../../services/abstractions/i-page-repository";
import {PageFeedDto} from "../../models/dto/page-feed-dto";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent implements OnInit {
  pages: PageFeedDto[] = [];

  constructor(@Inject(SERVICE_IDENTIFIERS.IPageRepository) private readonly pageRepository: IPageRepository,
              @Inject(SERVICE_IDENTIFIERS.IUserRepository) private readonly userRepository: IUserRepository) {
  }

  async ngOnInit(): Promise<void> {
    this.pages = await this.pageRepository.getPopularPages(20);
  }

  protected readonly faThumbsUp = faThumbsUp;
  protected readonly faComment = faComment;
  protected readonly faShareSquare = faShareSquare;
  protected readonly faHeart = faHeart;
}

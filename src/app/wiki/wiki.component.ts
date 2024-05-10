import {Component, Inject, OnInit} from '@angular/core';
import {faCircleDown as faCircleDownSolid, faCircleUp as faCircleUpSolid, faChartLine, faEllipsisVertical, faSearch} from "@fortawesome/free-solid-svg-icons";
import {faCircleDown as faCircleDownRegular, faCircleUp as faCircleUpRegular, faComments, faSun} from "@fortawesome/free-regular-svg-icons";
import {ActivatedRoute} from "@angular/router";
import {SERVICE_IDENTIFIERS} from "../app.module";
import {IWikiRepository} from "../../services/abstractions/i-wiki-repository";
import {Wiki} from "../../models/wiki";
import {Page} from "../../models/page";
import {IPageRepository} from "../../services/abstractions/i-page-repository";
import {DomSanitizer} from "@angular/platform-browser";
import {IUserRepository} from "../../services/abstractions/i-user-repository";
import {IRatingRepository} from "../../services/abstractions/i-rating-repository";
import {ModalReportComponent} from "../modal-report/modal-report.component";
import {ModalService} from "ngx-modal-ease";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrl: './wiki.component.css'
})
export class WikiComponent implements OnInit {
  wikiId : number = 0;
  wiki? : Wiki;
  numberOfPages: number = 0;
  page?: Page;
  pageId: number = 0;
  wikiTitle?: string;
  pageTitle?: string;
  isLiked: boolean = false;
  isDisliked: boolean = false;

  constructor(activatedRoute : ActivatedRoute, private readonly sanitizer : DomSanitizer, @Inject(SERVICE_IDENTIFIERS.IWikiRepository) private readonly wikiRepository : IWikiRepository, @Inject(SERVICE_IDENTIFIERS.IPageRepository) private readonly pageRepository : IPageRepository, @Inject(SERVICE_IDENTIFIERS.IUserRepository) private readonly userRepository : IUserRepository, @Inject(SERVICE_IDENTIFIERS.IRatingRepository) private readonly ratingRepository : IRatingRepository, private readonly modalService : ModalService, private readonly toastService : ToastrService) {
    this.wikiId = parseInt(activatedRoute.snapshot.paramMap.get('id')!);
    this.pageId = parseInt(activatedRoute.snapshot.paramMap.get('pageId') ?? '0');
    this.wikiTitle = activatedRoute.snapshot.paramMap.get('wikiTitle') ?? undefined;
    this.pageTitle = activatedRoute.snapshot.paramMap.get('pageTitle') ?? undefined;
  }

  getSafePageHtml() {
    return this.sanitizer.bypassSecurityTrustHtml(this.page!.processedHtml);
  }

  reportPost(reason : string) {
    alert(`Report submitted for: ${reason}`);
  }

  async ngOnInit(): Promise<void> {
    if (this.wikiId) {
      this.wiki = await this.wikiRepository.getWiki(this.wikiId);
      this.wiki!.id = this.wikiId;
    }
    else if (this.wikiTitle) {
      this.wiki = await this.wikiRepository.getWikiByTitle(this.wikiTitle);
      console.log('wikiTitle', this.wikiTitle);

    }

    if (this.wiki)
    {
      this.numberOfPages = this.wiki.numberOfPages;

      if (this.pageId != 0) {
        this.page = await this.pageRepository.getWikiPage(this.wikiId, this.pageId);
      }
      else if (this.pageTitle) {
        this.page = await this.pageRepository.getWikiPageByTitle(this.wiki.name, this.pageTitle);
        this.pageId = this.page.id;
        console.log('this.page.id', this.page.id);
      }
      else {
        this.page = await this.pageRepository.getMainWikiPage(this.wikiId);
        this.pageId = this.page.id;
      }

      const currentUserId = await this.userRepository.getCurrentUserId();
      if (currentUserId && currentUserId > 0){
        this.isLiked = this.page.userRatings.some(rating => rating.userId === currentUserId && rating.numberOfLikes > 0);
        this.isDisliked = this.page.userRatings.some(rating => rating.userId === currentUserId && rating.numberOfDislikes > 0);
      }

    }
  }

  async like() {
    if (this.isLiked) {
      await this.ratingRepository.clearRating(this.pageId);
      this.isLiked = false;
      return;
    }

    await this.ratingRepository.like(this.pageId);
    this.isLiked = true;
    this.isDisliked = false;
  }

  async dislike() {
    if (this.isDisliked) {
      await this.ratingRepository.clearRating(this.pageId);
      this.isDisliked = false;
      return;
    }

    await this.ratingRepository.dislike(this.pageId);
    this.isDisliked = true;
    this.isLiked = false;
  }

  openReportMenu() {
    this.modalService.open(ModalReportComponent).subscribe(reportData => {
      if (!reportData) {
        return;
      }
      console.log(reportData);
      this.toastService.success("Your complaint has been successfully submitted. Thank you for your feedback!");
    });
  }

  protected readonly faSearch = faSearch;
  protected readonly faComments = faComments;
  protected readonly faChartLine = faChartLine;
  protected readonly faSun = faSun;
  protected readonly faEllipsisVertical = faEllipsisVertical;
  protected readonly faCircleUpRegular = faCircleUpRegular;
  protected readonly faCircleDownRegular = faCircleDownRegular;
  protected readonly faCircleUpSolid = faCircleUpSolid;
  protected readonly faCircleDownSolid = faCircleDownSolid;

}

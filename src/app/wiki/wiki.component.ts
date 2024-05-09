import {Component, Inject, OnInit} from '@angular/core';
import {faChartLine, faEllipsisVertical, faSearch} from "@fortawesome/free-solid-svg-icons";
import {faComments, faSun} from "@fortawesome/free-regular-svg-icons";
import {ActivatedRoute} from "@angular/router";
import {SERVICE_IDENTIFIERS} from "../app.module";
import {IWikiRepository} from "../../services/abstractions/i-wiki-repository";
import {Wiki} from "../../models/wiki";
import {Page} from "../../models/page";
import {IPageRepository} from "../../services/abstractions/i-page-repository";
import {DomSanitizer} from "@angular/platform-browser";

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

  constructor(activatedRoute : ActivatedRoute, private readonly sanitizer : DomSanitizer, @Inject(SERVICE_IDENTIFIERS.IWikiRepository) private readonly wikiRepository : IWikiRepository, @Inject(SERVICE_IDENTIFIERS.IPageRepository) private readonly pageRepository : IPageRepository) {
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
      }
    }
  }

  protected readonly faSearch = faSearch;
  protected readonly faComments = faComments;
  protected readonly faChartLine = faChartLine;
  protected readonly faSun = faSun;
  protected readonly faEllipsisVertical = faEllipsisVertical;
}

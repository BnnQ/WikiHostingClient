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

  constructor(activatedRoute : ActivatedRoute, private readonly sanitizer : DomSanitizer, @Inject(SERVICE_IDENTIFIERS.IWikiRepository) private readonly wikiRepository : IWikiRepository, @Inject(SERVICE_IDENTIFIERS.IPageRepository) private readonly pageRepository : IPageRepository) {
    this.wikiId = parseInt(activatedRoute.snapshot.paramMap.get('id')!);
    this.pageId = parseInt(activatedRoute.snapshot.paramMap.get('pageId') ?? '0');
  }

  getSafePageHtml() {
    return this.sanitizer.bypassSecurityTrustHtml(this.page!.processedHtml);
  }

  async ngOnInit(): Promise<void> {
    this.wiki = await this.wikiRepository.getWiki(this.wikiId);
    this.wiki!.id = this.wikiId;

    if (this.wiki)
    {
      this.numberOfPages = this.wiki.numberOfPages;

      if (this.pageId != 0) {
        this.page = await this.pageRepository.getWikiPage(this.wikiId, this.pageId);
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

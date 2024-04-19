import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SERVICE_IDENTIFIERS} from "../app.module";
import {IPageRepository} from "../../services/abstractions/i-page-repository";
import {PageUpsertDto} from "../../models/dto/page-upsert-dto";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.css'
})
export class EditPageComponent implements OnInit {
  wikiId : number = 0;
  pageId : number = 0;
  initialPageContent: string = '';

  constructor(activatedRoute : ActivatedRoute, private readonly router : Router, @Inject(SERVICE_IDENTIFIERS.IPageRepository) private readonly pageRepository : IPageRepository) {
    this.wikiId = parseInt(activatedRoute.snapshot.paramMap.get('id')!);
    this.pageId = parseInt(activatedRoute.snapshot.paramMap.get('pageId')!);
  }

  async ngOnInit(): Promise<void> {
    if (this.wikiId === 0 || this.pageId === 0)
      return;

    const page = await this.pageRepository.getPage(this.pageId);
    this.initialPageContent = page.processedHtml;
  }

  async save(html?: string) : Promise<void> {
    if (!html || this.wikiId === 0)
      return;

    const editedPage = await this.pageRepository.editPage(this.pageId, new PageUpsertDto(html, html));
    await this.router.navigate(['wiki',this.wikiId, 'page', editedPage.id]);
  }

}

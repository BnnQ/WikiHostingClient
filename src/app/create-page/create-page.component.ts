import {Component, Inject} from '@angular/core';
import {SERVICE_IDENTIFIERS} from "../app.module";
import {IPageRepository} from "../../services/abstractions/i-page-repository";
import {ActivatedRoute, Router} from "@angular/router";
import {PageUpsertDto} from "../../models/dto/page-upsert-dto";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrl: './create-page.component.css'
})
export class CreatePageComponent {
  wikiId : number = 0;

  constructor(activatedRoute : ActivatedRoute, private readonly router : Router, @Inject(SERVICE_IDENTIFIERS.IPageRepository) private readonly pageRepository : IPageRepository) {
    this.wikiId = parseInt(activatedRoute.snapshot.paramMap.get('id')!);
  }

  async save(html?: string) : Promise<void> {
    if (!html || this.wikiId === 0)
      return;

    const createdPage = await this.pageRepository.createPage(this.wikiId, new PageUpsertDto(html, html));
    await this.router.navigate(['wiki',this.wikiId, 'page', createdPage.id]);
  }
}

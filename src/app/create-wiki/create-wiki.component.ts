import {Component, Inject, OnInit} from '@angular/core';
import {SERVICE_IDENTIFIERS} from "../app.module";
import {IMediaRepository} from "../../services/abstractions/i-media-repository";
import {IWikiRepository} from "../../services/abstractions/i-wiki-repository";
import {WikiUpsertDto} from "../../models/dto/wiki-upsert-dto";
import {Router} from "@angular/router";
import {ITopicRepository} from "../../services/abstractions/i-topic-repository";
import {Topic} from "../../models/topic";

@Component({
  selector: 'app-create-wiki',
  templateUrl: './create-wiki.component.html',
  styleUrl: './create-wiki.component.css'
})
export class CreateWikiComponent implements OnInit {
  communityName: string = '';
  topic: string = '';
  backgroundImage?: File;
  logoImage?: File;
  topics: Topic[] = [];

  constructor(@Inject(SERVICE_IDENTIFIERS.IMediaRepository) private readonly mediaRepository : IMediaRepository, @Inject(SERVICE_IDENTIFIERS.IWikiRepository) private readonly wikiRepository : IWikiRepository, @Inject(SERVICE_IDENTIFIERS.ITopicRepository) private readonly topicRepository : ITopicRepository, private readonly router : Router) {

  }

  async ngOnInit(): Promise<void> {
    this.topics = await this.topicRepository.getTopics();
  }

  onBackgroundImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.backgroundImage = file;
  }

  onLogoImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.logoImage = file;
  }

  async createWiki(): Promise<void> {
    if (!this.backgroundImage || !this.logoImage)
      return;

    const backgroundImagePath = await this.mediaRepository.uploadImage(this.backgroundImage);
    const mainWikiImagePath = await this.mediaRepository.uploadImage(this.logoImage);
    const wiki = new WikiUpsertDto(this.communityName, backgroundImagePath, mainWikiImagePath, [], this.topic);

    console.log('wiki', wiki);
    const createdWiki = await this.wikiRepository.createWiki(wiki);
    await this.router.navigate(['/wiki', createdWiki.id]);
  }

}

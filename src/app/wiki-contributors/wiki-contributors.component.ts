import {Component, Inject, NgIterable, OnInit} from '@angular/core';
import {faBook, faCoffee, faFile, faLink, faPenNib, faT, faTag} from "@fortawesome/free-solid-svg-icons";
import {Wiki} from "../../models/wiki";
import {SERVICE_IDENTIFIERS} from "../app.module";
import {IWikiRepository} from "../../services/abstractions/i-wiki-repository";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../models/user";
import {IUserRepository} from "../../services/abstractions/i-user-repository";

@Component({
  selector: 'app-wiki-contributors',
  templateUrl: './wiki-contributors.component.html',
  styleUrl: './wiki-contributors.component.css'
})
export class WikiContributorsComponent implements OnInit {
  wikiId: number = 0;
  wiki?: Wiki;
  numberOfPages: number = 0;
  admins : User[] = [];

  constructor(@Inject(SERVICE_IDENTIFIERS.IWikiRepository) private readonly wikiRepository: IWikiRepository, @Inject(SERVICE_IDENTIFIERS.IUserRepository) private readonly userRepository : IUserRepository, activatedRoute: ActivatedRoute) {
    this.wikiId = parseInt(activatedRoute.snapshot.paramMap.get('id')!);
  }

  cards = [{
    title: 'Proofread this articles',
    tasks: ['Призыватель', 'Стрелок', 'Маг', 'Лесник', 'Грибник', 'Воин', 'Рыцарь', 'Рыбак'],
    icon: faT
  },
    {
      title: 'Add links',
      tasks: ['Призыватель', 'Стрелок', 'Маг', 'Лесник', 'Грибник', 'Воин', 'Рыцарь', 'Рыбак'],
      icon: faLink
    },
    {
      title: 'Add tags',
      tasks: ['Призыватель', 'Стрелок', 'Маг', 'Лесник', 'Грибник', 'Воин', 'Рыцарь', 'Рыбак'],
      icon: faTag
    },
    {
      title: 'Add sources',
      tasks: ['Призыватель', 'Стрелок', 'Маг', 'Лесник', 'Грибник', 'Воин', 'Рыцарь', 'Рыбак'],
      icon: faBook
    },
    {
      title: 'Expand this articles',
      tasks: ['Призыватель', 'Стрелок', 'Маг', 'Лесник', 'Грибник', 'Воин', 'Рыцарь', 'Рыбак'],
      icon: faPenNib
    },
    {
      title: 'Create a page',
      tasks: ['Призыватель', 'Стрелок', 'Маг', 'Лесник', 'Грибник', 'Воин', 'Рыцарь', 'Рыбак'],
      icon: faFile
    }];

  protected readonly faT = faT;

  async ngOnInit(): Promise<void> {
    this.wiki = await this.wikiRepository.getWiki(this.wikiId);
    //add fetching numberOfPages
    this.numberOfPages = 1735;

    const contributors = await this.wikiRepository.getWikiContributors(this.wikiId);
    contributors.forEach(contributor => {
      if (contributor.contributorRoleId === 1)
      {
        this.userRepository.getUser(contributor.userId).then(user => { this.admins.push(user) });
      }
    });
  }
}

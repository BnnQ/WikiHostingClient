import {Injectable} from "@angular/core";
import {IWikiRepository} from "./abstractions/i-wiki-repository";
import {Wiki} from "../models/wiki";
import { WikiUpsertDto } from "../models/dto/wiki-upsert-dto";
import { Contributor } from "../models/contributor";
import { ContributorUpsertDto } from "../models/dto/contributor-upsert-dto";

@Injectable({providedIn: 'root'})
export class StubWikiRepository implements IWikiRepository {
  private wikis: Wiki[] = [];
  private contributors: Contributor[] = [
    new Contributor(1, 1, 1,1),
    new Contributor(2, 1, 2,2),
    new Contributor(3, 2, 3,1),
  ];

  constructor() {
    this.wikis.push(new Wiki(1, 'First wiki', false, 83249));
    this.wikis.push(new Wiki(2, 'Second wiki', false, 25049));
    this.wikis.push(new Wiki(3, 'Third wiki', false, 5673));
  }

  getWikiContributor(wikiId: number, userId: number): Promise<Contributor | undefined> {
        return Promise.resolve(this.contributors.find(contributor => contributor.wikiId === wikiId && contributor.userId === userId));
    }

  getWikis(search?: string | undefined): Promise<Wiki[]> {
        return Promise.resolve(search ? this.wikis.filter(wiki => wiki.name.includes(search)) : this.wikis);
    }

    getWiki(id: number): Promise<Wiki | undefined> {
    return Promise.resolve(this.wikis.find(wiki => wiki.id === id));
    }
    updateWiki(id: number, model: WikiUpsertDto): Promise<Wiki> {
    const wiki = this.wikis.find(wiki => wiki.id === id);

    if (!wiki) {
        throw new Error('Wiki not found');
    }

    wiki.name = model.name;

    return Promise.resolve(wiki);
    }
    deleteWiki(id: number): Promise<void> {
    const wiki = this.wikis.find(wiki => wiki.id === id);

    if (!wiki) {
        throw new Error('Wiki not found');
    }

    this.wikis = this.wikis.filter(wiki => wiki.id !== id);

    return Promise.resolve();
    }

  getWikiContributors(wikiId: number, role? : string): Promise<Contributor[]> {
    return Promise.resolve(this.contributors.filter(contributor => contributor.wikiId === wikiId && (!role || contributor.contributorRoleId === 1)));
  }
  addWikiContributor(wikiId: number, userId: number, model: ContributorUpsertDto): Promise<void> {
    this.contributors.push(new Contributor(this.contributors.length + 1, wikiId, userId, model.contributorRoleId));
    return Promise.resolve();
  }
  removeWikiContributor(wikiId: number, userId: number): Promise<void> {
    this.contributors = this.contributors.filter(contributor => contributor.wikiId !== wikiId || contributor.userId !== userId);
    return Promise.resolve();
  }
  updateWikiContributor(wikiId: number, userId: number, model: ContributorUpsertDto): Promise<void> {
const contributor = this.contributors.find(contributor => contributor.wikiId === wikiId && contributor.userId === userId);

    if (!contributor) {
      throw new Error('Contributor not found');
    }

    contributor.contributorRoleId = model.contributorRoleId;

    return Promise.resolve();
  }
}

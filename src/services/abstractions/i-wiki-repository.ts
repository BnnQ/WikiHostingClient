import {Wiki} from "../../models/wiki";
import {WikiUpsertDto} from "../../models/dto/wiki-upsert-dto";
import {Contributor} from "../../models/contributor";
import {ContributorUpsertDto} from "../../models/dto/contributor-upsert-dto";

export interface IWikiRepository {
  getWikis(search? : string) : Promise<Wiki[]>;
  getWiki(id: number) : Promise<Wiki | undefined>;
  updateWiki(id: number, model: WikiUpsertDto) : Promise<Wiki>;
  deleteWiki(id: number): Promise<void>;

  getWikiContributors(wikiId: number, role?: string) : Promise<Contributor[]>;
  getWikiContributor(wikiId: number, userId: number) : Promise<Contributor | undefined>;
  addWikiContributor(wikiId: number, userId: number, model: ContributorUpsertDto) : Promise<void>;
  updateWikiContributor(wikiId: number, userId: number, model: ContributorUpsertDto) : Promise<void>;
  removeWikiContributor(wikiId: number, userId: number) : Promise<void>;
}

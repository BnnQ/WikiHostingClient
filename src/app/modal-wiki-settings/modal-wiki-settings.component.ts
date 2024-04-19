import {Component, Inject, OnInit} from '@angular/core';
import {Wiki} from "../../models/wiki";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {ModalService} from "ngx-modal-ease";
import {SERVICE_IDENTIFIERS} from "../app.module";
import {IWikiRepository} from "../../services/abstractions/i-wiki-repository";
import {IMediaRepository} from "../../services/abstractions/i-media-repository";
import {Link} from "../../models/link";
import {Contributor} from "../../models/contributor";
import {ContributorRole} from "../../models/contributor-role";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-modal-wiki-settings',
  templateUrl: './modal-wiki-settings.component.html',
  styleUrl: './modal-wiki-settings.component.css'
})
export class ModalWikiSettingsComponent implements OnInit {
  form: FormGroup;
  backgroundFile?: File;
  logoFile?: File;
  wikiId = 0;
  contributorRoles: ContributorRole[] = [];

  constructor(private readonly fb: FormBuilder, private readonly modalService : ModalService, @Inject(SERVICE_IDENTIFIERS.IWikiRepository) private readonly wikiRepository : IWikiRepository, @Inject(SERVICE_IDENTIFIERS.IMediaRepository) private readonly mediaRepository:  IMediaRepository) {
    this.form = this.fb.group({
      name: '',
      mainLinks: this.fb.array([]),
      contributors: this.fb.array([]),
    });
  }

  async ngOnInit() : Promise<void> {
    const data = this.modalService.options?.data;
    if (!data)
      return;

    const wikiId= this.wikiId = data['wikiId'] as number;
    const wiki = await this.wikiRepository.getWiki(wikiId);
    if (!wiki)
      return;

    this.form.patchValue({
      name: wiki.name
    });

    if (wiki.mainLinks && wiki.mainLinks.length > 0)
      wiki.mainLinks.forEach(link => this.addMainLink(link))

    if (wiki.contributors && wiki.contributors.length > 0)
      wiki.contributors.forEach(contributor => this.addContributor(contributor))

    this.contributorRoles = await this.wikiRepository.getContributorRoles();
  }

  get mainLinks(): FormArray {
    return this.form.get('mainLinks') as FormArray;
  }

  get contributors(): FormArray {
    return this.form.get('contributors') as FormArray;
  }

  addMainLink(link? : Link): void {
    this.mainLinks.push(this.createMainLink(link));
  }

  addContributor(contributor? : Contributor): void {
    this.contributors.push(this.createContributor(contributor));
  }

  createMainLink(link? : Link): FormGroup {
    return this.fb.group({
      url: link?.url ? link.url : '',
      title: link?.title ? link.title : ''
    });
  }

  createContributor(contributor? : Contributor): FormGroup {
    let controls;
    if (contributor) {
      controls = {
        userId: contributor.userId,
        userName: contributor.userName,
        contributorRoleId: contributor.contributorRoleId
      }
    }
    else {
      controls = {
        userId: '0',
        userName: '',
        contributorRoleId: '0'
      }
    }

    return this.fb.group(controls);
  }

  onBackgroundSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement.files && inputElement.files.length > 0) {
      this.backgroundFile = inputElement.files[0];
    }
  }

  onLogoSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement.files && inputElement.files.length > 0) {
      this.logoFile = inputElement.files[0];
    }
  }

  async onSubmit(): Promise<void> {
    let name = this.form.get('name')?.value;
    let backgroundPath : string | undefined;
    if (this.backgroundFile)
      backgroundPath = await this.mediaRepository.uploadImage(this.backgroundFile);

    let logoPath : string | undefined;
    if (this.logoFile)
      logoPath = await this.mediaRepository.uploadImage(this.logoFile);

    const mainLinks: Link[] = this.mainLinks.value;
    const contributors: Contributor[] = this.contributors.value;

    let wiki = new Wiki(0, name, false, 0, backgroundPath ?? '', logoPath ?? '', mainLinks, contributors,'');
    wiki = await this.wikiRepository.updateWiki(this.wikiId, wiki);

    this.modalService.close(wiki.id);
  }

  protected readonly faTrash = faTrash;
}

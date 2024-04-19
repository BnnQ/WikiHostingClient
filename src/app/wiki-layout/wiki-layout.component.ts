import {Component, Input, OnInit} from '@angular/core';
import {
  faEllipsisVertical,
  faGear,
  faHome,
  faUserGroup
} from "@fortawesome/free-solid-svg-icons";
import {Wiki} from "../../models/wiki";
import {DomSanitizer, SafeStyle} from "@angular/platform-browser";
import {ModalService} from "ngx-modal-ease";
import {ModalWikiSettingsComponent} from "../modal-wiki-settings/modal-wiki-settings.component";

@Component({
  selector: 'app-wiki-layout',
  templateUrl: './wiki-layout.component.html',
  styleUrl: './wiki-layout.component.css'
})
export class WikiLayoutComponent implements OnInit {
  @Input({required: true}) wiki : Wiki = null!;
  @Input({required: false}) currentPageId : number = 0;
  homePageLink?: string;
  contributorsPageLink?: string;

  constructor(private readonly sanitizer : DomSanitizer, private readonly modalService : ModalService) {
  }

  getBackgroundImage(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${this.wiki.backgroundImagePath})`);
  }

  ngOnInit() {
    this.homePageLink = `/wiki/${this.wiki.id}`;
    this.contributorsPageLink = `/wiki/${this.wiki.id}/contributors`;
  }

  openSettings() {
    this.modalService.open(ModalWikiSettingsComponent, { data: { wikiId: this.wiki.id } }).subscribe(data => window.location.reload());
  }

  protected readonly faEllipsisVertical = faEllipsisVertical;
  protected readonly faHome = faHome;
  protected readonly faGear = faGear;
  protected readonly faUserGroup = faUserGroup;
}

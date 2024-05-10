import {Component, Inject, Input, OnInit} from '@angular/core';
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
import {SERVICE_IDENTIFIERS} from "../app.module";
import {IPageRepository} from "../../services/abstractions/i-page-repository";
import {ModalReportComponent} from "../modal-report/modal-report.component";
import {ToastrService} from "ngx-toastr";

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

  constructor(private readonly sanitizer : DomSanitizer, private readonly modalService : ModalService, @Inject(SERVICE_IDENTIFIERS.IPageRepository) private readonly pageRepository : IPageRepository) {
  }

  getBackgroundImage(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(`linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${this.wiki.backgroundImagePath})`);
  }

  ngOnInit() {
    this.homePageLink = `/wiki/${this.wiki.id}`;
    this.contributorsPageLink = `/wiki/${this.wiki.id}/contributors`;
  }

  openSettings() {
    this.modalService.open(ModalWikiSettingsComponent, { data: { wikiId: this.wiki.id } }).subscribe(data => window.location.reload());
  }

  async copyLink() {
    const page = this.currentPageId !== 0 ? await this.pageRepository.getWikiPage(this.wiki.id, this.currentPageId) : await this.pageRepository.getMainWikiPage(this.wiki.id);
    const pageHtml = page.processedHtml;

    // Create a new DOMParser
    const parser = new DOMParser();

    // Use the DOMParser to parse the HTML string
    const document = parser.parseFromString(pageHtml, 'text/html');

    // Create a NodeIterator
    const iterator = document.createNodeIterator(document.body, NodeFilter.SHOW_TEXT);

    // Get the first non-empty text node
    let firstEntryText;
    let currentNode;
    while (currentNode = iterator.nextNode()) {
      if (currentNode.textContent!.trim() !== '') {
        firstEntryText = currentNode.textContent;
        break;
      }
    }

    if (firstEntryText) {
      const encodedWikiTitle = encodeURIComponent(this.wiki.name);
      const encodedPageTitle = encodeURIComponent(firstEntryText);
      await navigator.clipboard.writeText(`${window.location.origin}/wiki/${encodedWikiTitle}/${encodedPageTitle}`);
    }
  }

  protected readonly faEllipsisVertical = faEllipsisVertical;
  protected readonly faHome = faHome;
  protected readonly faGear = faGear;
  protected readonly faUserGroup = faUserGroup;
}

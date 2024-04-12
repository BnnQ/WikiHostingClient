import {Component, Input} from '@angular/core';
import {faChartLine, faEllipsisVertical, faSearch} from "@fortawesome/free-solid-svg-icons";
import {faComments, faSun} from "@fortawesome/free-regular-svg-icons";
import {Wiki} from "../../models/wiki";

@Component({
  selector: 'app-wiki-layout',
  templateUrl: './wiki-layout.component.html',
  styleUrl: './wiki-layout.component.css'
})
export class WikiLayoutComponent {
  @Input({required: true}) wiki : Wiki = null!;
  @Input({required: true}) numberOfPages : number = 0;

  protected readonly faEllipsisVertical = faEllipsisVertical;
  protected readonly faSearch = faSearch;
  protected readonly faComments = faComments;
  protected readonly faChartLine = faChartLine;
  protected readonly faSun = faSun;
}

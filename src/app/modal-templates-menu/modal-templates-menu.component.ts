import { Component } from '@angular/core';
import {ModalService} from "ngx-modal-ease";
import {Template} from "../../models/template";

@Component({
  selector: 'app-modal-templates-menu',
  templateUrl: './modal-templates-menu.component.html',
  styleUrl: './modal-templates-menu.component.css'
})
export class ModalTemplatesMenuComponent {
  templates: Template[] = [
    new Template(1, 'Template 1', 'https://dummyimage.com/300x300/ccc/000000.jpg'),
    new Template(2, 'Template 2', 'https://dummyimage.com/300x300/ccc/000000.jpg'),
    new Template(3, 'Template 3', 'https://dummyimage.com/300x300/ccc/000000.jpg'),
    new Template(4, 'Template 4', 'https://dummyimage.com/300x300/ccc/000000.jpg'),
    new Template(5, 'Template 5', 'https://dummyimage.com/300x300/ccc/000000.jpg'),
    new Template(6, 'Template 6', 'https://dummyimage.com/300x300/ccc/000000.jpg')
  ];

  constructor(protected modalService: ModalService) { }

  selectTemplate(template: Template) {
    this.modalService.close(template.id);
  }
}

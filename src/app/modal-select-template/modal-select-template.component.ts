import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

interface Template {
  id: number;
  name: string;
  authorId: number;
  author: string;
  html: string;
  css?: string;
  js?: string;
  variables?: string;
  isPublic: boolean;
}

@Component({
  selector: 'app-modal-select-template',
  templateUrl: './modal-select-template.component.html',
  styleUrls: ['./modal-select-template.component.css']
})
export class ModalSelectTemplateComponent implements OnInit {
  templates: Template[] = [];

  constructor(private http: HttpClient) {}

  getTemplates(searchTerm?: string) {
    let apiUrl = 'https://localhost:7133/Template';
    if (searchTerm) {
      const params = new HttpParams().set('search', searchTerm);
      apiUrl += `?${params.toString()}`;
    }
    return this.http.get<Template[]>(apiUrl);
  }

  ngOnInit(): void {
    this.getTemplates().subscribe(templates => {
      this.templates = templates;
    });
  }

  searchTemplates(event: any) {
    const searchTerm = event.target.value.trim(); 
    this.getTemplates(searchTerm).subscribe(templates => {
      this.templates = templates;
    });
  }

  @Output() closeModalEvent = new EventEmitter<boolean>();

  closeModal() {
    this.closeModalEvent.emit(true);
  }
}

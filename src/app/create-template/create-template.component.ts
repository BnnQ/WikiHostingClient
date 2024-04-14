import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

interface TemplateDto {
  name: string;
  authorId: number;
  html: string;
  css: string;
  js: string;
  variables: string;
  isPublic: boolean;
}

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.css']
})
export class CreateTemplateComponent {
  templateDto: TemplateDto = {
    name: '',
    authorId: 1,
    html: '',
    css: '',
    js: '',
    variables: '',
    isPublic: false
  };

  constructor(private http: HttpClient) { }

  onSubmit(): void {
    this.http.post<TemplateDto>('https://localhost:7133/Template', this.templateDto).subscribe(
      (template) => {
        console.log("success", template);
      },
      (error) => {
        console.error('Error', error)
      }
    )
  }
}

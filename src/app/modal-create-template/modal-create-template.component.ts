import {Component, Inject} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {Template} from "../../models/template";
import {SERVICE_IDENTIFIERS} from "../app.module";
import {ITemplateRepository} from "../../services/abstractions/i-template-repository";
import {IMediaRepository} from "../../services/abstractions/i-media-repository";
import {ModalService} from "ngx-modal-ease";

interface Variable {
  name: string;
  type: string;
  isRequired: boolean;
}

@Component({
  selector: 'app-modal-create-template',
  templateUrl: './modal-create-template.component.html',
  styleUrls: ['./modal-create-template.component.css']
})
export class ModalCreateTemplateComponent {
  form: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly modalService : ModalService, @Inject(SERVICE_IDENTIFIERS.ITemplateRepository) private readonly templateRepository : ITemplateRepository, @Inject(SERVICE_IDENTIFIERS.IMediaRepository) private readonly mediaRepository:  IMediaRepository) {
    this.form = this.fb.group({
      variables: this.fb.array([]),
      js: '',
      css: '',
      html: '',
      name: ''
    });
  }

  get variables(): FormArray {
    return this.form.get('variables') as FormArray;
  }

  addVariable(): void {
    this.variables.push(this.createVariable());
  }

  createVariable(): FormGroup {
    return this.fb.group({
      name: '',
      type: '',
      isRequired: false
    });
  }

  // onImageSelected(event: Event) {
  //   const inputElement = event.target as HTMLInputElement;
  //
  //   if (inputElement.files && inputElement.files.length > 0) {
  //     this.imageFile = inputElement.files[0];
  //   }
  // }

  async onSubmit(): Promise<void> {
    const jsValue = this.form.get('js')?.value;
    const cssValue = this.form.get('css')?.value;
    const htmlValue = this.form.get('html')?.value;
    const name = this.form.get('name')?.value;

    const variables: Variable[] = this.variables.value;
    let variableString = '';

    if (variables.length > 0)
    {
      for (const variable of variables) {
        const { name, type, isRequired } = variable;
        const requirement = isRequired ? 'r' : 'o';
        variableString += `${name}:${type}:${requirement};`;
      }

      // Remove the trailing semicolon
      variableString = variableString.slice(0, -1);
    }

    let template = new Template(0, name, 0, htmlValue, true, cssValue === '' ? undefined : cssValue, jsValue === '' ? undefined : jsValue, variableString === '' ? undefined : variableString);
    template = await this.templateRepository.createTemplate(template);

    this.modalService.close(template.id);
  }
}

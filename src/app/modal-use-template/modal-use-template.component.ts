import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {Template} from "../../models/template";
import {ModalService} from "ngx-modal-ease";
import {SERVICE_IDENTIFIERS} from "../app.module";
import {ITemplateRepository} from "../../services/abstractions/i-template-repository";

interface Variable {
  name: string;
  type: string;
  isRequired: boolean;
  value: any;
}

@Component({
  selector: 'app-modal-use-template',
  templateUrl: './modal-use-template.component.html',
  styleUrl: './modal-use-template.component.css'
})
export class ModalUseTemplateComponent implements OnInit {
  form: FormGroup;
  template: Template = undefined!;

  constructor(private readonly fb: FormBuilder, private readonly modalService : ModalService, @Inject(SERVICE_IDENTIFIERS.ITemplateRepository) private readonly templateRepository : ITemplateRepository) {
    this.form = this.fb.group({
      variables: this.fb.array([])
    });
  }

  async ngOnInit(): Promise<void> {
    const data = this.modalService.options?.data;
    if (!data)
      return;

    const templateId = data['templateId'] as number;
    this.template = await this.templateRepository.getTemplate(templateId);

    if (!this.template.variables || this.template.variables.length === 0) {
      console.log('There is no variables in the template')
      this.modalService.close(this.template.html);
    }

    this.createForm();
  }

  get variables(): FormArray {
    return this.form.get('variables') as FormArray;
  }

  createForm(): void {
    if (!this.template.variables || this.template.variables.length === 0)
      return;

    const variables = this.template.variables.split(';');
    variables.forEach(variable => {
      const [name, type, isRequired] = variable.split(':');
      this.variables.push(this.createVariable(name, type, isRequired === 'r'));
    });
  }

  createVariable(name: string, type: string, isRequired: boolean): FormGroup {
    const group = this.fb.group({
      name: [name],
      type: [type],
      value: [''],
      isRequired: [isRequired]
    });

    group.get('isRequired')?.disable();
    return group;
  }

  onSubmit(): void {
    const variables: Variable[] = this.variables.value;
    console.log('variables: ', variables);

    let html = this.template.html;

    let js = this.template.js;
    if (variables.length > 0) {
      if (js) {
        variables.forEach(variable => {
          js = `let ${variable.name} = ${JSON.stringify(variable.value)};\n` + js;
        });
        js += 'return {' + variables.map(variable => `${variable.name}: ${variable.name}`).join(', ') + '};';

        const fn = new Function(js);
        const result = fn();

        variables.forEach(variable => {
          html = html.replace(new RegExp(`{${variable.name}}`, 'g'), result[variable.name]);
        });
      } else {
        variables.forEach(variable => {
          html = html.replace(new RegExp(`{${variable.name}}`, 'g'), variable.value);
        });
      }
    }

    this.modalService.close(html);

    // this.editable.nativeElement.innerHTML = html;
  }
}

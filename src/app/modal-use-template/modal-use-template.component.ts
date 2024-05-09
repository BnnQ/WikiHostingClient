import {Component, Inject, OnInit} from '@angular/core';
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
      this.onSubmit();
      return;
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
    let css = this.template.css;

    if (variables.length > 0) {
      html = this.processVariables(variables, html, this.template.js);
    }

    if (css) {
      html = this.processCss(css, html);
    }

    this.modalService.close(html);
  }

  processVariables(variables: Variable[], html: string, js?: string): string {
    if (js) {
      js = this.addVariablesToJs(variables, js);
      const result = this.executeJs(js);
      html = this.replaceHtmlVariables(variables, html, result);
    } else {
      html = this.replaceHtmlVariables(variables, html);
    }
    return html;
  }

  addVariablesToJs(variables: Variable[], js: string): string {
    variables.forEach(variable => {
      js = `let ${variable.name} = ${variable.type === 'string' ? '"' : ''}${variable.value}${variable.type === 'string' ? '"' : ''};\n` + js;
    });
    js += '\nreturn {' + variables.map(variable => `${variable.name}: ${variable.name}`).join(', ') + '};';
    console.log(js);
    return js;
  }

  executeJs(js: string): any {
    const fn = new Function(js);
    return fn();
  }

  replaceHtmlVariables(variables: Variable[], html: string, result?: any): string {
    variables.forEach(variable => {
      const value = result ? result[variable.name] : variable.value;
      html = html.replace(new RegExp(`{${variable.name}}`, 'g'), value);
    });
    return html;
  }

  processCss(css: string, html: string): string {
    const parser = new DOMParser();
    let doc = parser.parseFromString(html, 'text/html');

    let cssRules = css.match(/[^{]+\{[^}]*}/g);

    if (cssRules) {
      let modifiedCssRules: string[] = this.modifyCssRules(cssRules);
      console.log('modifying css rules', modifiedCssRules);
      doc = this.modifyHtmlClasses(doc);
      doc = this.applyCssRules(modifiedCssRules, doc);
      html = new XMLSerializer().serializeToString(doc);
    }

    return html;
  }

  modifyCssRules(cssRules: string[]): string[] {
    let modifiedCssRules: string[] = [];
    cssRules.forEach(rule => {
      let match = rule.match(/([^{}]+)\{([^{}]+)}/)!;
      let selector = match[1].trim();
      let styles = match[2].trim();

      if (selector.startsWith('.')) {
        const modifiedSelector = selector.replace('.', `.${this.template.name}-`);
        modifiedCssRules.push(`${modifiedSelector} { ${styles} }`);
      }
    });
    return modifiedCssRules;
  }

  modifyHtmlClasses(doc: Document): Document {
    const htmlDoc = doc.cloneNode(true) as Document;
    const elements = htmlDoc.querySelectorAll('[class]');
    elements.forEach((el: Element) => {
      const htmlEl = el as HTMLElement;
      const classes = htmlEl.className.split(' ');
      const modifiedClasses = classes.map(className => `${this.template.name}-${className}`);
      htmlEl.className = modifiedClasses.join(' ');
    });
    return htmlDoc;
  }

  applyCssRules(modifiedCssRules: string[], doc: Document): Document {
    modifiedCssRules.forEach(rule => {
      let match = rule.match(/([^{}]+)\{([^{}]+)}/)!;
      let selector = match[1].trim();
      let styles = match[2].trim();

      const elements = doc.querySelectorAll(selector);
      elements.forEach((el: Element) => {
        const htmlEl = el as HTMLElement;
        htmlEl.style.cssText += styles;
      });
    });
    return doc;
  }

}

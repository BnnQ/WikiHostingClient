import { HttpClient, HttpParams } from '@angular/common/http';
import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ModalService} from "ngx-modal-ease";
import {SERVICE_IDENTIFIERS} from "../app.module";
import {ITemplateRepository} from "../../services/abstractions/i-template-repository";
import {debounceTime, distinctUntilChanged} from "rxjs";
import {TemplateDto} from "../../models/dto/template-dto";

@Component({
  selector: 'app-modal-select-template',
  templateUrl: './modal-select-template.component.html',
  styleUrls: ['./modal-select-template.component.css']
})
export class ModalSelectTemplateComponent implements OnInit {
  searchControl = new FormControl();
  templates: TemplateDto[] = [];

  constructor(protected modalService: ModalService, @Inject(SERVICE_IDENTIFIERS.ITemplateRepository) private readonly templateRepository : ITemplateRepository) {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(async (value) => {
        if (!value || value.length < 3) return;

        this.templates = await this.templateRepository.getTemplates(value);
      })
  }

  async ngOnInit(): Promise<void> {
    this.templates = await this.templateRepository.getTemplates('Bar');
  }

}

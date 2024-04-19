import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {
  faBold, faDroplet, faEraser, faImage,
  faItalic, faLink, faListOl,
  faListUl, faPuzzlePiece, faQuoteRight,
  faRedo,
  faStrikethrough,
  faUnderline,
  faUndo
} from "@fortawesome/free-solid-svg-icons";
import {ModalService} from "ngx-modal-ease";
import {IMediaRepository} from "../../services/abstractions/i-media-repository";
import {SERVICE_IDENTIFIERS} from "../app.module";
import {ModalSelectTemplateComponent} from "../modal-select-template/modal-select-template.component";
import {ModalCreateTemplateComponent} from "../modal-create-template/modal-create-template.component";
import {ModalUseTemplateComponent} from "../modal-use-template/modal-use-template.component";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.css'
})
export class TextEditorComponent implements OnInit {
  @ViewChild('editable', {static: false}) editable!: ElementRef;
  @Input() initialEditorContent: string = '';
  @Output() contentResult = new EventEmitter<string>();
  initialEditorHtml? : SafeHtml;

  constructor(private readonly modalService: ModalService, private readonly sanitizer : DomSanitizer, private readonly cdr : ChangeDetectorRef, @Inject(SERVICE_IDENTIFIERS.IMediaRepository) private readonly mediaRepository: IMediaRepository) {
  }

  async fakeDelay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async ngOnInit() {
    while (!this.initialEditorContent) {
      await this.fakeDelay(100);
    }

    if (this.initialEditorContent === '')
      this.initialEditorHtml = this.sanitizer.bypassSecurityTrustHtml('<div><span style="color: white">Your page starts here...</span></div>');
    else
      this.initialEditorHtml = this.sanitizer.bypassSecurityTrustHtml(this.initialEditorContent);
  }

  getInitialEditorContent() {
    if (!this.initialEditorContent || this.initialEditorContent === '')
      return '<div>Your page starts here...</div>';
    else
      return this.sanitizer.bypassSecurityTrustHtml(this.initialEditorContent);
  }

  cancel() {
    this.contentResult.emit();
    console.log(this.initialEditorContent);
  }

  save() {
    this.contentResult.emit(this.editable.nativeElement.innerHTML);
  }

  formatText(tagName: string) {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount || !selection.toString().trim()) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    const parentElement = range.commonAncestorContainer.parentElement;

    if (parentElement && parentElement.textContent) {
      if (parentElement.nodeName === tagName.toUpperCase()) {
        const normalText = document.createTextNode(selectedText);
        range.deleteContents();
        range.insertNode(normalText);

        if (parentElement.textContent === selectedText) {
          parentElement.replaceWith(normalText);
        } else {
          const remainingTextStart = document.createElement(tagName);
          const remainingTextEnd = document.createElement(tagName);
          remainingTextStart.textContent = parentElement.textContent.substring(0, parentElement.textContent.indexOf(selectedText)).trim();
          remainingTextEnd.textContent = parentElement.textContent.substring(parentElement.textContent.indexOf(selectedText) + selectedText.length).trim();

          if (remainingTextStart.textContent) {
            parentElement.replaceWith(remainingTextStart, normalText);
          }
          if (remainingTextEnd.textContent) {
            parentElement.appendChild(remainingTextEnd);
          }
        }
      } else {
        const formattedText = document.createElement(tagName);
        formattedText.textContent = selectedText;
        range.deleteContents();
        range.insertNode(formattedText);
      }
    }

    this.cleanEmptyTags(tagName);
    selection.removeAllRanges();
  }

  cleanEmptyTags(tagName: string) {
    const editableDiv = this.editable.nativeElement;
    const tags = editableDiv.getElementsByTagName(tagName);

    for (let i = 0; i < tags.length; i++) {
      if (!tags[i].textContent.trim()) {
        tags[i].parentNode.removeChild(tags[i]);
      }
    }
  }

  bold() {
    this.formatText('b');
  }

  italic() {
    this.formatText('i');
  }

  underline() {
    this.formatText('u');
  }

  strikethrough() {
    this.formatText('del');
  }

  link() {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount || !selection.toString().trim()) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();

    const anchor = document.createElement('a');
    anchor.textContent = selectedText;
    anchor.href = selectedText;

    range.deleteContents();
    range.insertNode(anchor);

    this.cleanEmptyTags('a');
    selection.removeAllRanges();
  }

  async image() {
    // Create a hidden file input element
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.style.display = 'none';

    // Add an event listener to handle the file selection
    fileInput.addEventListener('change', async (_) => {
      if (fileInput.files === null || fileInput.files.length === 0)
        return;

      const file = fileInput.files[0];
      if (!file) {
        return;
      }

      try {
        const image = await this.mediaRepository.uploadImage(file);
        const img = document.createElement('img');
        img.src = image;
        this.editable.nativeElement.appendChild(img);
      } catch (error) {
        console.error('Error while saving image:', error);
      }
    });

    // Append the file input element to the body (required for the click event to work properly)
    document.body.appendChild(fileInput);

    // Programmatically trigger a click event on the file input element
    fileInput.click();

    // Remove the file input element from the body after use
    document.body.removeChild(fileInput);
  }

  quote() {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount || !selection.toString().trim()) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();

    const quoteElement = document.createElement('div');
    quoteElement.className = 'quote';
    quoteElement.textContent = selectedText;
    quoteElement.setAttribute('contenteditable', 'true');
    quoteElement.setAttribute('data-nickname', 'nickname');

    const newRange = document.createRange();
    newRange.setStartBefore(range.startContainer);
    newRange.setEndAfter(range.endContainer);
    newRange.deleteContents();
    newRange.insertNode(quoteElement);

    selection.removeAllRanges();
  }

  // showNotifications() {
  //   let notifications = JSON.parse(localStorage.getItem('notifications') ?? 'null') || [];
  //   console.log('notifications', notifications);
  // }

  color() {
    // Create a hidden color input element
    const colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.style.display = 'none';

    // Add an event listener to handle the color selection
    colorInput.addEventListener('change', (_) => {
      const selection = window.getSelection();
      if (!selection || !selection.rangeCount || !selection.toString().trim()) return;

      const range = selection.getRangeAt(0);
      const selectedText = range.toString();
      let parentElement: HTMLElement | null = range.commonAncestorContainer.parentElement;
      const editableDiv = this.editable.nativeElement;

      if (parentElement && parentElement.textContent && parentElement !== editableDiv) {
        if (parentElement.nodeName === 'SPAN') {
          // If the selected text is already wrapped in a span, just change its color
          parentElement.style.color = colorInput.value;
        } else {
          // If the selected text is not wrapped in a span, create a new span and apply the color
          const span = document.createElement('span');
          span.textContent = selectedText;
          span.style.color = colorInput.value;

          range.deleteContents();
          range.insertNode(span);
        }
      }

      selection.removeAllRanges();

      // Remove the color input element from the body after use
      document.body.removeChild(colorInput);
    });

    // Append the color input element to the body (required for the click event to work properly)
    document.body.appendChild(colorInput);

    // Programmatically trigger a click event on the color input element
    colorInput.click();
  }

  erase() {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount || !selection.toString().trim()) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    let parentElement: HTMLElement | null = range.commonAncestorContainer.parentElement;
    const editableDiv = this.editable.nativeElement;

    if (parentElement && parentElement.textContent && parentElement !== editableDiv) {
      const normalText = document.createTextNode(selectedText);
      range.deleteContents();
      range.insertNode(normalText);

      // Loop to remove all formatting tags
      while (parentElement && parentElement !== editableDiv && ['B', 'I', 'U', 'DEL', 'SPAN'].includes(parentElement.nodeName)) {
        const grandParentElement: HTMLElement | null = parentElement.parentElement;
        if (!grandParentElement) break;

        const remainingTextStart = document.createTextNode(parentElement.textContent?.substring(0, parentElement.textContent.indexOf(selectedText)).trim() || '');
        const remainingTextEnd = document.createTextNode(parentElement.textContent?.substring(parentElement.textContent.indexOf(selectedText) + selectedText.length).trim() || '');

        if (remainingTextStart.textContent) {
          grandParentElement.insertBefore(remainingTextStart, parentElement);
        }
        if (remainingTextEnd.textContent) {
          grandParentElement.insertBefore(remainingTextEnd, parentElement.nextSibling);
        }

        grandParentElement.replaceChild(normalText, parentElement);
        parentElement = grandParentElement;
      }
    }
  }

  openTemplateMenu() {
    this.modalService.open(ModalSelectTemplateComponent).subscribe(templateData => {
      if (!templateData) {
        return;
      }

      if (templateData === "create") {
        this.modalService.open(ModalCreateTemplateComponent).subscribe(createdTemplateId => {
          if (createdTemplateId) {
            this.openModalAndHandleData(ModalUseTemplateComponent, createdTemplateId);
          }
        });
      } else {
        this.openModalAndHandleData(ModalUseTemplateComponent, templateData);
      }
    });
  }

  openModalAndHandleData(modalComponent: any, templateId: any) {
    this.modalService.open(modalComponent, {data: {templateId: templateId}}).subscribe(html => {
      if (html) {
        this.appendHtmlToElement(html);
      }
    });
  }

  appendHtmlToElement(html: string) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    this.editable.nativeElement.appendChild(wrapper);
  }


  protected readonly faBold = faBold;
  protected readonly faItalic = faItalic;
  protected readonly faUnderline = faUnderline;
  protected readonly faStrikethrough = faStrikethrough;
  protected readonly faQuoteRight = faQuoteRight;
  protected readonly faLink = faLink;
  protected readonly faImage = faImage;
  protected readonly faPuzzlePiece = faPuzzlePiece;
  protected readonly faEraser = faEraser;

  protected readonly faDroplet = faDroplet;
}

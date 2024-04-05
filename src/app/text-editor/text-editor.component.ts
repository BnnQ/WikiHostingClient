import {Component, ElementRef, ViewChild} from '@angular/core';
import {
  faBold, faEraser, faImage,
  faItalic, faLink, faListOl,
  faListUl, faPuzzlePiece, faQuoteRight,
  faRedo,
  faStrikethrough,
  faUnderline,
  faUndo
} from "@fortawesome/free-solid-svg-icons";
import {ModalService} from "ngx-modal-ease";
import {ModalTemplatesMenuComponent} from "../modal-templates-menu/modal-templates-menu.component";

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.css'
})
export class TextEditorComponent {
  @ViewChild('editable', { static: true }) editable!: ElementRef;

  constructor(private readonly modalService: ModalService) {
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
      while (parentElement && parentElement !== editableDiv && ['B', 'I', 'U', 'DEL'].includes(parentElement.nodeName)) {
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

  openTemplateMenu()
  {
    this.modalService.open(ModalTemplatesMenuComponent).subscribe(data => {
      console.log('data', data);
    });
  }



  protected readonly faBold = faBold;
  protected readonly faItalic = faItalic;
  protected readonly faUnderline = faUnderline;
  protected readonly faUndo = faUndo;
  protected readonly faRedo = faRedo;
  protected readonly faStrikethrough = faStrikethrough;
  protected readonly faListUl = faListUl;
  protected readonly faListOl = faListOl;
  protected readonly faQuoteRight = faQuoteRight;
  protected readonly faLink = faLink;
  protected readonly faImage = faImage;
  protected readonly faPuzzlePiece = faPuzzlePiece;
  protected readonly faEraser = faEraser;
}

import {Component, Inject, Input, OnInit} from '@angular/core';
import {Comment} from "../../models/comment";
import {ICommentRepository} from "../../services/abstractions/i-comment-repository";
import {SERVICE_IDENTIFIERS} from "../app.module";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent implements OnInit {
  @Input({required: true}) pageId?: number;
  comments : Comment[] = [];
  newCommentText : string = '';

  constructor(@Inject(SERVICE_IDENTIFIERS.ICommentRepository) private readonly commentRepository: ICommentRepository) {

  }

  async fakeDelay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async ngOnInit(): Promise<void> {
    while (!this.pageId) {
      await this.fakeDelay(100);
    }

    this.comments = await this.commentRepository.getPageComments(this.pageId);
    }

    async addComment() {
    if (!this.newCommentText || this.newCommentText.length <= 0 || !this.pageId)
      return;

      let newComment = new Comment(0, this.pageId, 0, this.newCommentText);
      newComment = await this.commentRepository.addComment(this.pageId, newComment);
      this.comments.push(newComment);
    }

}

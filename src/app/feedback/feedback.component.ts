import {Component, Inject} from '@angular/core';
import {SERVICE_IDENTIFIERS} from "../app.module";
import {IFeedbackRepository} from "../../services/abstractions/i-feedback-repository";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {
  feedback: string = '';

  constructor(@Inject(SERVICE_IDENTIFIERS.IFeedbackRepository) private readonly feedbackRepository : IFeedbackRepository, private readonly toastService : ToastrService) {

  }

  async submitFeedback() : Promise<void> {
    await this.feedbackRepository.saveFeedback(this.feedback);
    this.feedback = '';

    this.toastService.success('Thank you for your feedback!', 'Feedback successfully submitted');
  }
}

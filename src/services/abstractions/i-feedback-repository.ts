import {Feedback} from "../../models/feedback";

export interface IFeedbackRepository {
  saveFeedback(feedbackText: string): Promise<void>;
  getFeedbacks(): Promise<Feedback[]>;
  getFeedback(id: number): Promise<Feedback>;
}

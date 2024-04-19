import {Topic} from "../../models/topic";

export interface ITopicRepository {
  getTopics(): Promise<Topic[]>;
  createTopic(topic: string): Promise<Topic>;
}

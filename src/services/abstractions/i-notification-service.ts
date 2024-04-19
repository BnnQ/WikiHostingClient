export interface INotificationService {
  getSelfConnectionId(): Promise<string>;
  on(methodName: string, handler: (...args: any[]) => any): Promise<void>;
}

export type NotificationType = 'success' | 'failure' | 'info'

export class Notification {
  constructor(
    public readonly title: string,
    public readonly message: string,
    public readonly type: NotificationType = 'info',
    public readonly duration: number = 5000,
  ) {}
}

import { NotificationType } from 'common/enums/enums';
import { toast } from 'react-toastify';

const DEFAULT_MESSAGE = 'Unexpected error';

class Notification {

  public error(message = DEFAULT_MESSAGE): void {
    this.showNotification(message, NotificationType.ERROR)
  };
  
  public success(message = DEFAULT_MESSAGE): void {
    this.showNotification(message, NotificationType.SUCCESS)
  };

  public warn(message = DEFAULT_MESSAGE): void {
    this.showNotification(message, NotificationType.WARN)
  };

  public info(message = DEFAULT_MESSAGE): void {
    this.showNotification(message, NotificationType.INFO)
  };

  private showNotification (message: string , type: NotificationType) {
    toast[type](message);
  };

}

export { Notification };
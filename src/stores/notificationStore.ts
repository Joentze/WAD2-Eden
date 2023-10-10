import { ref, computed } from "vue";
import { defineStore } from "pinia";

const NOTIFICATION_DELAY = 3000;
const MAX_STACK_LENGTH = 5;

export enum NotificationType {
  ERROR = "ERROR",
  WARNING = "WARNING",
  SUCCESS = "SUCCESS",
  NORMAL = "NORMAL",
}

interface INotification {
  title: string;
  description: string;
  type: NotificationType;
}

export const useNotification = defineStore("notification", {
  state: () => {
    return {
      display: false,
      content: [] as INotification[],
    };
  },
  actions: {
    add(newNotification: INotification) {
      clearTimeout(
        setTimeout(() => (this.display = false), NOTIFICATION_DELAY)
      );
      if (this.content.length >= MAX_STACK_LENGTH) {
        this.content.pop(0);
      }
      this.display = true;
      this.content.push(newNotification);
      setTimeout(() => (this.display = false), NOTIFICATION_DELAY);
    },
    remove(notificationIndex: number) {
      this.content.splice(notificationIndex, 1);
    },
  },
});

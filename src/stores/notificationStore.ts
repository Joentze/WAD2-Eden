import { ref, computed } from "vue";
import { defineStore } from "pinia";

const NOTIFICATION_DELAY = 2000;

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
      content: [
        { title: "hello world", description: "hi there", type: "SUCCESS" },
      ] as INotification[],
    };
  },
  actions: {
    add(newNotification: INotification) {
      this.display = true;
      this.content.push(newNotification);
      setTimeout(() => (this.display = false), NOTIFICATION_DELAY);
    },
    remove(notificationIndex: number) {
      this.content.splice(notificationIndex, 1);
    },
  },
});

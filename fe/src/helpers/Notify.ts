import { notification } from "antd";

export const Notify = {
  success: (title: string = 'Success', message: string) => {
    notification['success']({
      message: title,
      description: message,
    });
  },

  info: (title: string = 'Info', message: string) => {
    notification['info']({
      message: title,
      description: message,
    });
  },

  warning: (title: string = 'Warning', message: string) => {
    notification['warning']({
      message: title,
      description: message,
    });
  },

  error: (title: string = 'Error', message: string) => {
    notification['error']({
      message: title,
      description: message,
    });
  }
};
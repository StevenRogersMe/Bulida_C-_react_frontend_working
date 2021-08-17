import { toast, Bounce } from 'react-toastify';
import { NOTIFICATION_VARIANT, TIMEOUTS } from 'src/utils/consts';
import { MIToastMessage } from 'src/components/common/MIToastMessage';

// Using react-tostify. Docs: https://fkhadra.github.io/react-toastify/
export const pushNotification = (item: {
  type: string;
  msg: string;
  autoClose?: number | false;
}) => {
  const { type, msg, autoClose = TIMEOUTS.CLOSE_NOTIFICATION } = item;
  let toastId: number | string;

  const toastSettings = {
    position: toast.POSITION.TOP_CENTER,
    hideProgressBar: true,
    autoClose,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    transition: Bounce,
  };

  switch (type) {
    case NOTIFICATION_VARIANT.SUCCESS:
      toastId = toast.success(
        <MIToastMessage type={NOTIFICATION_VARIANT.SUCCESS} text={msg} />,
        toastSettings
      );
      break;
    case NOTIFICATION_VARIANT.INFO:
      toastId = toast.info(
        <MIToastMessage type={NOTIFICATION_VARIANT.INFO} text={msg} />,
        toastSettings
      );
      break;
    case NOTIFICATION_VARIANT.ERROR:
      toastId = toast.error(
        <MIToastMessage type={NOTIFICATION_VARIANT.ERROR} text={msg} />,
        toastSettings
      );
      break;
    default:
      toastId = 0;
      break;
  }

  return toastId;
};

export function dismissNotification() {
  toast.dismiss();
}

export function notifySuccess(notification: { msg: string }) {
  const { msg } = notification;
  pushNotification({
    type: NOTIFICATION_VARIANT.SUCCESS,
    msg,
  });
}

export function notifyInfo(notification: { msg: string }) {
  const { msg } = notification;
  pushNotification({
    type: NOTIFICATION_VARIANT.INFO,
    msg,
  });
}

export function notifyError(notification: { msg: string }) {
  const { msg } = notification;

  pushNotification({
    type: NOTIFICATION_VARIANT.ERROR,
    msg: `${msg}. Our team was notified and we are working as quickly as we can to fix this.`,
  });
}

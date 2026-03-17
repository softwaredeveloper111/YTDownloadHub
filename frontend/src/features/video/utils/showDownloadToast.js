import { toast } from "react-toastify";

export const showDownloadToast = () => {
  let time = 60;

  const toastId = toast.info(`Preparing download... ${time}s`, {
    autoClose: false
  });

  const interval = setInterval(() => {
    time--;

    toast.update(toastId, {
      render: `download will start sortly in ${time}s`
    });

    if (time <= 0) {
      clearInterval(interval);
      toast.dismiss(toastId);
    }
  }, 1000);

  return { toastId, interval };
};
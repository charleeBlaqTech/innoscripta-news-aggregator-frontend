import { useState, useCallback } from "react";

export const useToast = () => {
  const [message, setMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setMessage(msg);
  }, []);

  const closeToast = ()=> {
    setMessage(null);
  };


  return {
    showToast,
    closeToast,
    message
  };
};

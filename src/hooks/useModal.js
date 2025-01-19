import { useState } from "react";

const useModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState(null);

  const openModal = (modalContent = null) => {
    setContent(modalContent);
    setIsVisible(true);
  };

  const closeModal = () => {
    setContent(null);
    setIsVisible(false);
  };

  return {
    isVisible,
    content,
    openModal,
    closeModal,
  };
};

export default useModal;

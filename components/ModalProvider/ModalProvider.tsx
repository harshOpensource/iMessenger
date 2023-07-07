import React, { useState } from "react";

export interface IModalContext {
  modalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const ModalContext = React.createContext<any>({});

interface ConversationProps {
  children: React.ReactNode;
}

const ConversationModalProvider = ({ children }: ConversationProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const value: IModalContext = {
    modalOpen,
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export default ConversationModalProvider;

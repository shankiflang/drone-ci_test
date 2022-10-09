import React, { createContext, useContext } from "react";
import useModalBuilder from "components/hooks/useModalBuilder";
import Modal from "components/ui/global/Modal";



interface ModalProps {
    modal: boolean;
    handleModal: (content?: any, className?: string) => void;
    modalContent: React.ReactNode;
    modalClassName: string;
}


const Context = createContext<ModalProps>({
    modal: false,
    handleModal: () => {},
    modalContent: <></>,
    modalClassName: ""
});


interface Props {
    children: React.ReactNode;
}


let ModalProvider = ({ children }: Props) => {
    let { modal, handleModal, modalContent, modalClassName } = useModalBuilder();

    return (
        <Context.Provider value={{ modal, handleModal, modalContent, modalClassName }}>
            <Modal />
            {children}
        </Context.Provider>
    );
};


export const useModal = () => useContext(Context);

export default ModalProvider
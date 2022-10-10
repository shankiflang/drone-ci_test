import React from "react";

const useModalBuilder = () => {
	let [modal, setModal] = React.useState(false);
	let [modalContent, setModalContent] = React.useState(null);
	let [modalClassName, setModalClassName] = React.useState("");

	let handleModal = (content?:any, className?:string) => {
		if (!modal === false && !content) {
			document.body.style.overflowY = "auto";
			setModalContent(null);
			setModalClassName("");
			return setModal(false);
		}
		setModal(true);
		if (content) {
			document.body.style.overflowY = "hidden";
			setModalContent(content);
		}
		if (className) {
			setModalClassName(className);
		}
	};

	return {
		modal,
		handleModal,
		modalContent,
		modalClassName,
	};
};

export default useModalBuilder;
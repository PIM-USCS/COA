import "./styles.css";
import { X } from "phosphor-react";

interface Modal {
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  arquivo: File | undefined;
}

export function ModalImagem({ isOpenModal, setIsOpenModal, arquivo }: Modal) {
  function closeModal() {
    setIsOpenModal(false);
  }
  return (
    <main
      className="main-modal-imagem"
      style={{ display: isOpenModal ? "flex" : "none" }}>
      <div className="div-modal-imagem">
        <button onClick={closeModal}>
          <X size={32} />
        </button>
        <img
          src={`http://localhost:3333/uploads/${arquivo}`}
          alt="Foto recibo"
        />
      </div>
    </main>
  );
}

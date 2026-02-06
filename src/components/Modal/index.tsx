import ReactDOM from "react-dom";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  header: string;
  children: React.ReactNode;
};

const Modal = ({
  isOpen,
  onClose,
  header,
  children,
}: ModalProps) => {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-10">
        <div className="relative rounded-lg bg-[var(--body-bg-color)] w-[512px] p-5 z-20 mx-4">
          <div className="mb-5 text-base">{header}</div>
          {children}
        </div>
      </div>
    </>,
    document.body
  );
};

export default Modal;

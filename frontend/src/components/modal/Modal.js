import Overlay from "../overlay/Overlay";

const Modal = ({ isOpen, closeModal, children }) => {
  return (
    <Overlay isOpen={isOpen} closeModal={closeModal}>
      <div
        className={`
          relative 
          md:w-4/6
          lg:w-3/6
          xl:w-2/6
          my-6
          mx-auto 
          h-full
          max-h-[600px] 
          overflow-y-auto
          lg:h-auto
          md:h-auto
          p-8
          bg-white
          rounded-lg
          `}
      >
        <button
          className="close-button absolute right-8 top-8"
          onClick={closeModal}
        >
          &#10005;
        </button>
        <div
          className={`
            translate
            duration-300
            h-full
            
          `}
        >
          {children}
        </div>
      </div>
    </Overlay>
  );
};

export default Modal;

const Overlay = ({ isOpen, isClose, children }) => {
  return (
    <div
      className={`justify-center 
    items-center 
    flex 
    overflow-x-hidden 
    overflow-y-auto 
    fixed 
    inset-0 
    z-50 
    outline-none 
    focus:outline-none
    bg-neutral-800/70
    `}
    >
      {children}
    </div>
  );
};

export default Overlay;

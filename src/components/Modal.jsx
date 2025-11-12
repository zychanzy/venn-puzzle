const Modal = ({ isOpen, onClose, isSuccess, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8 relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-light leading-none"
          aria-label="Close"
        >
          ×
        </button>

        <div className="text-center">
          <div className={`text-6xl mb-4 ${isSuccess ? "animate-bounce" : ""}`}>
            {isSuccess ? "🎉" : "🤔"}
          </div>

          <h2
            className={`text-2xl font-light mb-4 ${
              isSuccess ? "text-green-600" : "text-gray-700"
            }`}
          >
            {isSuccess ? "Congratulations!" : "Not Quite"}
          </h2>

          <p className="text-gray-600 font-light mb-6">{message}</p>

          <button
            onClick={onClose}
            className={`px-8 py-3 rounded-sm font-normal transition-all uppercase tracking-wide ${
              isSuccess
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-600 text-white hover:bg-gray-700"
            }`}
          >
            {isSuccess ? "Celebrate!" : "Keep Trying"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

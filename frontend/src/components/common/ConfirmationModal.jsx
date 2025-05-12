import React from "react";

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded p-6 shadow-lg max-w-sm w-full">
        <p className="text-gray-800 mb-4">{message || "Bu işlemi yapmak istediğinize emin misiniz?"}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Vazgeç
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Sil
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;

import { Button, Modal } from "flowbite-react";
import { useState, useEffect } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function Confirm({ modal, onConfirm, onCancel }) {
  const [openModal, setOpenModal] = useState(null);

  useEffect(() => {
    setOpenModal(modal);
  }, [modal]);

    
  return (
    <>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Esta seguro de eliminar la imagen? 
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={onConfirm}>
                Si, estoy seguro
              </Button>
              <Button color="gray" onClick={onCancel}>
                No, cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

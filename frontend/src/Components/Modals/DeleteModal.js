import React from "react";
import MainModal from "./MainModal";

function DeleteModal({ modalOpen, setModalOpen, setConfirm, onConfirm }) {
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 wfull align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl">
        <h2 className="text-3xl font-bold">Delete</h2>
        <p>Are your sure want to delete?</p>
        <div className="flex flex-col gap-6 mt-6 text-left">
          <button
            onClick={onConfirm}
            className="w-full flex-rows transitions py-3 text-lg hover:bg-dry rounded bg-subMain text-white border border-subMain"
          >
            Confirm
          </button>
        </div>
      </div>
    </MainModal>
  );
}
export default DeleteModal;

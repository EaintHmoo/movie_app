import React, { useEffect, useState } from "react";
import MainModal from "./MainModal";
import { Input } from "../UserInput";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  resetNew,
  resetUpdate,
  storeCategory,
  updateCategory,
} from "../../Actions/categoryActions";
function CategoryModal({ modalOpen, setModalOpen, category }) {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const { error: updateError } = useSelector((state) => state.category);
  const { error: newError } = useSelector((state) => state.newCategory);
  const [btnClick, setBtnClick] = useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (category) {
      dispatch(resetUpdate());
      dispatch(updateCategory(category.id, title));
    } else {
      dispatch(resetNew());
      dispatch(storeCategory(title));
    }
    setTitle("");
  };

  useEffect(() => {
    dispatch(clearErrors());
  }, [modalOpen]);

  useEffect(() => {
    if (!updateError && !newError) {
      dispatch(clearErrors());
      setModalOpen(false);
    } else {
      setModalOpen(true);
    }

    if (btnClick) {
      setBtnClick(!btnClick);
    }
  }, [updateError, newError, btnClick, dispatch]);
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 wfull align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl">
        <h2 className="text-3xl font-bold">{category ? "Update" : "Create"}</h2>
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col gap-6 mt-6 text-left"
        >
          <Input
            label="Category Name"
            placeholder={category ? category.title : "Actions"}
            type="text"
            bg={false}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={category ? updateError?.title : newError?.title}
          />
          <button
            onClick={() => setBtnClick(true)}
            type="submit"
            className="w-full flex-rows transitions py-3 text-lg hover:bg-dry rounded bg-subMain text-white border border-subMain"
          >
            {category ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </MainModal>
  );
}
export default CategoryModal;

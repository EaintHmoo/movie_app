import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import { HiPlusCircle } from "react-icons/hi";
import Table2 from "../../../Components/Table2";
import CategoryModal from "../../../Components/Modals/CategoryModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  getCategories,
  resetDelete,
} from "../../../Actions/categoryActions";
import DeleteModal from "../../../Components/Modals/DeleteModal";
function Categories() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { isDeleted, isUpdated } = useSelector((state) => state.category);
  const { success } = useSelector((state) => state.newCategory);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [category, setCategory] = useState();

  const onEditCategory = (id) => {
    setCategory(id);
    setModalOpen(!modalOpen);
  };

  const onDeleteCategory = (id) => {
    setCategory(id);
    setDeleteModalOpen(!deleteModalOpen);
  };

  const onDeleteConfirm = () => {
    dispatch(resetDelete());
    dispatch(deleteCategory(category?.id));
    setDeleteModalOpen(!deleteModalOpen);
  };

  useEffect(() => {
    if (modalOpen === false && deleteModalOpen === false) {
      setCategory();
    }
    dispatch(getCategories());
  }, [modalOpen, deleteModalOpen, dispatch, isDeleted, isUpdated, success]);

  return (
    <div>
      <SideBar>
        <CategoryModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          category={category}
        />
        <DeleteModal
          modalOpen={deleteModalOpen}
          setModalOpen={setDeleteModalOpen}
          onConfirm={onDeleteConfirm}
        />
        <div className="flex flex-col gap-6">
          <div className="flex-btn gap-3">
            <h2 className="text-xl font-bold">Categories</h2>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-subMain flex-rows gap-4 transitions text-white border border-subMain hover:bg-main w-full sm:w-auto py-2 px-4 rounded"
            >
              <HiPlusCircle />
              Create
            </button>
          </div>

          <Table2
            data={categories}
            users={false}
            onEditCategory={onEditCategory}
            onDelete={onDeleteCategory}
          />
        </div>
      </SideBar>
    </div>
  );
}
export default Categories;

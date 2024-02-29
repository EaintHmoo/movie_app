import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import DeleteModal from "../../../Components/Modals/DeleteModal";
import Table2 from "../../../Components/Table2";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../../../Components/Alert";
import {
  approveUser,
  deleteUser,
  getUsers,
  resetApprove,
  resetDelete,
} from "../../../Actions/userActions";
function User() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const { message, error, isApproved, isDeleted } = useSelector(
    (state) => state.userActions
  );
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userData, setUserData] = useState();

  const onApprove = (data) => {
    dispatch(resetApprove());
    dispatch(approveUser(data?.id));
  };

  const onDeleteUser = (data) => {
    setUserData(data);
    setDeleteModalOpen(!deleteModalOpen);
  };

  const onDeleteConfirm = () => {
    dispatch(resetDelete());
    dispatch(deleteUser(userData?.id));
    setDeleteModalOpen(!deleteModalOpen);
  };

  useEffect(() => {
    if (deleteModalOpen === false) {
      setUserData();
    }

    dispatch(getUsers());
  }, [dispatch, deleteModalOpen, isApproved, isDeleted]);

  return (
    <div>
      <SideBar>
        <DeleteModal
          modalOpen={deleteModalOpen}
          setModalOpen={setDeleteModalOpen}
          onConfirm={onDeleteConfirm}
        />
        <div className="flex flex-col gap-6">
          <div className="flex-btn gap-3">
            <h2 className="text-xl font-bold">Users</h2>
          </div>
          {message && (
            <div className="w-full">
              <Alert
                message={message}
                color="blue"
                onClick={() => {
                  dispatch({ type: "CLEAR_MESSAGE" });
                }}
              />
            </div>
          )}
          <Table2
            data={users}
            users={true}
            onDelete={onDeleteUser}
            onApprove={onApprove}
          />
        </div>
      </SideBar>
    </div>
  );
}
export default User;

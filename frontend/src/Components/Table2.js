import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
const Head = "text-xs text-left text-main font-semibold px-6 py-2 uppercase";
const Text = "text-sm text-left leading-6 whitespace-nowrap px-5 py-3";

const Rows = (
  data,
  i,
  users,
  onEditCategory = () => {},
  onDelete = () => {},
  onApprove = () => {}
) => {
  const toApprove = (
    <button
      onClick={() => onApprove(data)}
      className="bg-yellow-400 text-white rounded flex-colo w-contain h-6 px-2"
    >
      To Approve
    </button>
  );
  return (
    <tr key={i}>
      {/* Users */}
      {users ? (
        <>
          <td className={`${Text}`}>
            <div className="w-12 p-1 border border-border h-12 rounded overflow-hidden">
              <img
                className="h-16 w-16 rounded-full object-cover"
                src={data.image ? data.image : "/images/user.png"}
                alt={data.name}
              />
            </div>
          </td>
          <td className={`${Text}`}>{data._id ? data._id : "2R75T8"}</td>
          <td className={`${Text}`}>
            {data.createAt ? data.createAt : "12, Jan 2023"}
          </td>
          <td className={`${Text}`}>{data.name}</td>
          <td className={`${Text}`}>{data.email}</td>
          <td className={`${Text}`}>
            {data.approved ? "Approved" : toApprove}
          </td>
          <td className={`${Text} float-right flex-rows gap-2`}>
            <button
              onClick={() => onDelete(data)}
              className="bg-subMain text-white rounded flex-colo w-6 h-6"
            >
              <MdDelete />
            </button>
          </td>
        </>
      ) : (
        <>
          <td className={`${Text} font-bold`}>
            {data._id ? data._id : "2R75T8"}
          </td>
          <td className={`${Text}`}>
            {data.createAt ? data.createAt : "12, Jan 2023"}
          </td>
          <td className={`${Text}`}>{data.title}</td>
          <td className={`${Text} float-right flex-rows gap-2`}>
            <button
              onClick={() => onEditCategory(data)}
              className="bg-dry border border-border flex-rows px-2 py-1 rounded text-border gap-2"
            >
              Edit <FaEdit className=" text-green-500" />
            </button>
            <button
              onClick={() => onDelete(data)}
              className="bg-subMain text-white rounded flex-colo w-6 h-6"
            >
              <MdDelete />
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

function Table2({ data, users, onEditCategory, onDelete, onApprove }) {
  return (
    <div className="overflow-x-scroll overflow-hidden relative w-full">
      <table className="w-full table-auto border border-border divide-y divide-border">
        <thead>
          <tr className="bg-dryGray">
            {users ? (
              <>
                <th scope="col" className={`${Head}`}>
                  Image
                </th>
                <th scope="col" className={`${Head}`}>
                  Id
                </th>
                <th scope="col" className={`${Head}`}>
                  Date
                </th>
                <th scope="col" className={`${Head}`}>
                  FullName
                </th>
                <th scope="col" className={`${Head}`}>
                  Email
                </th>
                <th scope="col" className={`${Head}`}>
                  Is Approved
                </th>
              </>
            ) : (
              <>
                <th scope="col" className={`${Head}`}>
                  Id
                </th>
                <th scope="col" className={`${Head}`}>
                  Date
                </th>
                <th scope="col" className={`${Head}`}>
                  Title
                </th>
              </>
            )}
            <th scope="col" className={`${Head} text-end`}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-main divide-y divide-gray-800">
          {data.map((d, i) =>
            Rows(d, i, users, onEditCategory, onDelete, onApprove)
          )}
        </tbody>
      </table>
    </div>
  );
}
export default Table2;

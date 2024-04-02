/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const TablePromise = ({ promises }) => {
  return (
    <div className="mt-6 overflow-auto">
      <table className="table-auto mx-auto bg-white">
        <thead className="bg-gray-200">
          <tr>
            <th className="text-left px-4 py-2">Name</th>
            <th className="text-left px-4 py-2">Difficulty</th>
            <th className="text-left px-4 py-2">Promise</th>
            <th className="w-20 px-4 py-2">Image</th>
            <th className="text-left px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {promises.map((promise, index) => {
            return (
              <tr key={index}>
                <td className="p-4 border-b ">{promise.name}</td>
                <td className="p-4 border-b ">{promise.difficulty}</td>
                <td className="p-4 border-b ">{promise.promise}</td>
                <td className="p-4 border-b ">
                    <img src={promise.image} className="w-full"/>
                </td>
                <td className="p-4 border-b ">
                  <div className="flex gap-2">
                    <Link  to={`/edit/${promise._id}`} className="inline-block text-sm font-semibold text-white px-2 py-1 bg-blue-500 rounded hover:bg-blue-600">Edit</Link>
                    <button className="inline-block text-sm font-semibold text-white px-2 py-1 bg-red-500 rounded hover:bg-red-600">Delete</button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TablePromise;

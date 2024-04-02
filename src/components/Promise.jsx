/* eslint-disable react/prop-types */
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Promise = ({ promise, getPromises }) => {
  const deletePromise = async (id) => {
    const result = await Swal.fire({
      title: "Do you want to delete the promise?",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/api/promises/${id}`);
        toast.success("Deleted the promise Successfully");
        getPromises();
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="bg-white rounded shadow-lg overflow-hidden">
      <img src={promise.image} className="w-full h-28 object-cover" />
      <div className="px-4 pt-2 pb-4">
        <h2 className="text font-semibold">{promise.name}</h2>
        <div className="text-sm">{promise.promise}</div>
        <div className="text-sm">Difficulty: {promise.difficulty}</div>
        

        <div className="mt-2 flex gap-4">
          <Link
            to={`/edit/${promise._id}`}
            className="inline-block w-full text-center shadow-md text-sm bg-gray-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-gray-600 hover:cursor-pointer"
          >
            Edit
          </Link>
          <button
            onClick={() => deletePromise(promise._id)}
            className="inline-block w-full text-center shadow-md text-sm bg-red-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-red-600 hover:cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Promise;

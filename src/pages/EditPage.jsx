import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditPage = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [promise, setPromise] = useState({
    name: "",
    promise: "",
    difficulty: "",
    image: "",
  });

  const getProduct = async () => {
    setIsLoading(true);
    try {
      const response = await axios.put(`http://localhost:3000/api/promises/${id}`);
      setPromise({
        name: response.data.name,
        promise: response.data.promise,
        difficulty: response.data.difficulty,
        image: response.data.image,
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const updatePromise = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/promises/${id}`, promise);
      toast.success("Updated the promise successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
      <h2 className="font-semibold text-2xl mb-4 block text-center">
        Edit a Promise
      </h2>
      {isLoading ? (
        "Loading"
      ) : (
        <>
          <form onSubmit={updatePromise}>
            <div className="space-y-2">
              <div>
                <label className="text-gray-600 mb-2 block font-semibold">
                  Name
                </label>
                <input
                  type="text"
                  value={promise.name}
                  onChange={(e) =>
                    setPromise({ ...promise, name: e.target.value })
                  }
                  className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                  placeholder="Name"
                />
              </div>
              <div>
                <label className="text-gray-600 mb-2 block font-semibold">
                  Promise
                </label>
                <input
                  type="text"
                  value={promise.promise}
                  onChange={(e) =>
                    setPromise({ ...promise, promise: e.target.value })
                  }
                  className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                  placeholder="Promise"
                />
              </div>
              <div>
                <label className="text-gray-600 mb-2 block font-semibold">
                  Difficulty
                </label>
                <input
                  type="text"
                  value={promise.difficulty}
                  onChange={(e) =>
                    setPromise({ ...promise, difficulty: e.target.value })
                  }
                  className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                  placeholder="Difficulty"
                />
              </div>
              <div>
                <label className="text-gray-600 mb-2 block font-semibold">
                  Image URL
                </label>
                <input
                  type="text"
                  value={promise.image}
                  onChange={(e) =>
                    setPromise({ ...promise, image: e.target.value })
                  }
                  className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                  placeholder="Image URL"
                />

                {promise.image && (
                  <div className="w-1/2 border rounded p-2 mt-4 ">
                    <img className="w-full" src={promise.image} />
                  </div>
                )}
              </div>
              <div>
                <button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">
                  Update
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default EditPage;

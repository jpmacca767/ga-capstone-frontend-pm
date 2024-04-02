import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Promise from "../components/Promise";
import TablePromise from "../components/TablePromise";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [promises, setProducts] = useState([]);

  const getPromises = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:3000/api/promises");
      console.log(response.data)
      setProducts(response.data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPromises();
  }, []);

  return (
    <div>
      <div>
        <Link
          to="/create"
          className="inline-block mt-4 shadow-md bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer"
        >
          Create a Promise
        </Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
        {isLoading ? (
          "Loading"
        ) : (
          <>
            {promises.length > 0 ? (
              <>
                {promises.map((promise, index) => {
                  return (
                    <Promise
                      key={index}
                      promise={promise}
                      getPromises={getPromises}
                    />
                  );
                })}
              </>
            ) : (
              <div className="mt-4 bg-gray-800 text-white font-serif p-4">
                There is no promise
              </div>
            )}
          </>
        )}
      </div>

      <TablePromise promises={promises} />
    </div>
  );
};

export default HomePage;

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const CreatePage = () => {

    const [name, setName] = useState("");
    const [promise, setPromise] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [image, setImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const saveProduct = async(e) => {
        e.preventDefault();
        if(name === "" || promise === "" || difficulty === "" || image == ""){
            toast.error('Please fill out all input completely');
            return;
        }
        try {
            setIsLoading(true);
            const response = await axios.post("http://localhost:3000/api/promises", {name: name, promise: promise, difficulty: difficulty, image: image});
            toast.success(`Save ${response.data.name} Successfully`);
            setIsLoading(false);
            navigate("/");
        } catch (error) {
            toast.error(error.message);
            setIsLoading(false);
        }
    }


    return (
        <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
            <h2 className="font-semibold text-2xl mb-4 block text-center">
                Create a Promise
            </h2>
            <form onSubmit={saveProduct}>
                <div className="space-y-2">
                    <div>
                        <label className="text-gray-600 mb-2 block font-semibold">Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Name" />
                    </div>
                    <div>
                        <label className="text-gray-600 mb-2 block font-semibold">Promise</label>
                        <input type="text" value={promise} onChange={(e) => setPromise(e.target.value)} className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Promise" />
                    </div>
                    <div>
                        <label className="text-gray-600 mb-2 block font-semibold">Difficulty</label>
                        <input type="number" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Difficulty" />
                    </div>
                    <div>
                        <label className="text-gray-600 mb-2 block font-semibold">Image URL</label>
                        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="w-full block border p-3 text-gray-600  rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Image URL" />
                    </div>
                    <div>
                        { !isLoading &&  (<button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">Save</button>)}
                        
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CreatePage;

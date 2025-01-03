import { LuUserRoundPlus } from "react-icons/lu";
import { addJob } from "../features/job/jobSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

const Recruitment = () => {
    const dispatch = useDispatch();
    const [showJobModal, setShowJobModal] = useState(false);
    const [jobDetails, setJobDetails] = useState({
        title: '',
        description: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setJobDetails((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAddJob = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(addJob(jobDetails));
        setShowJobModal(false);
        setJobDetails({ title: '', description: '' });
    };

    return (
        <div className="relative w-full h-screen">
            <div className="flex justify-between items-center bg-[#9394ff] p-2">
                <div className="flex justify-center items-center gap-2">
                    <button className="bg-white w-fit">
                        <LuUserRoundPlus size={30} color="#3D41EA" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold">Recruitment</h1>
                        <p className="text-sm leading-3">Manage recruitment process</p>
                    </div>
                </div>

                <div>
                    <button onClick={() => setShowJobModal(!showJobModal)}>Add Job</button>
                </div>
            </div>

            <div>
                
            </div>
            {showJobModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-xl w-[400px] p-6">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center border-b pb-4">
                            <h2 className="text-xl font-semibold">Add New Job</h2>
                            <button
                                onClick={() => setShowJobModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form onSubmit={handleAddJob} className="space-y-4 mt-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={jobDetails.title}
                                    onChange={handleChange}
                                    placeholder="Enter job title"
                                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    name="description"
                                    value={jobDetails.description}
                                    onChange={handleChange}
                                    placeholder="Enter job description"
                                    rows={4}
                                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => setShowJobModal(false)}
                                    className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Recruitment;
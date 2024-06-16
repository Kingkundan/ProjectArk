import { useEffect, useState } from "react"
import Loader from '../components/common/Loader';
import Sidebar from "../components/layout/Sidebar";
import FinancesChart from "../components/charts/FinanceChart";

const DashboardPage = () => {
    const [IsLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1500)
    }, [])

    if (IsLoading) {
        return (<Loader />);
    }
    else {
        return (<div className="flex">
            <Sidebar />
            <div className="flex-col flex-grow ml-16 p-6 bg-gray-50">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-blue-600 text-white p-4 rounded-lg shadow">
                                <h2 className="text-lg font-semibold">Balance</h2>
                                <p className="text-2xl mt-2">$2190.19</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow">
                                <h2 className="text-lg font-semibold">Income</h2>
                                <p className="text-2xl mt-2">$21.30</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow">
                                <h2 className="text-lg font-semibold">Savings</h2>
                                <p className="text-2xl mt-2">$1875.10</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow">
                                <h2 className="text-lg font-semibold">Expenses</h2>
                                <p className="text-2xl mt-2">$19.112</p>
                            </div>
                        </div>
                        <div className="mt-6 bg-white p-4 rounded-lg shadow">
                            <h2 className="text-lg font-semibold mb-4">Finances</h2>
                            <FinancesChart />
                        </div>
                    </div>
                    <div className="lg:col-span-1">
                        <div className="bg-white p-4 rounded-lg shadow mb-6">
                            <h2 className="text-lg font-semibold">My Cards</h2>
                            <div className="mt-4">
                                <div className="bg-blue-600 text-white p-4 rounded-lg flex items-center justify-between">
                                    <div>
                                        <p className="text-lg">Visa</p>
                                        <p className="text-2xl mt-2">$2190.19</p>
                                    </div>
                                    <div>
                                        <p className="text-sm">USD / US Dollar</p>
                                        <p className="text-sm">Active</p>
                                    </div>
                                </div>
                                <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg">Add New Card</button>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h2 className="text-lg font-semibold">Quick Transfer</h2>
                            <div className="mt-4">
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    placeholder="Card Number"
                                />
                                <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg">Send Money</button>
                                <button className="mt-2 w-full py-2 border border-gray-300 text-gray-600 rounded-lg">
                                    Save as Draft
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 bg-white p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">Transactions</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b">Name</th>
                                    <th className="py-2 px-4 border-b">Service</th>
                                    <th className="py-2 px-4 border-b">Date</th>
                                    <th className="py-2 px-4 border-b">Time</th>
                                    <th className="py-2 px-4 border-b">Amount</th>
                                    <th className="py-2 px-4 border-b">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="py-2 px-4 border-b">Cameron Williamson</td>
                                    <td className="py-2 px-4 border-b">Figma</td>
                                    <td className="py-2 px-4 border-b">12/02/22</td>
                                    <td className="py-2 px-4 border-b">10:37 AM</td>
                                    <td className="py-2 px-4 border-b">$17.12</td>
                                    <td className="py-2 px-4 border-b text-red-500">Pending</td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border-b">Courtney Henry</td>
                                    <td className="py-2 px-4 border-b">Netflix</td>
                                    <td className="py-2 px-4 border-b">11/02/22</td>
                                    <td className="py-2 px-4 border-b">12:22 PM</td>
                                    <td className="py-2 px-4 border-b">$10.21</td>
                                    <td className="py-2 px-4 border-b text-green-500">Completed</td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border-b">Eleanor Pena</td>
                                    <td className="py-2 px-4 border-b">Spotify</td>
                                    <td className="py-2 px-4 border-b">10/02/22</td>
                                    <td className="py-2 px-4 border-b">11:31 AM</td>
                                    <td className="py-2 px-4 border-b">$12.18</td>
                                    <td className="py-2 px-4 border-b text-green-500">Completed</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default DashboardPage
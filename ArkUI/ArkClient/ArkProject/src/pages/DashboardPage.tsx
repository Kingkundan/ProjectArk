import { useEffect, useState } from "react";
import Loader from '../components/common/Loader';
import Sidebar from "../components/layout/Sidebar";
import FinancesChart from "../components/charts/FinanceChart";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase, faDollarSign, faHeartPulse, faMoneyBillTransfer, faMoneyBillWaveAlt, faMoneyCheck, faPiggyBank, faPlus, faSignOut, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import ChartBlock1 from "../components/charts/ChartBlock1";
import DataTable from "../components/common/Datable";
import Card from "../components/common/Card";

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
            <div className="flex-col flex-grow p-6 ml-16 bg-gray-50">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                    <div className="lg:col-span-3">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="flex gap-2 p-4 bg-white shadow-xl rounded-2xl shadow-blue-200/10">
                                <div className="flex flex-col w-2/3 gap-2">
                                    <div className="flex align-middle">
                                        <FontAwesomeIcon icon={faDollarSign} color="#49cc90" className="p-1 text-xl" />
                                        <h2 className="pl-2 text-base font-semibold text-slate-500">Total Balance</h2>
                                    </div>
                                    <div className="flex my-3 ml-4">
                                        <p className="pl-4 text-xl font-bold text-slate-500">$2190.19</p>
                                    </div>
                                </div>
                                <div className="flex flex-col w-1/3 gap-2 pb-10">
                                    <ChartBlock1 strokeColor="#49cc90" />
                                </div>
                            </div>
                            <div className="flex gap-2 p-4 bg-white shadow-xl rounded-2xl shadow-blue-200/10">
                                <div className="flex flex-col w-2/3 gap-2">
                                    <div className="flex align-middle">
                                        <FontAwesomeIcon icon={faDollarSign} color="#49cc90" className="p-1 text-xl" />
                                        <h2 className="pl-2 text-base font-semibold text-slate-500">Total Balance</h2>
                                    </div>
                                    <div className="flex my-3 ml-4">
                                        <p className="pl-4 text-xl font-bold text-slate-500">$2190.19</p>
                                    </div>
                                </div>
                                <div className="flex flex-col w-1/3 gap-2 pb-10">
                                    <ChartBlock1 strokeColor="#49cc90" />
                                </div>
                            </div>
                            <div className="flex gap-2 p-4 bg-white shadow-xl rounded-2xl shadow-blue-200/10">
                                <div className="flex flex-col w-2/3 gap-2">
                                    <div className="flex align-middle">
                                        <FontAwesomeIcon icon={faDatabase} color="#61affe" className="p-1 text-xl" />
                                        <h2 className="pl-2 text-base font-semibold text-slate-500">Total Income</h2>
                                    </div>
                                    <div className="flex my-3 ml-4">
                                        <p className="pl-4 text-xl font-bold text-slate-500">$21.30</p>
                                    </div>
                                </div>
                                <div className="flex flex-col w-1/3 gap-2 pb-10">
                                    <ChartBlock1 strokeColor="#61affe" />
                                </div>
                            </div>
                            <div className="flex gap-2 p-4 bg-white shadow-xl rounded-2xl shadow-blue-200/10">
                                <div className="flex flex-col w-2/3 gap-2">
                                    <div className="flex align-middle">
                                        <FontAwesomeIcon icon={faHeartPulse} color="#ffaf61" className="p-1 text-xl" />
                                        <h2 className="pl-2 text-base font-semibold text-slate-500">Total Savings</h2>
                                    </div>
                                    <div className="flex my-3 ml-4">
                                        <p className="pl-4 text-xl font-bold text-slate-500">$1875.10</p>
                                    </div>
                                </div>
                                <div className="flex flex-col w-1/3 gap-2 pb-10">
                                    <ChartBlock1 strokeColor="#ffaf61" />
                                </div>
                            </div>
                        </div>
                        <div className="py-6 mt-6 bg-white rounded-lg shadow-xl shadow-blue-200/10">
                            <h2 className="mb-4 ml-8 text-lg font-semibold text-slate-500">Finances</h2>
                            <FinancesChart />
                        </div>
                    </div>
                    <div className="lg:col-span-1">
                        <div className="p-4 mb-6 bg-white rounded-lg shadow-xl shadow-blue-200/10">
                            <div className="flex justify-between w-full">
                                <h2 className="text-lg font-semibold text-slate-500">My Cards</h2>
                                <button className="p-1 px-2 justify-center items-center rounded-[50%]  text-sm text-white shadow-blue-200/10 hover:bg-[rgba(0,118,255,0.9)] bg-[#91bbec]">
                                    <span><FontAwesomeIcon icon={faPlus} className="w-3" /></span>
                                </button>
                            </div>
                            <div className="mt-4">
                                <Card />                                
                            </div>
                        </div>
                        <div className="p-4 bg-white rounded-lg shadow-xl shadow-blue-200/10">
                            <h2 className="text-lg font-semibold text-slate-500">Quick Transfer</h2>
                            <div className="mt-4">
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    placeholder="Card Number"
                                />
                                <button className="w-full py-2 mt-4 text-white bg-blue-600 rounded-lg">Send Money</button>
                                <button className="w-full py-2 mt-2 text-gray-600 border border-gray-300 rounded-lg">
                                    Save as Draft
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 bg-white rounded-lg shadow-xl shadow-blue-200/10">
                    <div className="overflow-x-auto">
                        <DataTable />
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default DashboardPage
import { faCalendar, faCalendarAlt, faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const appointments = [
    { no: 1, code: 'DT-901', patientName: 'Jacob Jones', doctorName: 'dr. Albert Flores', specialistDoctors: 'Dental Specialist', schedule: '09:00-10:00 AM', status: 'Waiting', amount: '$130' },
    { no: 2, code: 'DT-902', patientName: 'Wade Warren', doctorName: 'dr. Albert Flores', specialistDoctors: 'Dental Specialist', schedule: '10:00-11:00 AM', status: 'Waiting', amount: '$130' },
    { no: 3, code: 'HT-101', patientName: 'Brooklyn Simmons', doctorName: 'dr. Theresa Webb', specialistDoctors: 'Heart Specialist', schedule: '09:00-10:00 AM', status: 'Completed', amount: '$120' },
    { no: 4, code: 'HT-102', patientName: 'Jerome Bell', doctorName: 'dr. Theresa Webb', specialistDoctors: 'Heart Specialist', schedule: '10:00-11:00 AM', status: 'Cancelled', amount: '$170' },
];

const DataTable = () => {
    return (
        <div className="p-4">
            <div className="flex justify-between items-center">
                <div className="flex justify-around ml-4 items-center">
                    <h2 className="text-xl text-slate-500 font-semibold flex items-center gap-2">
                        <FontAwesomeIcon icon={faCalendarCheck} className="text-blue-500" />
                        Appointment Request
                    </h2>
                </div>
                <div className="flex justify-around items-center">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by patient name"
                            className="pl-8 pr-4 py-2 border rounded-lg"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </div>
                    <DropDownPanel />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="bg-white border-b">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Doctor Name
                                <svg xmlns="http://www.w3.org/2000/svg" className="inline ml-1" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialist Doctors</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                                <svg xmlns="http://www.w3.org/2000/svg" className="inline ml-1" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {appointments.map((appointment) => (
                            <tr key={appointment.code}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.no}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{appointment.code}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.patientName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.doctorName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.specialistDoctors}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.schedule}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${appointment.status === 'Waiting' ? 'bg-yellow-100 text-yellow-800' :
                                            appointment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                'bg-red-100 text-red-800'}`}>
                                        {appointment.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};



const FilterDropdown = ({ label, options }: { label: any, options: any }) => {
    const [isOpen, setIsOpen] = useState<Boolean>(false);

    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {label}
                    <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {options.map((option: any, index: any) => (
                            <a
                                key={index}
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                role="menuitem"
                            >
                                {option}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const DropDownPanel = () => {
    return (
        <div className="p-4">
            <div className="flex space-x-4">
                <FilterDropdown
                    label="Filter by Status"
                    options={["All", "Waiting", "Completed", "Cancelled"]}
                />
                <FilterDropdown
                    label="Filter by Doctor Name"
                    options={["All", "dr. Albert Flores", "dr. Theresa Webb"]}
                />
            </div>
        </div>
    );
};


export default DataTable;
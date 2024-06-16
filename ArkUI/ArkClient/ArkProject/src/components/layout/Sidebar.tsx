// Sidebar.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChartLine, faCreditCard, faCog, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/reducers/authSlice';
import { ValidateUser } from '../../utils/api';
import logo from '../../../public/ArkLogo2.svg';
import UserImage from '../../assets/SVG/user-circle-logo.svg'

const getUserAccessDetails = async () => {
    try {
        const res = await ValidateUser();
        console.log(res);
        
    } catch (error) {
        console.log(error);
    }
}
const Sidebar = () => {
    const dispatch = useDispatch();

    return (
        <div className="fixed flex flex-col bg-white h-[100vh] w-16 p-2 drop-shadow-sm">
            <section className="mt-5 flex flex-col justify-center">
                <img src={logo} className='w-16 p-2' />
            </section>
            <section className='flex flex-grow flex-col justify-between'>
                <section>
                    <nav className="mt-10 flex items-center justify-center flex-col gap-5">
                        <a href="#" className="flex items-center justify-center w-10 h-10 text-gray-400 rounded-xl hover:bg-blue-300  hover:text-white">
                            <FontAwesomeIcon icon={faHome} className="text-lg" />
                        </a>
                        <a href="#" className="flex items-center justify-center w-10 h-10 text-gray-400 rounded-xl hover:bg-blue-300 hover:text-white">
                            <FontAwesomeIcon icon={faChartLine} className="text-lg" />
                        </a>
                        <a href="#" className="flex items-center justify-center w-10 h-10 text-gray-400 rounded-xl hover:bg-blue-300 hover:text-white">
                            <FontAwesomeIcon icon={faCreditCard} className="text-lg" />
                        </a>
                        <a href="#" className="flex items-center justify-center w-10 h-10 text-gray-400 rounded-xl hover:bg-blue-300 hover:text-white">
                            <FontAwesomeIcon icon={faCog} className="text-lg" />
                        </a>
                    </nav>
                </section>
                <section className='flex flex-grow flex-col gap-5 items-center justify-end'>

                    <a onClick={getUserAccessDetails}
                        className="flex items-center justify-center text-gray-400 cursor-pointer">
                        <img src={UserImage} alt="" className="w-10 h-10 rounded-full object-cover hover:outline-4 hover:outline hover:outline-blue-300" />
                    </a>
                    <a onClick={() => { dispatch(logout()) }}
                        className="flex items-center justify-center w-10 h-10 text-gray-400 cursor-pointer">
                        <FontAwesomeIcon icon={faPowerOff} className="text-lg hover:text-blue-300" />
                    </a>
                </section>
            </section>
        </div>
    );
};

export default Sidebar;

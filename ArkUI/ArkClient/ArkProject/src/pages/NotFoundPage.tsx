import { useNavigate } from 'react-router-dom'
import NotFound from '../assets/images/404PageNotFound.png'
import { useDispatch } from 'react-redux';
import { RefreshToken } from '../utils/axiosIntercept';

const NotFoundPage = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();

    const OnBackClick = async () => {
        try {

            await RefreshToken(null);
            nav("/");
        }
        catch {
            window.location.href = "/login";
        }
    }
    return (
        <div className='h-[100vh] overflow-hidden flex flex-col justify-center items-center gap-10'>
            <img src={NotFound} className='w-1/2' />
            <div className='text-4xl font-bold text-blue-400'>Sorry,Page Not Found !</div>
            <div className="mt-5">
                <button onClick={OnBackClick} className='w-72 p-4 bg-blue-500 text-white text-lg font-bold rounded-[4rem]'>Back</button>
            </div>
        </div>
    )
}

export default NotFoundPage
import { Route, Routes } from 'react-router-dom'
import AccordianComponent from '../Components/BaseComponents/AccordianComp'
import AlertPopUp from '../Components/BaseComponents/AlertPopUp';
import Home from '../Pages/Home';
import FileUpload from '../Components/BaseComponents/FileUpload';
import Gallery from '../Components/BaseComponents/Gallery.tsx';
const RouterComponent = () => {
    return (
        <>
            <Routes>
                <Route index path='/' element={<Home />} />
                <Route path='/Utility' element={<AccordianComponent />} />
                <Route path='/FileUpload' element={<FileUpload />} />
                <Route path='/Gallery' element={<Gallery />} />
            </Routes>
            <AlertPopUp />
        </>
    )
}

export default RouterComponent
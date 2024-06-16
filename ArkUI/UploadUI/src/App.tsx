import SideBar from './constants/SideBar';
import RouterComponent from './constants/RouterComponent'
import { Flowbite } from 'flowbite-react';

function App() {
  return (
    <>
    <Flowbite>
      <div id="BodyPanel" className="fixed h-screen items-center flex w-full bg-slate-900">
        <SideBar />
        <div id="MainPanel" className='relative h-full w-full flex flex-col items-center justify-center'>
          <RouterComponent />
        </div>
      </div>      
    </Flowbite>
    </>
  );
}

export default App;
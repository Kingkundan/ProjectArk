import { HiEye, HiInformationCircle } from 'react-icons/hi';
import { Alert } from 'flowbite-react';
import { useState } from 'react';

const AlertPopUp = () => {
    return (
        <div className='absolute top-0 right-1 mt-10'>
        <AlertComponent/>
        </div>
    )
}

export default AlertPopUp




const AlertComponent = () => {
    const [isAlertVisible,setAlertVisible] = useState(true)
    return (
        isAlertVisible &&
        <Alert 
            
            additionalContent={<div>Alert Details</div>}
            color="success"
            icon={HiInformationCircle}
            onDismiss={() => setAlertVisible(p=>!p)}
            rounded
        >
            <span className="font-medium">Info alert!</span> Change a few things up and try submitting again.
        </Alert>
    );
}

import axios from 'axios';
import { Label } from 'flowbite-react';
import { useState } from 'react';
import { TableComponent } from './TableComponent';
import CarouselComponent from './CarouselComponent';
import { twMerge } from 'tailwind-merge';

const SampleFile = ({ HtmlFor, CustomClassName }: any) => {

    return (
        <>
            <div id='SampleFile' className={twMerge(`flex w-full items-center justify-center`, `${CustomClassName}`)}>
                <Label
                    htmlFor={HtmlFor}
                    className="dark:hover:bg-gray-800 flex h-15 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 backdrop-blur-xl bg-gray-50 bg-opacity-20 hover:bg-gray-100 dark:border-gray-600 dark:backdrop-blur-lg dark:bg-gray-400 dark:bg-opacity-50 dark:hover:border-gray-300 dark:hover:bg-opacity-70"
                >
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                        <svg
                            className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-100"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-100">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-100">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>

                </Label>
            </div>
        </>
    );
}
const UploadComponent = ({ setOutput }: any) => {
    const [file, setFile] = useState<any>(null);
    const fileURLs = file !== null && file.length > 0 ? Object.keys(file).map((id: any) => (URL.createObjectURL(file[id]))) : ["https://flowbite.com/docs/images/carousel/carousel-1.svg"];
    
    return (
        <>
            <div className="relative flex flex-col w-1/2 items-center justify-center mb-20">
                <CarouselComponent >
                    {fileURLs.map((url: string,index:number) => (
                        <img key={index} src={`${url}`} className='w-full bg-cover' />
                    ))}
                </CarouselComponent>
                <SampleFile HtmlFor={`dropzone-file`} className='' CustomClassName='absolute bottom-[-20%] z-10' />
                <input type='file' accept='image/*' multiple onChange={(e) => {
                    console.log("Files", e.target.files);
                    setFile(e.target.files);
                }} id="dropzone-file" className='hidden' />
            </div>
            <ButtonUpload fileData={file} setOutput={setOutput} />
        </>
    );
}

const ButtonUpload = ({ fileData, setOutput }: any) => {

    const onClick = async () => {
        const form = new FormData();
        Object.keys(fileData).map((item: any) => {
            form.append(`files`, fileData[item]);
        });


        try {

            const { data } = await axios.post("https://localhost:7106/api/FileUpload", form, {
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            });
            setOutput(data);
            console.log(data);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className='p-7'>
                <button className='p-4 bg-green-300 font-bold text-base text-cyan-950 rounded-xl'
                    onClick={onClick}
                >Upload</button>
            </div>
        </>)
}

const FileUpload = () => {
    const [OutputTable, setOutputTable] = useState<any>(null);

    const setOutput = (props: any) => {

        setOutputTable(props);
    }
    return (
        <>
            <div className="flex flex-col place-items-center justify-center max-w-[120rem] h-fit">
                <UploadComponent setOutput={setOutput} />
            </div>
            {
                OutputTable &&
                <TableComponent TableData={OutputTable} />
            }
        </>
    )
}

export default FileUpload
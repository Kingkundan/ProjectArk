import LoaderGif from '../../assets/images/LoaderMagentaBlue.gif'

const Loader = () => {
    return (
        <div className='h-[100vh] flex flex-col justify-center items-center gap-16 relative'>
            <img className='bg-cover w-40' src={LoaderGif}/>
            {/* <div className='loader'></div> */}
        </div>
    )
}


export default Loader
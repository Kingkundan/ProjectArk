import { Carousel } from 'flowbite-react';
import  { Children,  forwardRef } from 'react';

const BaseCarousel = ({children}:any) => {
    return (
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 overflow-hidden">
            <Carousel pauseOnHover indicators={false}>
                {
                    Children.map(children,(child:any)=>(
                    <>
                    {child}
                    </>
                    ))
                }
            </Carousel>
        </div>
    );
}


const CarouselComponent = ({children}:any,ref:any) => {
    return (
        <>
            <BaseCarousel>
            {children}
            </BaseCarousel>
        </>
    )
}

export default forwardRef(CarouselComponent);
import { Swiper, SwiperSlide } from 'swiper/react';
import {v4} from 'uuid'
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { ProductCard } from "../../../productCard/productCard";


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
 import './Slider.css'

export const Slider = ({ data }) => {

    return (
        <Swiper 
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={2}
            slidesPerView={1}
            breakpoints={{
                680: { slidesPerView: 2 },
                970: { slidesPerView: 3 },
                1350: { slidesPerView: 4 },
                1600: { slidesPerView: 5 },
               
            }}

            navigation 
            pagination={{ clickable: true }}
            // onSwiper={(swiper) => console.log(swiper)}
            // onSlideChange={() => console.log('slide change')}
        >
            {data.map(x => (
                <SwiperSlide className='swiper'
                key={v4()}>
                    {<ProductCard {...x} />}
                </SwiperSlide>
            ))}
        </Swiper>
        
    );
}
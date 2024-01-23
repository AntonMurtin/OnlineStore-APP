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
                1900: { slidesPerView: 6 },
                2200: { slidesPerView: 7 },
                2500: { slidesPerView: 8 },
                2800: { slidesPerView: 9 },
                3100: { slidesPerView: 10 },
                3300: { slidesPerView: 11 },
            }}
            navigation 
            pagination={{ clickable: true }}
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
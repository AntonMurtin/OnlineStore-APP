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
                660: { slidesPerView: 2 },
                950: { slidesPerView: 3 },
                1295: { slidesPerView: 4 },
                1585: { slidesPerView: 5 },
                1800: { slidesPerView: 6 },
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
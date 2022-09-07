import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper';

import './index.css';
import SliderBgA from '../../assets/images/slider_bg.png';
import SliderBgB from '../../assets/images/slider_bg_2.png';
import SliderBgC from '../../assets/images/slider_bg_3.png';
import Gift from '../../assets/images/png_gift.png';

export default function SliderHome() {
	return (
		<Swiper
			loop={true}
			slidesPerView={'auto'}
			centeredSlides={true}
			spaceBetween={30}
			autoplay={{
				delay: 2500,
				disableOnInteraction: false,
			}}
			modules={[Autoplay]}
			className='md:mt-8 mt-0 home-slider'
		>
			<SwiperSlide>
				<div className='slider-item md:bg-[#FFE9CA] md:py-[50px] md:px-20 px-4 pt-[118px] pb-[160px] md:rounded-[20px] rounded-none relative'>
					<div className='slider-content relative z-10'>
						<h2 className='text-[#151515] md:text-4xl text-xl md:leading-[54px] leading-[30px] font-bold mb-4'>
							Hari Raya <br /> Banyak diskon!
						</h2>
						<p className='text-sm text-[#151515] mb-2'>Diskon Hingga</p>
						<span className='text-[#FA2C5A] md:text-[32px] text-lg md:leading-9 leading-[26px]'>60%</span>
					</div>
					<div className='slider-bg absolute right-0 top-0'>
						<img src={SliderBgA} alt='Background' />
					</div>
					<img
						className='absolute md:right-[30%] lg:right-[35%] md:top-[30%] top-[118px] right-6'
						src={Gift}
						alt='Background'
					/>
				</div>
			</SwiperSlide>
			<SwiperSlide>
				<div className='slider-item purple md:bg-[#F8D6D5] md:py-[50px] md:px-20 px-4 pt-[118px] pb-[160px] md:rounded-[20px] rounded-none relative'>
					<div className='slider-content relative z-10'>
						<h2 className='text-[#151515] md:text-4xl text-xl md:leading-[54px] leading-[30px] font-bold mb-4'>
							Spesial 17 Agustus <br /> Banyak diskon!
						</h2>
						<p className='text-sm text-[#151515] mb-2'>Flash Sale Hingga</p>
						<span className='text-[#FA2C5A] md:text-[32px] text-lg md:leading-9 leading-[26px]'>70%</span>
					</div>
					<div className='slider-bg absolute right-0 top-0 purple'>
						<img src={SliderBgC} alt='Background' />
					</div>
					<img
						className='absolute md:right-[30%] lg:right-[35%] md:top-[30%] top-[118px] right-6'
						src={Gift}
						alt='Background'
					/>
				</div>
			</SwiperSlide>
			<SwiperSlide>
				<div className='slider-item green md:bg-[#B6D4A8] md:py-[50px] md:px-20 px-4 pt-[118px] pb-[160px] md:rounded-[20px] rounded-none relative'>
					<div className='slider-content relative z-10'>
						<h2 className='text-[#151515] md:text-4xl text-xl md:leading-[54px] leading-[30px] font-bold mb-4'>
							Brand Festival Week <br /> Banyak diskon!
						</h2>
						<p className='text-sm text-[#151515] mb-2'>Diskon Hingga</p>
						<span className='text-[#FA2C5A] md:text-[32px] text-lg md:leading-9 leading-[26px]'>99%</span>
					</div>
					<div className='slider-bg absolute right-0 top-0 green'>
						<img src={SliderBgB} alt='Background' />
					</div>
					<img
						className='absolute md:right-[30%] lg:right-[35%] md:top-[30%] top-[118px] right-6'
						src={Gift}
						alt='Background'
					/>
				</div>
			</SwiperSlide>
		</Swiper>
	);
}

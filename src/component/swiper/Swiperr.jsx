import './swiper.css'
import React, { useEffect, useState ,useRef} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Scrollbar, Autoplay, EffectCoverflow } from 'swiper/modules';

import 'swiper/swiper-bundle.css';
import 'swiper/css/scrollbar';
import Loader from '../loader/Loader';
import { Link } from 'react-router-dom';


export default function Swiperr() {
    let [loader,setLoader]=useState(true);
let[error,setError]=useState('');
  const [Categoriess, setCategories] = useState([]);
  const getData = async () => {

  try{
        const response = await fetch(` ${import.meta.env.VITE_API_URL}/categories/active?page=1&limit=9` );
        const data = await response.json();
        setCategories(data.categories);
        setLoader(false);
  }
  catch(error){
    setError("Sorry There is an error!!");
    setLoader(false);
//     return(
// <>
// <h2>Sorry There is an error!!</h2>
// </>
//     )
   
  }
};
  useEffect(() => {
    getData();
  }, []);
  if(loader){
    return(
     <>
     <Loader/>
     </>
    )
  }
  return (
   <>
   {error?<h2> {error} </h2>:null}

<Swiper
spaceBetween={30}
centeredSlides={true}
        effect={'coverflow'}
        grabCursor={true}
        navigation={true}
        pagination={{
            clickable: true,
          }}
          breakpoints={{
            300: {
              slidesPerView: 1,
              spaceBetween: 5,
            },
            400: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            }, 
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
        autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
                  
        slidesPerView={4}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[Autoplay, Pagination, Navigation,EffectCoverflow]}

        // modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
    >
      {(Categoriess.length>0)?Categoriess.map((category) => (
        <div key={category._id}>
          <SwiperSlide>
            <Link  to={`/details?id=${category._id}`}>
            <img
              src={category.image.secure_url}
              alt="Categories image"
            /></Link>
              {/* <p>{category.name}</p> */}
              
          </SwiperSlide>
        </div>
      )):<h3>No data found</h3>  }
    </Swiper>


    {/* <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={30}
      slidesPerView={1}
      navigation
      autoplay={{ delay: 2000 }} // Change delay as needed
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      scrollbar={{ draggable: true }}

    >
      {Categoriess.map((category) => (
        <div key={category.id}>
          <SwiperSlide>
            <img
              src={category.image.secure_url}
              alt="..."
            />
          </SwiperSlide>
        </div>
      ))}
    </Swiper> */}


 

    </>
  );
}

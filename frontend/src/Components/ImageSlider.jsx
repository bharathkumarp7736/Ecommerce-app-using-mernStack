import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=Crop&w=1600&q=80",
  "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/277319/pexels-photo-277319.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/3682293/pexels-photo-3682293.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=1600"
];
const ImageSlider = () => {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };


  //------------------------------------------------------------------------
  return (
    <div className="relative w-full shadow-lg  overflow-hidden">
      {/* slides */}
      <div
        className="flex w-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
>
        {images.map((image, index) => (
          <img
            src={image}
            key={index}
            className="h-75 min-w-full shrink-0 md:h-112.5 object-cover"          />
        ))} 
      </div>
      {/* previous slide */}
        <button onClick={prevSlide} className="absolute  bg-blue-500 hover:bg-blue-300 text-gray-300 p-2 rounded-full transition cursor-pointer left-4 top-1/2 "><ChevronLeft/></button>

      {/* next slide */}
        <button onClick={nextSlide} className="absolute bg-blue-500 hover:bg-blue-300 text-gray-300 p-2 rounded-full transition cursor-pointer right-4 top-1/2 "><ChevronRight/></button>

        {/* indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_,index)=>(
                <button key={index} onClick={()=>setCurrent(index)} className={`h-2 rounded-full transition-all ${current=== index ?"w-6 bg-blue-300":"w-2 bg-blue-200"}`}></button>
            ))}
        </div>
    </div>
  );
};

export default ImageSlider;

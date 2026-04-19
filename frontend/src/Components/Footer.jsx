import React from 'react'
import {Phone,Mail,Github, Youtube, Instagram, Linkedin} from 'lucide-react'
const Footer = () => {
  return(
    <footer className='bg-blue-200 text-gray-300 mt-8'>
      <div className='max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6 text-center md:text-left py-5'>
        {/* contact*/}
          <div className='flex-1 min-w-62.5'>
            <h3 className='text-xl font-semibold mb-4 text-gray-700'>Contuct Us</h3>
            <p className='flex items-center justify-center md:justify-start gap-2 text-gray-500'><Phone size={16}/>Phone : +91 9080706050</p>
            <p className='flex items-center justify-center md:justify-start gap-2 text-gray-500'><Mail size={16}/>Email : shophub@gmail.com</p>
          </div>
        {/* socialmedia link */}
          <div className='flex-1 min-w-62.5 items-center gap-4'>
              <h3 className='text-xl font-semibold mb-4 text-gray-700'>Follow Me</h3>
              <div className='flex gap-4 items-center justify-center md:justify-start'>
                <a href="" target='_blank'><Github size={16} className='w-7 h-7 text-gray-500 transition-transform duration-300 hover:scale-110 hover:text-blue-500'/></a>
                <a href="" target='_blank'><Youtube size={16} className='w-7 h-7 text-gray-500 transition-transform duration-300 hover:scale-110 hover:text-red-500'/></a>
                <a href="" target='_blank'><Instagram size={16} className='w-7 h-7 text-gray-500 transition-transform duration-300 hover:scale-110 hover:text-pink-500'/></a>
                <a href="" target='_blank'><Linkedin size={16} className='w-7 h-7 text-gray-500 transition-transform duration-300 hover:scale-110 hover:text-blue-900'/></a>
              </div>
 
          </div>
        
        {/*  about*/}
          <div className='flex-1 min-w-62.5'>
              <h3 className='text-xl font-semibold mb-4 text-gray-700'>About</h3>
              <p className='text-gray-500 leading-relaxed'>Providing professional e-commerce solutions to help you grow your online business</p>

          </div>
      </div>
      <div className='border-t botder-gray-700 py-4 text-center text-gray-500 text-sm'>© 2026 ShoppingHub. All rights reserved</div>
    </footer>
  );
};

export default Footer
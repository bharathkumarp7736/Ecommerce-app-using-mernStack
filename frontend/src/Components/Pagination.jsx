import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'

const Pagination = ({ currentPage, onPageChange,
  nextPageText=<ChevronRight size={20}/>,
  prevPageText=<ChevronLeft size={20}/>,
  firstPageText=<ChevronsLeft size={20}/>,
  lastPageText=<ChevronsRight size={20}/>,
 }) => {
   const {totalPages,products}=useSelector((state)=>state.product);
  if(!products || products?.length===0 || totalPages<=1){return null};
  const getPageNumbers=()=>{
    const pageNumbers=[];
    const pageWindow=1;
    for(let i=Math.max(1,currentPage - pageWindow);i<=Math.min(totalPages,currentPage+pageWindow);i++){
      pageNumbers.push(i);
    }
    return pageNumbers;
  };
  const btnBase="relative inline-flex item-center justify-center w-10 h-10 text-sm font-semibold transition-all duration-300 ease-in-out rounded-full mx-1";
  const activeBtn="bg-blue-500 text-blue-300 shadow-lg shadow-blue-200 ring-2 ring-blue-500 ring-offset-2 scale-110";
  const inactiveBtn="text-gray-500 hover:bg-blue-50 hover:text-blue-500 hover:scale-105 border border-transparent";
  const controlBtn="bg-gray-100 border border-gray-200 text-gray-500 hover:border-blue-400 hover:text-blue-500 shodow-sm";
   return (
    <div className='flex flex-col items-center justify-center gap-4 my-12'>
      <div className='flex items-center p-2 bg-blue-200 rounded-full shadow-md border-gray-100 '>
        {/* first and previous */}
        <div className='flex gap-1 mr-2 border-r pr-2 border-blue-100'>
          <button disabled={currentPage===1} className={`${btnBase} ${controlBtn} disabled:opacity-30 disabled:hover:scale-100 items-center cursor-pointer`} title='First Page' onClick={()=>onPageChange(1)}>{firstPageText}</button>
          <button disabled={currentPage===1} className={`${btnBase} ${controlBtn} disabled:opacity-30 disabled:hover:scale-100 items-center cursor-pointer`} title='Previous Page' onClick={()=>onPageChange(currentPage-1)}>{prevPageText}</button>
        </div>
        
        {/* page numbers */}
        <div className='flex gap-1'>
          {getPageNumbers().map((number)=>(
            <button key={number} onClick={()=>onPageChange(number)} className={`${btnBase} ${currentPage===number ?activeBtn:inactiveBtn} items-center cursor-pointer`}>{number}</button>
          ))}
        </div>
        {/* next and last */}
        <div className='
        flex gap-1 ml-2 border-l border-gray-100 '>
           <button disabled={currentPage===totalPages} className={`${btnBase} ${controlBtn} disabled:opacity-30 disabled:hover:scale-100 items-center cursor-pointer`} title='Next Page' onClick={()=>onPageChange(currentPage+1)}>{nextPageText}</button>
          <button disabled={currentPage===totalPages} className={`${btnBase} ${controlBtn} disabled:opacity-30 disabled:hover:scale-100 items-center cursor-pointer`} title='Last Page' onClick={()=>onPageChange(totalPages)}>{lastPageText}</button>
        </div>
      </div>
      <p className='text-sm text-gray-500'>
        Page {currentPage} of {totalPages}
      </p>
    </div >
  )
}

export default Pagination
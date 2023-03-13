import Navbar from '@/components/navbar';
import React, { useEffect, useState } from 'react'

const charactersEndPoint = "https://rickandmortyapi.com/api/character";
export async function getServerSideProps(){
    const res = await fetch(charactersEndPoint);
    const data = await res.json();
    return {
        props:{
            data
        }
    }
}

function characters({ data }) {
    const {info, results: defaultResults = []} = data;
    const [results, updateResults] = useState(defaultResults)
    const [page, updatePage] = useState({
        ...info,
        current: charactersEndPoint
    });
    const {current} = page;
    useEffect(()=>{
        if(current === charactersEndPoint)
            return;

    async function request(){
        const res = await fetch(current);
        const nextData = await res.json();
    
    updatePage({
        current,
        ...nextData.info
    });

    if(!nextData.info?.prev){
        updateResults(nextData.results);
        return;
    }

    updateResults(prev => {
        return [
            ...prev,
            ...nextData.results
        ]
    });
}
request();
}, [current]);

function loadMore(){
    updatePage(prev => {
        return{
            ...prev,
        current: page?.next
        }
    });
}
    return (
        <>
        <Navbar />
        <div className='grid grid-cols-4 w-full text-lg font-medium'>
        {
            results.map(result=>{
                return (
                    <div className='flex justify-around items-center'>
                        <div className='cursor-pointer shadow-lg shadow-gray-800 border-[1px] flex flex-col justify-between items-center py-5 my-5 w-[70%] rounded-[5%] hover:border-sky-700 bg-white hover:text-sky-700 hover:bg-sky-200 duration-150'>
                            <img className='rounded px-5' src={result.image} />
                            <h2 className='mt-3'>{result.name}</h2>
                        </div>
                    </div>
                )
            })
        }
    </div>
    <div className='flex justify-center'>
        <button className='py-3 font-bold rounded bg-[#6CC1F4] px-6' onClick={loadMore}>Load More</button>
    </div>
        </>
  )
}

export default characters
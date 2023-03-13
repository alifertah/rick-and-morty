import EpisodeDesc from '@/components/episodeDesc';
import Navbar from '@/components/navbar';
import React, { useEffect, useState } from 'react'

const charactersEndPoint = "https://rickandmortyapi.com/api/episode";
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

function checkSaison(name){
    if(name.includes("S01"))
        return "/S01.png";
    else if(name.includes("S02"))
        return "/S02.jpg";
    else if(name.includes("S03"))
        return "/S03.jpg";
    else if(name.includes("S04"))
        return "/S04.jpg";
    else if(name.includes("S05"))
        return "/S05.jpg";
}
    return (
        <>
        <Navbar />
        <div className='grid grid-cols-4 w-full text-lg font-medium'>
        {
            results.map(result=>{
                return (
                    <div>
                    <div className='flex flex-col justify-around items-center'>
                        <div className='cursor-pointer shadow-lg shadow-gray-800 border-[1px] flex flex-col justify-center items-center py-5 my-5 w-[70%] rounded-[5%] hover:border-sky-700 bg-white hover:text-sky-700 hover:bg-sky-200 duration-150'>
                        <span className="text-sm text-gray-400">{result.episode}</span>
                        {checkSaison(result.episode)?(<img className='rounded px-5' src={checkSaison(result.episode)}/>)
                        :("")}    
                            <h2 className='mt-3 text-center'>{result.name}</h2>
                        </div>
                    <EpisodeDesc date={result.date} /> 
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
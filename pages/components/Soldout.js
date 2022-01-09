import React from 'react'
import openseaSVG from './svgs/OpenseaSVG'

export function Soldout(props){
  const {url} = props;

  return (<div>
        <a href={url} target="_blank" rel="noreferrer" className="flex items-center py-1 px-6 bg-sky-200 text-sky-600 font-semibold rounded-full shadow-md hover:bg-blue-600 hover:text-white">
          <span class="px-3">SOLD OUT - BUY ON OPENSEA</span>
          { openseaSVG }
        </a>
        </div>);
}
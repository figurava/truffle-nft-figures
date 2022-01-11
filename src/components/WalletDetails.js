import React from 'react'

export function WalletDetails(props){
  const {tokens} = props;
  if(!tokens?.length) return null;

  const reveal = (id) => {
    alert('Figure ' + id);
  }

  return (<div className="grid grid-cols-6 gap-5 pb-5">
           { tokens.map((item) => {
            return <div className="bg-teal-300 rounded-lg shadow p-5 text-center" key={item}>
              <div className="text-lg font-mono">Figure</div>
              <div className="text-4xl my-4 font-semibold">#{item}</div>
              <button onClick={(e)=>{ reveal(item) }} className="btn-reveal">Reveal</button>
            </div>
           }) }
         </div>)
}
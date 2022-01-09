import React from 'react'

import { MetamaskConnect} from './MetamaskConnect'
import { WalletDetails} from './WalletDetails'

export function Navbar(props){
  const {connect, account, tokens, chainId} = props;

  const getChainName = (chainId) => {
      const chainIds = {"1": "mainnet", "3" : "ropsten", "4" : "rinkeby", "5": "goerli", "6": "kotti", "212": "astor", "63": "mordor",  "1337" : "local"};
      return chainIds[chainId] ?? 'unknown chain id ' + chainId;
  }

  const Container = ({ children, css }) => {
    return <div className={`bg-opacity-50 flex justify-end items-center ${css}`} style={{minHeight: '4rem'}}>{children}</div>
  }

  if(!account)
    return (<Container>
      <div className="flex w-full items-center justify-between px-6">
        <div className="leading-3 font-mono font-semibold">
          <div className="font-bold text-3xl">Figures </div>
          <a href="https://figurava.com" target="_blank" className="hover:bg-lime-300 px-3 leading-none text-xs group">by <span className="group-hover:hidden">Figurava</span><span className="hidden group-hover:inline-block">F;gur^v^</span></a>
        </div>
        <MetamaskConnect connect={connect} disableWarning={true}></MetamaskConnect>
      </div>
    </Container>);

  return (
    <Container css="bg-white ">
      <div className="w-full">
        <div className="flex items-center justify-between items-center px-6">
          <span className="px-3 text-xs font-mono opacity-50">Network: { getChainName(chainId) }</span>
          <div className="flex items-center">
            { tokens?.length ? <div className="text-md my-5 px-3 text-center">You have <span className="font-semibold">{tokens?.length }</span> <span className="font-mono">Figures</span> </div> : null}
            <div className="px-3 py-2 border-2 border-gray-300 rounded-lg inline-block w-48 truncate">{ account }</div>
          </div>
        </div>
        <div className="mx-auto max-w-4xl">
          <WalletDetails account={account} tokens={tokens}></WalletDetails>
        </div>
      </div>
    </Container>
  )
}

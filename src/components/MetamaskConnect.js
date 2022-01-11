import React from "react";
import metamaskSVG from './svgs/MetamaskSVG'

export class MetamaskConnect extends React.Component {

  constructor(props) {
    super(props);
    this.state = {ready: false};
  }

  checkEthereum(){
     if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') return true;
     return false;
  }

  componentDidMount() {
    this.setState({ready: this.checkEthereum()});
  }

  render() {
    const { connect, info, disableWarning} = this.props;
    const { ready } = this.state;

    if(!ready)
      return disableWarning ? null: <a href='https://metamask.io/download.html' target='_blank' rel='noreferrer' className="flex items-center justify-center  border- rounded-full py-2 shadow bg-opacity-70 hover:bg-opacity-100 px-6 bg-white text-xl"> <span className="mx-2">{metamaskSVG}</span> You need to install <span className="border-b-2 border-current hover:text-red-600 mx-2">Metamask</span></a>;

    return (
      <>
        { info ? <div className="pb-6 text-center">Connect to Metamask using the button below</div> : null}
        <button className="flex items-center py-1 px-6 bg-indigo-500 text-white font-semibold rounded-full shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75" onClick={(e)=>{ connect() }}>
            {metamaskSVG}
            <span className="w-full px-2">Connect Metamask</span>
        </button>
      </>
    )
  }
}
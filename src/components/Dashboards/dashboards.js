import React from "react"
import ReactDOM from "react-dom"
import { useResolvedPath } from "react-router-dom"
import "./dashboards.css"
import "./datajson.js"
import { mkt_cap_json } from "./datajson.js"




const axios = require('axios');
class Dashboards extends React.Component {
    /*
    var mkt_cap = MKT_DATA_JSON.frax.full_items[0].market_cap
    var curve_amo = AMO_DATA_JSON.curve.convex_amo + AMO_DATA_JSON.curve.stakedao_amo
    var cross_chain_liq = AMO_DATA_JSON.liquidity.liquidity_related_total
    var lending_amo = AMO_DATA_JSON.lending.lending_related_total*/

    constructor (props) {
        super(props);

        this.state = {
            mkt_cap: null,
            curve_amo: null,
            cross_chain_liq: null,
            lending_amo: null,
            frax_3crv_tvl: null,
            frax_usd: null,
            t3crv_usd: null,
            curve3crv: null,
            unifraxusdc: null,
            unifraxdai: null,
            saddlenonfraxd4: null,
        }
    }

    componentDidMount() {

        axios.get('https://api.frax.finance/combineddata/')
        .then(res => {
            const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
            console.log('Status Code:', res.status);
            console.log('Date in Response header:', headerDate);

            const combineddata = res.data;

            //console.log(Object.keys(combineddata['liq_staking']))
            //console.log(combineddata["protocol"])

            var mkt_cap_data = combineddata['core']['frax']['market_cap'];
            var curve_amo_data = combineddata["protocol"]["amo"]["curve"]["curve_related_total"]
            var cross_chain_liq_data = combineddata["protocol"]["amo"]["liquidity"]["liquidity_related_total"]
            var lending_amo_data = combineddata["protocol"]["amo"]["lending"]["lending_related_total"]

            // these only give TVLs. To get value of stable, need to divide by 2 (assumption: uni pools are 50/50)
           // var unifraxusdc = combineddata['liq_staking']['Uniswap V3 FRAX/USDC']['tvl']
            //var unifraxdai = combineddata['liq_staking']['Uniswap V3 FRAX/DAI']['tvl']
            //var saddlenonfraxd4 = combineddata['liq_staking']['Saddle alUSD/FEI/FRAX/LUSD']['tvl']

            this.setState({
                mkt_cap: mkt_cap_data,
                curve_amo: curve_amo_data,
                cross_chain_liq: cross_chain_liq_data,
                lending_amo: lending_amo_data,
                // COMMENTED OUT BECAUSE TVL DATA IS ASSIGNED IN THE AXIOS.GET BELOW
                //unifraxdai: unifraxdai,
                //unifraxusdc: unifraxusdc,
                //saddlenonfraxd4: saddlenonfraxd4
            })
        }).catch(err => {
            console.log('Error: ', err.message);
        });

        axios.get('https://api.curve.fi/api/getPools/ethereum/main')
        .then(res => {
            const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
            console.log('Status Code:', res.status);
            console.log('Date in Response header:', headerDate);

            const curvedata = res.data;

            //console.log(Object.keys(curvedata['data']['poolData']['14']['usdTotal']))
            //console.log(curvedata['data']['poolData']['14']['usdTotal'])
            //console.log(curvedata['data']['poolData']['14']['coins']['0'])

            var tvl_data = curvedata['data']['poolData']['34']['usdTotal'];
            var balance_frax = curvedata['data']['poolData']['34']['coins']['0']['poolBalance'];
            var balance_3crv = curvedata['data']['poolData']['34']['coins']['1']['poolBalance'];
            
            var value_frax = parseInt(tvl_data) * (parseInt(balance_frax) / (parseInt(balance_3crv)+parseInt(balance_frax)));
            var value_3crv = parseInt(tvl_data) * (parseInt(balance_3crv) / (parseInt(balance_3crv)+parseInt(balance_frax)));  
       
            

            this.setState({
                frax_3crv_tvl: tvl_data,
                frax_usd: value_frax,
                t3crv_usd: value_3crv,
            })

        
               
        }).catch(err => {
            console.log('Error: ', err.message);
        });

        axios.get('https://frax-proto-api.herokuapp.com/locked_liquidity')
        .then(res => {
            const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
            console.log('Status Code:', res.status);
            console.log('Date in Response header:', headerDate);

            const fraxlpdata = res.data;

            console.log(Object.keys(fraxlpdata["Uniswap V3 FRAX/USDC"]['locks']['180'])) 
            console.log(fraxlpdata["Uniswap V3 FRAX/USDC"]['locks']['180']['balances_usd'][0])
            console.log(unifraxdai)
            
            var unifraxdai = fraxlpdata["Uniswap V3 FRAX/USDC"]['locks']['180']['balances_usd'][1];
            var unifraxusdc = fraxlpdata["Uniswap V3 FRAX/DAI"]['locks']['180']['balances_usd'][1];

            console.log(unifraxdai)
            

            this.setState({
                unifraxdai: unifraxdai,
                unifraxusdc: unifraxusdc,
                //saddlenonfraxd4: 
                
            })

        
               
        }).catch(err => {
            console.log('Error: ', err.message);
        });

    }

    


    render() {
        return ( 
            <div>
                <div className = "NonPOLContainer">
                    <h1 className="NonPOLHeader"> Circulating Non-POL FRAX </h1>
                    <div className = "dashboard">
                            <h3 className = "header">Total FRAX</h3>
                            <div> FRAX Mkt Cap: </div>
                            <div>${parseInt(this.state.mkt_cap).toLocaleString(undefined,{ minimumFractionDigits: 2})}</div>
                    </div>

                    <div className = "dashboard-container">
                    
                        <div className = "dashboard">
                            <h3 className = "header">POL FRAX</h3>
                            <div> Curve AMO: </div>
                            <div>${parseInt(this.state.curve_amo).toLocaleString(undefined,{ minimumFractionDigits: 2})}</div>
                        </div>

                        <div className = "dashboard">
                            <h3 className = "header">POL FRAX</h3>
                            <div> Cross chain liquidity: </div>
                            <div>${parseInt(this.state.cross_chain_liq).toLocaleString(undefined,{ minimumFractionDigits: 2})}</div>
                        </div>
                        
                        <div className = "dashboard">
                            <h3 className = "header">POL FRAX</h3>
                            <div> Lending AMO: </div>
                            <div>${parseInt(this.state.lending_amo).toLocaleString(undefined,{ minimumFractionDigits: 2})}</div>
                        </div>

                    </div>

                    <div className = "dashboard">
                            <h3 className = "header">Total Non-POL FRAX:</h3>
                            <div>${parseInt(this.state.mkt_cap-(this.state.curve_amo+this.state.cross_chain_liq+this.state.lending_amo)).
                            toLocaleString(undefined,{ minimumFractionDigits: 2})}</div>
                    </div>
                </div>

                <div className = "CRVContainer">

                    <h1 className="NonPOLHeader"> Amount of CRV Liquidity (To Absorb On-chain FRAX) </h1>

                    <div className = "dashboard-container">

                        <div className = "dashboard">
                            <h3 className = "header">FRAX-3CRV TVL</h3>
                            <div> TVL ($USD): </div>
                            <div>${parseInt(this.state.frax_3crv_tvl).toLocaleString(undefined,{ minimumFractionDigits: 2})}</div>
                        </div>
                    
                        <div className = "dashboard">
                            <h3 className = "header">FRAX Liquidty</h3>
                            <div> Liquidity ($USD):</div>
                            <div>${parseInt(this.state.frax_usd).toLocaleString(undefined,{ minimumFractionDigits: 2})}</div>
                        </div>

                        <div className = "dashboard">
                            <h3 className = "header">3CRV Liquidity</h3>
                            <div> Liquidity ($USD): </div>
                            <div>${parseInt(this.state.t3crv_usd).toLocaleString(undefined,{ minimumFractionDigits: 2})}</div>
                        </div>

                    </div>

                    <div className = "dashboard-container">
                            <div className = "dashboard">
                                <h3 className = "header">Non-POL LP</h3>
                                <div> Public LP ($USD): </div>
                                <div>${(parseInt(this.state.frax_3crv_tvl) - parseInt(this.state.curve_amo)).toLocaleString(undefined,{ minimumFractionDigits: 2})}</div>
                            </div>

                            <div className = "dashboard">
                                <h3 className = "header">Public LP unstake + sell FRAX to 3crv:</h3>
                                <div> Leftover 3CRV: </div>
                                <div>${(parseInt(this.state.t3crv_usd) - (parseInt(this.state.frax_3crv_tvl) - parseInt(this.state.curve_amo))).toLocaleString(undefined,{ minimumFractionDigits: 2})}</div>
                            </div>
                    </div>

                </div>

                <div className = "CRVContainer">

                    <h1 className="NonPOLHeader"> Total On-chain Liquidity (To Absorb On-chain FRAX) </h1>
                    <div className = "dashboard-container">
                            <div className = "dashboard">
                                <h3 className = "header">Curve</h3>
                                <div> Liquidity FRAX-3CRV ($): </div>
                                <div>${(parseInt(this.state.t3crv_usd) - (parseInt(this.state.frax_3crv_tvl) - parseInt(this.state.curve_amo))).toLocaleString(undefined,{ minimumFractionDigits: 2})}</div>
                            </div>

                            <div className = "dashboard">
                                <h3 className = "header">Uniswap</h3>
                                <div> Liquidity $FRAX-USDC ($): </div>
                                <div>${parseInt(this.state.unifraxusdc).toLocaleString(undefined,{ minimumFractionDigits: 2})}</div>
                            </div>

                            <div className = "dashboard">
                                <h3 className = "header">Uniswap</h3>
                                <div> Liquidity FRAX-DAI ($): </div>
                                <div>${parseInt(this.state.unifraxdai).toLocaleString(undefined,{ minimumFractionDigits: 2})}</div>
                            </div>

                            <div className = "dashboard">
                                <h3 className = "header">Saddle</h3>
                                <div> Liquidity Non-FRAX in D4 Pool ($): </div>
                                <div>${parseInt(this.state.saddlenonfraxd4).toLocaleString(undefined,{ minimumFractionDigits: 2})}</div>
                            </div>
                    </div>

                </div>

            </div>

        )
    }
}

export default Dashboards;
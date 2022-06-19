import React from "react";
import ReactDOM from "react-dom";
import Topbar from "./Topbar"
import Sidebar from "./sidebar";
import "./container.css"
import Home from "./home.js"
// import all the other components within container here


class Container extends React.Component {

    constructor() {
        super();

        this.state = {
            // ALL state variables go here
        }
    }

    render () {
        return (
            <div>
                <Topbar/>
                <div className = "container">
                    <Sidebar/>
                    
                    <div className="others">
                        <div className = "others-top-bar"> Put useful info here like price maybe </div>
                        <Home />
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default Container;
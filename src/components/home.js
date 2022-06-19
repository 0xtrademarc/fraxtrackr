import React from "react"
import ReactDOM from "react-dom"
import "./home.css"
import "./Dashboards/dashboards.css"
import Dashboards from "./Dashboards/dashboards.js"


const Home = () => {
    return (
        <div className = "home-component">
            <Dashboards/>
        </div>
    )
}

export default Home;
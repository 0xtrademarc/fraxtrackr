import React from "react";
import ReactDOM from "react-dom"
import "./topbar.css"
import { Twitter } from '@mui/icons-material/';

const Topbar = (props) => {
    return (
        <div className = "topbar">
            <div className="topbarWrapper">

                <div className = "topleft">
                    <div className = "logo">FRAX TRACKR</div>
                </div>

                <div className = "topRight">
                    <div className = "topbarIconContainer">
                        <a className = "donateButton">donate</a>
                        <Twitter className="twitterLogo"/>
                    </div>
                </div>

            </div>

        </div>

    )
}

export default Topbar;
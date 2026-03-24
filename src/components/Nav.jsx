import React from 'react'
import './Nav.scss'
import DateTime from './DateTime';
const Nav = () => {
    return (
        <div className="nav">
            <div className="left">
                <div className="apple-icon">
                    <img src="/nav-icons/apple.svg" alt="" />
                </div>
                <div className="nav-item">
                    <p>Devashish Sharma</p>
                </div>
                <div className="nav-item">
                    <p>File</p>
                </div>
                <div className="nav-item">
                    <p>Edit</p>
                </div>
                  <div className="nav-item">
                    <p>Window</p>
                </div>
                <div className="nav-item">
                    <p>Terminal</p>
                </div>
            </div>
            <div className="right">
                <div className="wifi-icon">
                    <img src="/nav-icons/wifi.svg" alt="WiFi" />
                </div>
                <div className="nav-item">
                    <DateTime />
                </div>
            </div>
        </div>
    )
}

export default Nav
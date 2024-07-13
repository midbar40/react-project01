import React from "react";
import '../styles/Loading.css'

const Loading: React.FC = () => {
    return (
        <div className="load">
            <div className="load-one"></div>
            <div className="load-two"></div>
            <div className="load-three"></div>
        </div>
    )
}

export default Loading
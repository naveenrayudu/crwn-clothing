import React from "react";
import "./menu-item.styles.scss";

const MenuItem: React.FC<{ title: string, imageUrl: string, size?: string }> = ({ title, imageUrl, size }) => {
    return (
        <div className={`${size} menu-item`}>
            <div style={{
                backgroundImage: `url(${imageUrl})`
            }} className="imageHolder" />
            <div className="content">
                <h1 className="title">{title}</h1>
                <span>SHOP NOW</span>
            </div>
        </div>
    );
};

export default MenuItem;

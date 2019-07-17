import React from "react";
import {withRouter} from 'react-router-dom';
import "./menu-item.styles.scss";
import { RouteComponentProps } from "react-router";


interface IRouterMenuItem extends RouteComponentProps {
    title: string, 
    imageUrl: string,
    size?: string, 
    linkUrl: string
}

const MenuItem: React.FC<IRouterMenuItem> = ({ title, imageUrl, size, linkUrl, history, match }) => {
    return (
        <div className={`${size} menu-item`} onClick={() => history.push(`${match.path}${linkUrl}`) }>
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

export default withRouter(MenuItem);

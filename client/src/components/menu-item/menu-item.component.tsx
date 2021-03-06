import React from "react";
import {withRouter} from 'react-router-dom';
import "./menu-item.styles.scss";
import { RouteComponentProps } from "react-router";
import { IDirectortItemData } from "../../models/interfaces/IItemData";


type IRouterMenuItem = RouteComponentProps & IDirectortItemData

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

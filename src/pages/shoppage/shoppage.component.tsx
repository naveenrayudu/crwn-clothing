import React from "react";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import { Route, match } from "react-router";
import CollectionsPage from "../../components/collections/collections.component";

type ShopPageType = {
    match: match
}

const ShopPage: React.FC<ShopPageType> = ({match}) => {
    return (
        <div className="shop-page">
            <Route exact path={`${match.path}`}  component={CollectionsOverview} />
            <Route path={`${match.path}/:collectionsId`} component={CollectionsPage}/>
        </div>
    );
}


export default ShopPage;

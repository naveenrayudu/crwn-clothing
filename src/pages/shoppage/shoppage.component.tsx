import React from "react";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import { Route, match } from "react-router";
import CollectionsPage from "../../components/collections/collections.component";
import { firestore, convertCollectionSnapshotToMap } from "../../firebase/firebase.util";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Shop_Data_Type } from "../../store/reducers/shop/shoppage.data";
import IDefaultAction from "../../models/interfaces/IActions";
import { ADD_COLLECTIONS } from "../../store/actions/actionTypes";

type ShopPageType = {
    match: match,
    addCollections: any
}

class ShopPage extends React.Component<ShopPageType>  {

    componentDidMount() {
        firestore.collection('collections').get()
            .then(collections => {
               this.props.addCollections(convertCollectionSnapshotToMap(collections));
            })
    }

    render() {
        const {match} = this.props;
        debugger;
        return (
         
            <div className="shop-page">
                <Route exact path={`${match.path}`}  component={CollectionsOverview} />
                <Route path={`${match.path}/:collectionsId`} component={CollectionsPage}/>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<IDefaultAction>) => {
    return {
        addCollections: (collection: Shop_Data_Type) => {
            dispatch({
                type: ADD_COLLECTIONS,
                payload: collection
            })
        }
    }
}

export default connect(null, mapDispatchToProps) (ShopPage);

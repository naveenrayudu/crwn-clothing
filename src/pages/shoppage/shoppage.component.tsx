import React from "react";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import { Route, match } from "react-router";
import CollectionsPage from "../../components/collections/collections.component";
import { firestore, convertCollectionSnapshotToMap } from "../../firebase/firebase.util";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import IDefaultAction from "../../models/interfaces/IActions";
import { ADD_COLLECTIONS } from "../../store/actions/actionTypes";
import { Shop_Data_Type } from "../../store/reducers/shop/shop.reducer";
import WithSpinner from "../../components/hoc/with-spinner/with-spinner.component";

type ShopPageType = {
    match: match,
    addCollections: any
}


class ShopPage extends React.Component<ShopPageType, {isLoading: boolean}>  {
    constructor(props: ShopPageType) {
        super(props);
        this.state = {
            isLoading :false
        }
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        })
        firestore.collection('collections').get()
            .then(collections => {
               this.props.addCollections(convertCollectionSnapshotToMap(collections));
               this.setState({
                isLoading: false
            })
            })
    }

    render() {
        const {match} = this.props;
        debugger;
        return (
         
            <div className="shop-page">
                <Route exact path={`${match.path}`} render={(props) => {
                      return  WithSpinner(CollectionsOverview)({
                            isLoading: this.state.isLoading,
                            otherProps: props
                        })
                    }
                }  />
                <Route path={`${match.path}/:collectionsId`} render={(props) => {
                      return  WithSpinner(CollectionsPage)({
                            isLoading: this.state.isLoading,
                            otherProps: props
                        })
                    }
                } />
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

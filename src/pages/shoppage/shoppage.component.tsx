import React from "react";
import IDefaultComponentProps from "../../models/interfaces/IDefaultComponentProps";
import ISHOP_DATA from "../../models/interfaces/IShopData";
import SHOP_DATA from "./shoppage.data";
import CollectionPreview from "../../components/collection-preview/collection-preview.component";

interface IShopPageComponentState {
    shopData: ISHOP_DATA[];
}

class ShopPage extends React.Component<
    IDefaultComponentProps,
    IShopPageComponentState
    > {
    constructor(props: IDefaultComponentProps) {
        super(props);
        this.state = {
            shopData: SHOP_DATA
        };
    }

    render() {
        return (
            <div className="shop-page">
              {
                  this.state.shopData.map(collection => (
                      <CollectionPreview {...collection} key={collection.id} />
                  ))
              }
            </div>
        );
    }
}

export default ShopPage;

import React from "react";
import ISHOP_DATA from "../../models/interfaces/IShopData";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import "./collection-preview.styles.scss";
import CollectionItem from "../collection-item/collection-item.component";
import IItemData from "../../models/interfaces/IItemData";
type CollectionPreviewStateType = {
  itemsToDisplay: IItemData[];
};

class CollectionPreview extends React.Component<
  ISHOP_DATA,
  CollectionPreviewStateType
> {
  itemsNumberToDisplay: number = 4;
  currentIterator: number = 0;
  showFetchNextButton: boolean = false;
  animationDirection: string = "";
  constructor(props: ISHOP_DATA) {
    super(props);
    this.state = {
      itemsToDisplay: []
    };
  }

  componentDidMount() {
    this.setState({
      itemsToDisplay: this.getShopItemsToShow()
    });
  }

  getShopItemsToShow = () => {
    let itemsToShow: IItemData[] = [];
    let i = 0;
    for (
      i = this.currentIterator * this.itemsNumberToDisplay;
      i < (this.currentIterator + 1) * this.itemsNumberToDisplay &&
      i < this.props.items.length;
      i++
    ) {
      const itemData: IItemData = { ...this.props.items[i] };
      itemsToShow.push(itemData);
    }

    this.showFetchNextButton = i < this.props.items.length;
    return itemsToShow;
  };

  updateshopItemsToShow = (increment: number, animationDirection: string) => {
    this.currentIterator = this.currentIterator + increment;
    this.animationDirection = animationDirection;
    this.setState({
      itemsToDisplay: this.getShopItemsToShow()
    });
  };

  render() {
    return (
      <div className="collection-preview">
        <h1 className="title">{this.props.title}</h1>
        <div className="preview">
          <TransitionGroup>
            <div className="preview-to-animate">
              {this.state.itemsToDisplay.map(item => (
                <CSSTransition
                  in={true}
                  key={item.id}
                  timeout={300}
                  classNames={`${this.animationDirection}`}
                >
                  <CollectionItem key={item.id} cartItem={item} />
                </CSSTransition>
              ))}
            </div>
          </TransitionGroup>

          <div
            className={`previous fetch-buttons ${
              this.currentIterator === 0 ? "hide" : ""
            }`}
            onClick={() => {
              this.updateshopItemsToShow(-1, "left");
            }}
          >
            &#10094;
          </div>

          <div
            className={`next fetch-buttons ${
              !this.showFetchNextButton ? "hide" : ""
            }`}
            onClick={() => {
              this.updateshopItemsToShow(1, "right");
            }}
          >
            &#10095;
          </div>
        </div>
      </div>
    );
  }
}

export default CollectionPreview;

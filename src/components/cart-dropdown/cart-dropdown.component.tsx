import React from 'react';
import {connect} from 'react-redux';
import CustomButton from '../custom-button/custom-button.component';

import './cart-dropdown.styles.scss';
import { AppState } from '../../store/reducers/rootReducer';
import { cartState } from '../../store/reducers/carts/cartReducer';


const CartDropdown: React.FC<cartState> = ({showCart}) => {
    return (
        <div className={`${!showCart? 'hideCart': ''} cart-dropdown`}>
            <div className="cart-items"></div>
            <CustomButton type="button" onClick={() => console.log('Clicked for checkout')}>GO TO CHECKOUT</CustomButton>
        </div>
    )
}

const mapStateToProps = (state: AppState) => {
    return {
        showCart: state.cart.showCart
    }
}

export default connect(mapStateToProps)(CartDropdown);
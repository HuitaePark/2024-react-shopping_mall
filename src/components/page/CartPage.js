import React, { useEffect, useState } from 'react';
import axios from 'axios';

import styled from 'styled-components';


import Header from "../ui/Header";
import Button from '../ui/Button'

const Wrapper = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    
`;

const CartSession= styled.div`
    width: 90%;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 50px;
    padding: 30px;
    border: 1px solid grey;
    border-radius: 8px;
    margin-bottom: 50px;
`;



const PaySession= styled.div`

    width: 90%;
    background: white;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    border: 1px solid grey;
    padding: 30px;
    
`;



const TitleText = styled.p`
    font-size: 27px;
    font-weight: 600;
    
`;

const DescriptionText = styled.p`
    font-size: 20px;
    font-weight: 500;
`;

const StyledImage = styled.img`
	width: 300px;
    height: 300px;
    display: inline-block;
    
`;

function CartPage(){
    const [cartItems, setCartItems] =useState([]);
    useEffect(() => {
        const fetchProductData = async () => {
            const cart = JSON.parse(localStorage.getItem('cart')) || {};
            const productIds = Object.keys(cart);
            const productData = [];

            for (let id of productIds) {
                const response = await axios.get(`https://dummyjson.com/products/${id}`);
                const product = response.data;
                product.quantity = cart[id];
                productData.push(product);
            }

            setCartItems(productData);
        };

        fetchProductData();
    }, []);
    const calculateTotalPrice = () => {
        let total = 0;
        for (let item of cartItems) {
            total += item.price * item.quantity;
        }
        return total;
    }

    return (
        <Wrapper>
            <Header></Header>
            <CartSession>
                {cartItems.map(item => (
                    <div key={item.id}>
                        <StyledImage src={item.thumbnail} alt={item.title} />
                        <div>
                            <TitleText>{item.title}</TitleText>
                            <DescriptionText>수량 : {item.quantity}</DescriptionText>
                            <DescriptionText>가격 :{item.price*item.quantity}</DescriptionText>
                        </div>
                    </div>
                ))}
            </CartSession>
            <PaySession>
                <DescriptionText>총 상품 가격: {calculateTotalPrice()}</DescriptionText>
                <DescriptionText>배송비 : 무료</DescriptionText>
                <TitleText>총 결제 금액: {calculateTotalPrice()}$</TitleText>
                <Button>결제하기</Button>
            </PaySession>
        </Wrapper>
    );
}


export default CartPage;
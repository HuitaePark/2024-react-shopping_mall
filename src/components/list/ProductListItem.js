import React from 'react';

import styled from 'styled-components';

import Button from '../ui/Button'

const Wrapper = styled.div`
    padding: 30px;
    flex-basis: 500px;
    border: 1px solid grey;
    border-radius: 8px;
    cursor: pointer;
    background: white;
    margin-bottom: 50px;
`

const TitleText = styled.p`
    font-size: 27px;
    font-weight: 600;
`
const DescriptionText = styled.p`
    font-size: 20px;
    font-weight: 500;
`

const Categorybanner = styled.p`
    font-size: 20px;
    font-weight: 500;
    display: inline-block;
    padding: 10px;
    border: 2px solid black;
    border-radius: 8px;
`

const StyledImage = styled.img`
    width: 500px;
    height: 500px;
    display: block;
`


function ProductListItem(props){

    const {product, onClick} = props;

    return(

        <Wrapper onClick={onClick}>
                <StyledImage src={product.thumbnail}></StyledImage>
                <Categorybanner>{product.category}</Categorybanner>
            <TitleText>{product.title}</TitleText>
            <DescriptionText>{product.description}</DescriptionText>
            <Button>구매하기</Button>
        </Wrapper>

    );
}


export default ProductListItem;
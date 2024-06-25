import React, {useState, useEffect} from 'react';

import styled from 'styled-components';

import axios from 'axios';

import { useParams, useNavigate } from 'react-router-dom';

import Button from '../ui/Button';
import Header from "../ui/Header";

const Wrapper = styled.div`

    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const DetailProductSession= styled.div`

    width: 40%;
    padding: 30px;
    border: 1px solid grey;
    border-radius: 8px;
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    
`;

const PrevNextProductSession= styled.div`

    width: 100%;
   
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 50px;
  
    
`;

const ButtonProductSession= styled.button`

    width: 20%;
    padding: 30px;
    border: 1px solid grey;
    border-radius: 8px;
    background: white;
    text-align: center;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
`;

const TitleText = styled.p`
    font-size: 27px;
    font-weight: 600;
    
`;

const DescriptionText = styled.p`
    font-size: 20px;
    font-weight: 500;
`;
const Categorybanner = styled.p`
    font-size: 20px;
    font-weight: 500;
    display: inline-block;
    padding: 10px;
    border: 2px solid black;
    border-radius: 8px;
    text-align: center;
`;

const StyledImage = styled.img`
	width: 700px;
    height: 700px;
    display: inline-block;
    
`;
const StyledButtonImage = styled.img`
    width: 50px;
    height: 50px;
    display: inline-block;
`;


function DetailPage(){

    const prevProduct = () => {
        if (productId > 1) {
            navigate(`/detail/${parseInt(productId) - 1}`);
        }
    };

    const nextProduct = () => {
        navigate(`/detail/${parseInt(productId) + 1}`);
    };
    const {productId} = useParams();
    const navigate = useNavigate();
    const [prevProductData, setPrevProductData] = useState(null);
    const [nextProductData, setNextProductData] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const addToCart = (product) => {
        try {
            let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
            let id = product.id.toString();
            cart[id] = (cart[id] ? cart[id] : 0);
            let qty = cart[id] + 1;
            cart[id] = qty;
            localStorage.setItem('cart', JSON.stringify(cart));

            // 장바구니에 상품을 추가한 후에는 장바구니 페이지로 이동합니다.
            navigate('/cart');
        } catch (error) {
            console.error("Error adding item to cart: ", error);
        }
    };
    useEffect(()=>{

        const fetchData = async () =>{
            try{

                setError(null);
                setData(null);
                setLoading(true);

                const response = await axios.get(
                    `https://dummyjson.com/products/${productId}`
                )

                setData(response.data);


            }catch(error){
                setError(error);
            }
            setLoading(false);

        }
        fetchData();

    },[productId]);
    useEffect(() => {
        const fetchPrevNextData = async () => {
            if (productId > 1) {
                const prevResponse = await axios.get(
                    `https://dummyjson.com/products/${parseInt(productId) - 1}`
                );
                setPrevProductData(prevResponse.data);
            }

            const nextResponse = await axios.get(
                `https://dummyjson.com/products/${parseInt(productId) + 1}`
            );
            setNextProductData(nextResponse.data);
        };

        fetchPrevNextData();
    }, [productId]);

    if(loading) return <div>로딩중..</div>
    if(error) return <div>에러가 발생했습니다</div>
    if(!data) return null;


        return(

            <Wrapper>
                <Header></Header>
                <DetailProductSession>
                    <StyledImage src={data.thumbnail}></StyledImage>
                    <Categorybanner>{data.category}</Categorybanner>
                    <TitleText>{data.title}</TitleText>
                    <DescriptionText>{data.description}</DescriptionText>
                    <TitleText>{data.price}$</TitleText>
                    <Button  onClick={() => addToCart(data)}>장바구니 담기</Button>
                </DetailProductSession>

                {<PrevNextProductSession>
                    {prevProductData && (
                        <ButtonProductSession onClick={prevProduct}>
                            <Categorybanner>PREV</Categorybanner>
                            <StyledButtonImage src={prevProductData.thumbnail} />
                            <TitleText>{prevProductData.title}</TitleText>
                        </ButtonProductSession>
                    )}
                    {nextProductData && (
                        <ButtonProductSession onClick={nextProduct}>
                            <Categorybanner>NEXT</Categorybanner>
                            <StyledButtonImage src={nextProductData.thumbnail} />
                            <TitleText>{nextProductData.title}</TitleText>
                        </ButtonProductSession>
                    )}
                </PrevNextProductSession>}

            </Wrapper>

        );



}

export default DetailPage;
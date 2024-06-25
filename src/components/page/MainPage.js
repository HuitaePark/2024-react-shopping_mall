import React, {useState, useEffect}  from 'react';
import styled from 'styled-components';
import Header from '../ui/Header';
import ProductList from '../list/ProductList';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

function MainPage(){

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    const navigate = useNavigate();

    useEffect(()=>{

        const fetchData = async () =>{

            try{
                setError(null);

                setLoading(true);

                const response = await axios.get(
                    'https://dummyjson.com/products?limit=0')
                setData(response.data.products);
                //console.log(response);
                const uniqueCategories = [...new Set(response.data.products.map(product => product.category))];
                setCategories(uniqueCategories);
            }catch(error){
                setError(error);
            }
            setLoading(false);

        }
        fetchData();

    },[]);
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const filteredProducts = selectedCategory
        ? data.filter(product => product.category === selectedCategory)
        : data;
    if(loading) return <div>로딩중...</div>;
    if(error) return <div>에러가 발생했습니다.</div>;
    if(!data) return null;

    return(
        <Wrapper>
            <Header></Header>
            <select value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">All</option>
                {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>
            <ProductList
             products={filteredProducts}
             onClickItem = {(item)=>{navigate(`/detail/${item.id}`)}}
            ></ProductList>
        </Wrapper>
    );
}

export default MainPage;
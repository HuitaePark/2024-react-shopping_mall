import React from 'react';

import styled from 'styled-components';

const StyledButton = styled.button`
    padding: 20px 16px;
    font-size: 20px;
    border-width: 0px;
    border-radius: 8px;
    cursor: pointer;
    background: black;
    color: #fff;
    width: 100%;
    margin-bottom: 30px;
`

const Button = ({ onClick, children }) => {

    return <StyledButton onClick={onClick}>{children}</StyledButton>;
};
export default Button;
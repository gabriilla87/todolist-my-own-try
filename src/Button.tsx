import React from 'react';

type ButtonPropsType = {
    title: string
    onClick?: () => void
    className?: string
}

export const Button = ({title, onClick, className}: ButtonPropsType) => {
   const onClickButtonHandler = () => {
       if(onClick) onClick()
   }

    return (
        <button className={className} onClick={onClickButtonHandler}>{title}</button>
    );
};


import React from 'react';
import ReactLoading from 'react-loading';

const Loading = ({ type, color, height, width }) => (
    <ReactLoading type={type} color={color} height={200} width={200} />
);

export default Loading;
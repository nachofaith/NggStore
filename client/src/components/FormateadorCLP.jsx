import React from 'react';

const FormatCLP = ({ precio }) => {
    const formatoCLP = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });

    return (
        <span>
            {formatoCLP.format(precio)}
        </span>
    );
};

export default FormatCLP;

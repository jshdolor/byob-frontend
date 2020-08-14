import React from 'react';

const CFDividerHeader = ({ title, action = '' }) => {
    return (
        <div className="divider-header">
            <h1>{title}</h1>
            <span>{action}</span>
        </div>
    );
};

export default CFDividerHeader;

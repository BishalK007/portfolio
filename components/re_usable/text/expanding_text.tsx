import React, { useState } from 'react';

interface ExpandingTextProps {
    text: string,
    expandedHeight: number,
}

const ExpandingText: React.FC<ExpandingTextProps> = ({
    text,
    expandedHeight,
}) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    if (expanded) {
        return (
            <div onClick={toggleExpand} style={{ overflow: 'auto', maxHeight: `${expandedHeight}px` }}>
                <div className="" style={{
                    height: expandedHeight
                }}>
                    {text}
                </div>
            </div>
        )
    }
    return (
        <div
            className={`overflow-hidden `}
            style={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                WebkitLineClamp: 2,
            }}
            onClick={toggleExpand}
        >
            {text}
        </div>

    );
};

export default ExpandingText;

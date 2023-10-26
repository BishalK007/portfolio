import React, { useRef, useState } from 'react';

interface ExpandingTextProps {
    text: string,
    expandedHeight: number,
}

const ExpandingText: React.FC<ExpandingTextProps> = ({
    text,
    expandedHeight,
}) => {
    const [expanded, setExpanded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const makeExpanded = () => {
        if(containerRef.current && containerRef.current?.scrollHeight > containerRef.current?.clientHeight)
            setExpanded(!expanded);
    };
    const makeRetracted = () => {
        setExpanded(!expanded);
    };

    if (expanded) {
        return (
            <div onClick={makeRetracted} style={{ overflow: 'auto', maxHeight: `${expandedHeight}px` }}>
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
            ref={containerRef}
            style={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                WebkitLineClamp: 2,
            }}
            onClick={makeExpanded}
            
        >
            {text}
        </div>

    );
};

export default ExpandingText;

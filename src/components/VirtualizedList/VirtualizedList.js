import React, { useState } from 'react';
import "./VirtualizedList.css"

const VirtualizedList = ({ numItems, itemHeight, renderItem, windowHeight }) => {

  const [scrollTop, setScrollTop] = useState(0);

  const innerHeight = numItems * itemHeight;
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    numItems - 1, // don't render past the end of the list
    Math.floor((scrollTop + windowHeight) / itemHeight)
  );

  const items = [];
  for (let i = startIndex; i <= endIndex; i++) {
    items.push(
      renderItem({
        index: i,
        style: {
          position: "absolute",
          top: `${i * itemHeight}px`,
          width: "100%"
        }
      })
    );
  }

  const onScroll = e => setScrollTop(e.currentTarget.scrollTop);

  return (
    <div className="scroll" style={{ overflowY: "scroll", height: windowHeight }} onScroll={onScroll}>
      <div
        className="inner"
        style={{ position: "relative", height: `${innerHeight}px` }}
      >
        {items}
      </div>
    </div>
  );
};

export default VirtualizedList;
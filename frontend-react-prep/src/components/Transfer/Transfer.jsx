import React, { useState } from 'react';

// Convert array to object with selection state
const createListState = (items) =>
  items.reduce((acc, item) => ({ ...acc, [item]: false }), {});

// Extract selected items
const getSelectedItems = (list) =>
  Object.entries(list).filter(([_, selected]) => selected).map(([key]) => key);

// Remove specific keys from list
const removeItems = (list, keysToRemove) => {
  const updated = { ...list };
  keysToRemove.forEach((key) => delete updated[key]);
  return updated;
};

const TransferList = ({ title, items, onToggle, side }) => (
  <div>
    <h3>{title}</h3>
    {Object.entries(items).map(([item, selected]) => (
      <label key={item} style={{ display: 'block' }}>
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onToggle(side, item)}
        />
        {item}
      </label>
    ))}
  </div>
);

export const Transfer = () => {
  const [leftList, setLeftList] = useState(
    createListState(['html', 'css', 'js'])
  );
  const [rightList, setRightList] = useState(
    createListState(['python', 'java', 'react.js'])
  );

  const handleToggle = (side, item) => {
    const updater = side === 'left' ? setLeftList : setRightList;
    const currentList = side === 'left' ? leftList : rightList;
    updater({ ...currentList, [item]: !currentList[item] });
  };

  const transferSelected = (fromLeftToRight) => {
    const fromList = fromLeftToRight ? leftList : rightList;
    const toList = fromLeftToRight ? rightList : leftList;
    const setFrom = fromLeftToRight ? setLeftList : setRightList;
    const setTo = fromLeftToRight ? setRightList : setLeftList;

    const selectedItems = getSelectedItems(fromList);
    const newItems = createListState(selectedItems);

    setTo({ ...toList, ...newItems });
    setFrom(removeItems(fromList, selectedItems));
  };

  const transferAll = (fromLeftToRight) => {
    const fromList = fromLeftToRight ? leftList : rightList;
    const toList = fromLeftToRight ? rightList : leftList;
    const setFrom = fromLeftToRight ? setLeftList : setRightList;
    const setTo = fromLeftToRight ? setRightList : setLeftList;

    const allItems = Object.keys(fromList);
    const newItems = createListState(allItems);

    setTo({ ...toList, ...newItems });
    setFrom({});
  };

  return (
    <div style={{ display: 'flex', gap: '30px', justifyContent: 'center' }}>
      <TransferList title="Left List" items={leftList} onToggle={handleToggle} side="left" />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button onClick={() => transferAll(false)}>&lt;&lt;</button>
        <button
          onClick={() => transferSelected(false)}
          disabled={!getSelectedItems(rightList).length}
        >
          &lt;
        </button>
        <button
          onClick={() => transferSelected(true)}
          disabled={!getSelectedItems(leftList).length}
        >
          &gt;
        </button>
        <button onClick={() => transferAll(true)}>&gt;&gt;</button>
      </div>

      <TransferList title="Right List" items={rightList} onToggle={handleToggle} side="right" />
    </div>
  );
};

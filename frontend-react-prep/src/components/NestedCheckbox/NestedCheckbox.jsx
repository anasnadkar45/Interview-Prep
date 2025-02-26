import React, { useState } from 'react';
import data from './data.json';

const CheckboxItem = ({ checkbox, onToggle }) => {
    const handleCheckboxChange = () => {
        onToggle(checkbox.id);
    };

    return (
        <div>
            <div key={checkbox.id} style={{ display: 'flex', gap: '10px' }}>
                <input
                    type="checkbox"
                    checked={checkbox.isChecked}
                    onChange={handleCheckboxChange}
                />
                <span>{checkbox.title}</span>
            </div>

            {checkbox.children && checkbox.children.length > 0 && (
                <div style={{ paddingLeft: '20px' }}>
                    {checkbox.children.map((child) => (
                        <CheckboxItem key={child.id} checkbox={child} onToggle={onToggle} />
                    ))}
                </div>
            )}
        </div>
    );
};

const NestedCheckbox = () => {
    const [checkboxes, setCheckboxes] = useState(data);

    const toggleCheckbox = (checkboxId) => {
        const updateCheckboxes = (items) => {
            return items.map((item) => {
                if (item.id === checkboxId) {
                    return { ...item, isChecked: !item.isChecked };
                }

                if (item.children && item.children.length > 0) {
                    return { ...item, children: updateCheckboxes(item.children) };
                }

                return item;
            });
        };

        setCheckboxes((prev) => updateCheckboxes([prev])[0]);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'start' }}>
            <CheckboxItem checkbox={checkboxes} onToggle={toggleCheckbox} />
        </div>
    );
};

export default NestedCheckbox;

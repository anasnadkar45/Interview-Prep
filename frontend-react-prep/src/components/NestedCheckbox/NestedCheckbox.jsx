import React, { useState } from 'react'
import data from './data.json'
import { Checkbox } from './Checkbox'

const NestedCheckbox = () => {
  const [checkboxes, setCheckboxes] = useState(data)

  const handleCheckbox = (checkboxId) => {
    const updatedCheckboxes = toggleCheckbox(checkboxes, checkboxId)
    setCheckboxes(updatedCheckboxes)
  }

  const toggleCheckbox = (node, checkboxId) => {
    if (node.id === checkboxId) {
      const newChecked = !node.isChecked
      return {
        ...node,
        isChecked: newChecked,
        children: node.children?.map(child => updateChildren(child, newChecked)) || [],
      }
    }

    return {
      ...node,
      children: node.children?.map(child => toggleCheckbox(child, checkboxId)) || [],
    }
  }

  const updateChildren = (node, isChecked) => ({
    ...node,
    isChecked,
    children: node.children?.map(child => updateChildren(child, isChecked)) || [],
  })

  return (
    <div>
      <Checkbox data={checkboxes} handleCheckbox={handleCheckbox} />
    </div>
  )
}

export default NestedCheckbox

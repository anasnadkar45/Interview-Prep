import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addHabit } from '../features/habits/habitSlice';

const frequencyData = ['daily', 'weekly', 'monthly', 'yearly'];
const HabitForm = () => {
    const [name, setName] = useState('');
    const [frequency, setFrequency] = useState(frequencyData[0]);
    const dispatch = useDispatch()
    return (
        <div className='flex flex-col gap-2 w-full'>
            <input type="text" onChange={(e) => setName(e.target.value)} />
            <select name="frequency" onChange={(e) => setFrequency(e.target.value)}>
                {frequencyData.map((freq) => (
                    <option key={freq} value={freq}>{freq}</option>
                ))}
            </select>
            <button onClick={() => dispatch(addHabit({ name, frequency }))}>ADD HABIT</button>
        </div>
    )
}

export default HabitForm
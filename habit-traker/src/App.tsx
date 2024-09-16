import { useState } from 'react'
import HabitForm from './components/HabitForm'
import { useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';
// import './App.css'

function App() {
  const habits = useSelector((state: any) => state.habit.habits);
  return (
    <div className='w-full'>
      <h1 className='text-2xl font-bold text-green-500 text-center'>Habit Tracker</h1>
      <HabitForm />
      <ul className='w-full pt-2 scroll-py-3'>
        {habits.map((habit: any, index: number) => (
          <li key={index} className='flex justify-between gap-20'>
            <div>
              <h2>{habit.name}</h2>
              <p>{habit.frequency}</p>
            </div>
            <div className='flex items-start gap-3'>
              <button>MARK COMPLETED</button>
              <button>REMOVE</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App

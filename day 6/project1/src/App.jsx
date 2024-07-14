import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
    </>
  )
}

export default App

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState();

//   function FormHandler() {
//     if (firstName.length === 0) {
//       alert('please enter first name');
//     }
//     else if (lastName.length === 0){
//       alert('please enter last name');
//     }
//     else if (email.length === 0) {
//       alert('please enter email');
//     }
//     else if(phoneNumber.length === 0) {
//       alert('please enter phone number');
//     }
//   }

//   return (
//     <>
//       <form className='form' onSubmit={FormHandler}>
//         <label htmlFor="FirstName" ></label>
//         <input
//           className='FirstName'
//           name='FirstName'
//           placeholder='FirstName'
//           type="text"
//           onChange={(e) => {
//             e.preventDefault();
//             setFirstName(e.target.value);
//           }}
//         />
//         <input
//           className='LastName'
//           placeholder='LastName'
//           type="text"
//           onChange={(e) => {
//             e.preventDefault();
//             setLastName(e.target.value);
//           }}
//         />
//         <input
//           className='Email'
//           placeholder='Email'
//           type="email"
//           onChange={(e) => {
//             e.preventDefault();
//             setEmail(e.target.value);
//           }}
//         />
//         <input
//           className='PhoneNumber'
//           placeholder='PhoneNumber'
//           type="tel"
//           onChange={(e) => {
//             e.preventDefault();
//             setPhoneNumber(e.target.value);
//           }}
//         />

//         <button type='submit'>Submit</button>
//       </form>
//     </>
//   )
// }

// export default App

import React, { useEffect, useState } from 'react';

const CheckStrength = ({ password }) => {
    const [strength, setStrength] = useState(0);
    const [strengthText, setStrengthText] = useState('');

    useEffect(() => {
        const numberRegex = /\d/; // Checks for digits
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/; // Checks for special characters
        const upperCaseRegex = /[A-Z]/; // Checks for uppercase letters
        const lowerCaseRegex = /[a-z]/; // Checks for lowercase letters

        const hasNumber = numberRegex.test(password);
        const hasSpecialChar = specialCharRegex.test(password);
        const hasUpperCase = upperCaseRegex.test(password);
        const hasLowerCase = lowerCaseRegex.test(password);

        let newStrength = 0;
        const passwordLength = password.length;

        if (passwordLength < 3) {
            newStrength = 0;
        } else {
            if (passwordLength >= 6 && passwordLength <= 10) {
                newStrength += 3; // Max 5 points for length
            }
            if (passwordLength >10 && passwordLength <= 34) {
                newStrength += 3; // Max 5 points for length
            }
            if (hasUpperCase) newStrength += 1;
            if (hasLowerCase) newStrength += 1;
            if (hasNumber) newStrength += 1;
            if (hasSpecialChar) newStrength += 1;
        }

        setStrength(newStrength * 10);
        console.log(strength);

        if (newStrength > 8) {
            setStrengthText('Strong');
        } else if (newStrength > 6 || newStrength <= 8) {
            setStrengthText('Moderate');
        } else if (newStrength > 3 || newStrength <= 6) {
            setStrengthText('Weak');
        } else {
            setStrengthText('Weak');
        }
    }, [password]);

    return (
        <div>
            {/* <span>Password Strength: {strengthText}</span> */}
            <div className='progress-bar'>
                <div className='progress' style={{ width: `${strength}%` }}></div>
            </div>
        </div>
    );
}

export default CheckStrength;

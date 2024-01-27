
import React, { useState, useEffect } from 'react';
import styles from './calculator.module.css';

export default function Calculator() {

    const [inputValue, setInputValue] = useState('');

    const handleButtonClick = (value) => {
        if (value === '') {
            setInputValue(inputValue.slice(0, -1));
        } else if (value === '=') {
            try {
                const result = evaluateExpression(inputValue);
                setInputValue(String(result));
            } catch (error) {
                setInputValue('Error');
            }
        } else {
            if (value === '.') {
                const lastNum = inputValue.split(/[-+*/]/).pop();
                if (!lastNum.includes('.')) {
                    setInputValue(inputValue + value);
                }
            } else {
                setInputValue(inputValue + value);
            }
        }
    };

    const evaluateExpression = (exp) => {
        const cleanExpB = exp.replace(/x/g, '*');

        const correctedExp = cleanExpB.replace(/\b0+(\d+\.?\d*)/g, '$1');

        return Function(`'use strict'; return (${correctedExp})`)();
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };


    const handleEnterPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            try {
                const result = evaluateExpression(inputValue);
                setInputValue(String(result));
            } catch (error) {
                setInputValue('Error');
            }
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleEnterPress);
        return () => {
            document.removeEventListener('keydown', handleEnterPress);
        };
    }, [inputValue]);


    return (
        <div className={styles.background}>
            <div className={styles.calculator}>
                <div className={styles.layout}>
                    <input type='text' value={inputValue} className={styles.display} onChange={handleInputChange} />
                    <div className={styles.buttonsLayout}>
                        <button onClick={() => handleButtonClick('1')} className={styles.button}>1</button>
                        <button onClick={() => handleButtonClick('2')} className={styles.button}>2</button>
                        <button onClick={() => handleButtonClick('3')} className={styles.button}>3</button>
                        <button onClick={() => handleButtonClick('*')} className={styles.button}>x</button>
                        <button onClick={() => handleButtonClick('4')} className={styles.button}>4</button>
                        <button onClick={() => handleButtonClick('5')} className={styles.button}>5</button>
                        <button onClick={() => handleButtonClick('6')} className={styles.button}>6</button>
                        <button onClick={() => handleButtonClick('-')} className={styles.button}>-</button>
                        <button onClick={() => handleButtonClick('7')} className={styles.button}>7</button>
                        <button onClick={() => handleButtonClick('8')} className={styles.button}>8</button>
                        <button onClick={() => handleButtonClick('9')} className={styles.button}>9</button>
                        <button onClick={() => handleButtonClick('+')} className={styles.button}>+</button>
                        <button onClick={() => handleButtonClick('')} className={styles.button}>🠔</button>
                        <button onClick={() => handleButtonClick('0')} className={styles.button}>0</button>
                        <button onClick={() => handleButtonClick('.')} className={styles.button}>.</button>
                        <button onClick={() => handleButtonClick('=')} className={styles.button}>=</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
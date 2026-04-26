import React, { useState } from 'react';
import './MortgageCalculator.css';

const MortgageCalculator = ({ price }) => {
  const [downPayment, setDownPayment] = useState(price * 0.2);
  const [interestRate, setInterestRate] = useState(5.5);
  const [loanTerm, setLoanTerm] = useState(30);

  const calculateMortgage = () => {
    const principal = price - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (monthlyRate === 0) return principal / numberOfPayments;

    const monthlyPayment = 
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    return isNaN(monthlyPayment) ? 0 : monthlyPayment.toFixed(2);
  };

  return (
    <div className="mortgage-calculator glass-panel mt-lg">
      <h3>Mortgage Calculator</h3>
      <div className="calc-grid mt-md">
        <div className="input-group">
          <label>Property Price ($)</label>
          <input type="number" value={price} readOnly />
        </div>
        <div className="input-group">
          <label>Down Payment ($)</label>
          <input 
            type="number" 
            value={downPayment} 
            onChange={(e) => setDownPayment(Number(e.target.value))} 
          />
        </div>
        <div className="input-group">
          <label>Interest Rate (%)</label>
          <input 
            type="number" 
            step="0.1" 
            value={interestRate} 
            onChange={(e) => setInterestRate(Number(e.target.value))} 
          />
        </div>
        <div className="input-group">
          <label>Loan Term (Years)</label>
          <select value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))}>
            <option value={15}>15 Years</option>
            <option value={20}>20 Years</option>
            <option value={30}>30 Years</option>
          </select>
        </div>
      </div>
      <div className="calc-result mt-md">
        <div className="text-muted">Estimated Monthly Payment:</div>
        <div className="result-amount text-gradient">${calculateMortgage()}</div>
      </div>
    </div>
  );
};

export default MortgageCalculator;

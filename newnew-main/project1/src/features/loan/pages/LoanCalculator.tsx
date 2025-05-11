import React from 'react';
import { Calculator } from 'lucide-react';
import EMICalculator from '../components/EMICalculator';

const LoanCalculator: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">EMI Calculator</h1>
        <p className="mt-2 text-gray-600">
          Calculate your Equated Monthly Installment (EMI) based on loan amount, interest rate, and tenure.
        </p>
      </div>

      <div className="bg-indigo-50 rounded-lg p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="bg-indigo-100 rounded-full p-3 flex-shrink-0">
            <Calculator className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-2">Understanding EMI Calculation</h2>
            <p className="text-gray-700">
              EMI stands for Equated Monthly Installment. It's the fixed amount you pay to the bank every month until the loan is fully repaid. 
              The EMI consists of the principal amount and the interest on your loan.
            </p>
            <div className="mt-4 p-3 bg-white rounded-md border border-indigo-100">
              <p className="text-sm font-medium text-gray-800">EMI Formula:</p>
              <p className="text-sm text-gray-600 mt-1">
                EMI = P × r × (1 + r)<sup>n</sup> ÷ [(1 + r)<sup>n</sup> - 1]
              </p>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-medium">P</span> = Principal loan amount
                </div>
                <div>
                  <span className="font-medium">r</span> = Monthly interest rate
                </div>
                <div>
                  <span className="font-medium">n</span> = Loan tenure in months
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EMICalculator initialPrincipal={2500000} initialInterestRate={8.5} initialTenure={240} />

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">EMI Calculation Tips</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-2 text-gray-700">Factors Affecting EMI</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Loan amount - Higher loan amount means higher EMI</li>
              <li>Interest rate - Higher interest rate leads to higher EMI</li>
              <li>Loan tenure - Longer tenure reduces EMI but increases total interest paid</li>
              <li>Repayment schedule - Monthly, quarterly, or annually</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2 text-gray-700">How to Reduce Your EMI</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Opt for a longer loan tenure</li>
              <li>Make a larger down payment to reduce principal</li>
              <li>Look for loans with lower interest rates</li>
              <li>Maintain a good credit score to qualify for better rates</li>
              <li>Consider balance transfer to a loan with lower interest rate</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;
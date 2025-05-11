import React from 'react';
import { BankLoan } from '../data/bankData';
import { calculateEMI, formatCurrency, formatPercentage, calculateProcessingFee } from '../utils/emiCalculator';
import { ArrowRight, CheckCircle2, AlertCircle, Info } from 'lucide-react';

interface LoanCardProps {
  loan: BankLoan;
  onCompare: (loan: BankLoan) => void;
  isCompared: boolean;
}

const LoanCard: React.FC<LoanCardProps> = ({ loan, onCompare, isCompared }) => {
  // Calculate example EMI for a standard loan amount
  const exampleLoanAmount = loan.loanType === 'home' ? 3000000 : 500000; // 30 lakhs for home, 5 lakhs for personal
  const exampleTenure = loan.loanType === 'home' ? 240 : 36; // 20 years for home, 3 years for personal
  const exampleInterestRate = (loan.interestRate.min + loan.interestRate.max) / 2;
  const exampleEMI = calculateEMI(exampleLoanAmount, exampleInterestRate, exampleTenure);
  
  // Calculate processing fee
  const processingFee = calculateProcessingFee(
    exampleLoanAmount,
    loan.processingFee.type,
    loan.processingFee.value,
    loan.processingFee.minAmount,
    loan.processingFee.maxAmount
  );

  // Get loan color based on type
  const getLoanTypeColor = () => {
    switch (loan.loanType) {
      case 'home':
        return 'bg-blue-100 text-blue-800';
      case 'personal':
        return 'bg-green-100 text-green-800';
      case 'auto':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center">
          <img 
            src={loan.bankLogo} 
            alt={`${loan.bankName} logo`}
            className="h-10 w-auto mr-3"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{loan.bankName}</h3>
            <div className={`text-xs font-medium px-2 py-0.5 rounded-full inline-block ${getLoanTypeColor()} capitalize`}>
              {loan.loanType} Loan
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Interest Rate</div>
          <div className="font-semibold text-indigo-600">
            {formatPercentage(loan.interestRate.min)} - {formatPercentage(loan.interestRate.max)}
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-sm text-gray-500">Loan Amount</div>
            <div className="font-medium">
              {formatCurrency(loan.principalLimits.min)} - {formatCurrency(loan.principalLimits.max)}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Tenure</div>
            <div className="font-medium">
              {loan.tenureRange.min / 12} - {loan.tenureRange.max / 12} Years
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-lg mb-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-500">Example EMI</div>
              <div className="font-semibold text-lg text-indigo-600">{formatCurrency(exampleEMI)}/month</div>
            </div>
            <div className="text-xs text-gray-500">
              <div>For {formatCurrency(exampleLoanAmount)}</div>
              <div>at {exampleInterestRate.toFixed(2)}% for {exampleTenure / 12} years</div>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="text-sm font-medium text-gray-700 mb-2">Key Features</div>
          <ul className="space-y-1">
            {loan.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <Info className="h-4 w-4 text-gray-400 mr-2" />
          <span>
            Processing Fee: {loan.processingFee.type === 'percentage' ? `${loan.processingFee.value}%` : formatCurrency(loan.processingFee.value)}
            {loan.processingFee.minAmount && ` (Min: ${formatCurrency(loan.processingFee.minAmount)})`}
            {loan.processingFee.maxAmount && ` (Max: ${formatCurrency(loan.processingFee.maxAmount)})`}
          </span>
        </div>
        
        <button
          onClick={() => onCompare(loan)}
          className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-colors duration-200 ${
            isCompared 
              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {isCompared ? 'Remove from Comparison' : 'Add to Comparison'}
          {!isCompared && <ArrowRight className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
};

export default LoanCard;
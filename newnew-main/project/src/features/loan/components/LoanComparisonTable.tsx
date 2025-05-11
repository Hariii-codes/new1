import React from 'react';
import { BankLoan } from '../data/bankData';
import { formatCurrency, formatPercentage } from '../utils/emiCalculator';
import { X, Check, Info } from 'lucide-react';

interface LoanComparisonTableProps {
  loans: BankLoan[];
  onRemove: (loanId: string) => void;
}

const LoanComparisonTable: React.FC<LoanComparisonTableProps> = ({ loans, onRemove }) => {
  if (loans.length === 0) {
    return null;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border-collapse">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature</th>
            {loans.map((loan) => (
              <th key={loan.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center justify-between">
                  <div>{loan.bankName}</div>
                  <button
                    onClick={() => onRemove(loan.id)}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                    title="Remove from comparison"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/* Loan Type */}
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Loan Type</td>
            {loans.map((loan) => (
              <td key={loan.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                {loan.loanType} Loan
              </td>
            ))}
          </tr>

          {/* Interest Type */}
          <tr className="bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Interest Type</td>
            {loans.map((loan) => (
              <td key={loan.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                {loan.interestType}
              </td>
            ))}
          </tr>

          {/* Interest Rate */}
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Interest Rate</td>
            {loans.map((loan) => (
              <td key={loan.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatPercentage(loan.interestRate.min)} - {formatPercentage(loan.interestRate.max)}
              </td>
            ))}
          </tr>

          {/* Loan Amount */}
          <tr className="bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Loan Amount</td>
            {loans.map((loan) => (
              <td key={loan.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatCurrency(loan.principalLimits.min)} - {formatCurrency(loan.principalLimits.max)}
              </td>
            ))}
          </tr>

          {/* Tenure */}
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Tenure</td>
            {loans.map((loan) => (
              <td key={loan.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {loan.tenureRange.min / 12} - {loan.tenureRange.max / 12} Years
              </td>
            ))}
          </tr>

          {/* Processing Fee */}
          <tr className="bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Processing Fee</td>
            {loans.map((loan) => (
              <td key={loan.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {loan.processingFee.type === 'percentage' 
                  ? `${loan.processingFee.value}%` 
                  : formatCurrency(loan.processingFee.value)}
                <br />
                {loan.processingFee.minAmount && <span>Min: {formatCurrency(loan.processingFee.minAmount)}</span>}
                {loan.processingFee.maxAmount && <span> Max: {formatCurrency(loan.processingFee.maxAmount)}</span>}
              </td>
            ))}
          </tr>

          {/* Features header */}
          <tr>
            <td colSpan={loans.length + 1} className="px-6 py-3 bg-indigo-50 text-sm font-medium text-indigo-900">
              Features & Benefits
            </td>
          </tr>

          {/* Features */}
          {loans[0].features.map((_, index) => (
            <tr key={`feature-${index}`} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Feature {index + 1}
              </td>
              {loans.map((loan) => (
                <td key={loan.id} className="px-6 py-4 text-sm text-gray-500">
                  {loan.features[index] || '-'}
                </td>
              ))}
            </tr>
          ))}

          {/* Benefits */}
          {loans[0].benefits.map((_, index) => (
            <tr key={`benefit-${index}`} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Benefit {index + 1}
              </td>
              {loans.map((loan) => (
                <td key={loan.id} className="px-6 py-4 text-sm text-gray-500">
                  {loan.benefits[index] || '-'}
                </td>
              ))}
            </tr>
          ))}

          {/* Eligibility header */}
          <tr>
            <td colSpan={loans.length + 1} className="px-6 py-3 bg-indigo-50 text-sm font-medium text-indigo-900">
              Eligibility & Documents
            </td>
          </tr>

          {/* Eligibility */}
          {loans[0].eligibility.map((_, index) => (
            <tr key={`eligibility-${index}`} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Eligibility {index + 1}
              </td>
              {loans.map((loan) => (
                <td key={loan.id} className="px-6 py-4 text-sm text-gray-500">
                  {loan.eligibility[index] || '-'}
                </td>
              ))}
            </tr>
          ))}

          {/* Documents */}
          {loans[0].documents.map((_, index) => (
            <tr key={`document-${index}`} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Document {index + 1}
              </td>
              {loans.map((loan) => (
                <td key={loan.id} className="px-6 py-4 text-sm text-gray-500">
                  {loan.documents[index] || '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoanComparisonTable;
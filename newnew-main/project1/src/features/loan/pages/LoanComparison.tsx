import React, { useState, useEffect } from 'react';
import { Landmark, Filter, X, AlertCircle } from 'lucide-react';
import banks, { BankLoan } from '../data/bankData';
import LoanCard from '../components/LoanCard';
import LoanComparisonTable from '../components/LoanComparisonTable';

const LoanComparison: React.FC = () => {
  const [filteredLoans, setFilteredLoans] = useState<BankLoan[]>(banks);
  const [comparedLoans, setComparedLoans] = useState<BankLoan[]>([]);
  const [showComparisonTable, setShowComparisonTable] = useState(false);
  
  // Filters
  const [loanTypeFilter, setLoanTypeFilter] = useState<string>('all');
  const [bankFilter, setBankFilter] = useState<string>('all');
  const [rateFilter, setRateFilter] = useState<[number, number]>([5, 20]);
  const [amountFilter, setAmountFilter] = useState<[number, number]>([100000, 10000000]);
  const [showFilters, setShowFilters] = useState(false);

  // Get unique bank names
  const uniqueBanks = Array.from(new Set(banks.map(loan => loan.bankName)));

  // Apply filters to loans
  useEffect(() => {
    let result = banks;
    
    // Filter by loan type
    if (loanTypeFilter !== 'all') {
      result = result.filter(loan => loan.loanType === loanTypeFilter);
    }
    
    // Filter by bank
    if (bankFilter !== 'all') {
      result = result.filter(loan => loan.bankName === bankFilter);
    }
    
    // Filter by interest rate
    result = result.filter(loan => 
      (loan.interestRate.min <= rateFilter[1] && loan.interestRate.max >= rateFilter[0])
    );
    
    // Filter by loan amount
    result = result.filter(loan => 
      (loan.principalLimits.min <= amountFilter[1] && loan.principalLimits.max >= amountFilter[0])
    );
    
    setFilteredLoans(result);
  }, [loanTypeFilter, bankFilter, rateFilter, amountFilter]);

  // Handle adding/removing loans from comparison
  const handleCompare = (loan: BankLoan) => {
    const isAlreadyCompared = comparedLoans.some(l => l.id === loan.id);
    
    if (isAlreadyCompared) {
      // Remove from comparison
      setComparedLoans(comparedLoans.filter(l => l.id !== loan.id));
    } else {
      // Add to comparison (limit to 3 loans)
      if (comparedLoans.length < 3) {
        setComparedLoans([...comparedLoans, loan]);
      } else {
        alert('You can compare up to 3 loans at a time. Please remove one to add another.');
      }
    }
  };

  // Remove loan from comparison
  const handleRemoveFromComparison = (loanId: string) => {
    setComparedLoans(comparedLoans.filter(loan => loan.id !== loanId));
  };

  // Format money
  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Loan Comparison</h1>
        <p className="mt-2 text-gray-600">
          Compare loan options from top banks in India and find the best rates for your needs.
        </p>
      </div>

      {/* Filters section */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-indigo-600" />
            <h2 className="text-lg font-medium text-gray-800">Filters</h2>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="text-sm text-indigo-600 hover:text-indigo-800"
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Loan Type Filter */}
            <div>
              <label htmlFor="loanType" className="block text-sm font-medium text-gray-700 mb-1">
                Loan Type
              </label>
              <select
                id="loanType"
                value={loanTypeFilter}
                onChange={(e) => setLoanTypeFilter(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 px-3 border"
              >
                <option value="all">All Types</option>
                <option value="home">Home Loan</option>
                <option value="personal">Personal Loan</option>
                <option value="auto">Auto Loan</option>
              </select>
            </div>

            {/* Bank Filter */}
            <div>
              <label htmlFor="bank" className="block text-sm font-medium text-gray-700 mb-1">
                Bank
              </label>
              <select
                id="bank"
                value={bankFilter}
                onChange={(e) => setBankFilter(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 px-3 border"
              >
                <option value="all">All Banks</option>
                {uniqueBanks.map((bank) => (
                  <option key={bank} value={bank}>
                    {bank}
                  </option>
                ))}
              </select>
            </div>

            {/* Interest Rate Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Interest Rate Range
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="5"
                  max="20"
                  step="0.5"
                  value={rateFilter[0]}
                  onChange={(e) => setRateFilter([Number(e.target.value), rateFilter[1]])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm font-medium">{rateFilter[0]}%</span>
                <span className="text-sm text-gray-500">-</span>
                <input
                  type="range"
                  min="5"
                  max="20"
                  step="0.5"
                  value={rateFilter[1]}
                  onChange={(e) => setRateFilter([rateFilter[0], Number(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm font-medium">{rateFilter[1]}%</span>
              </div>
            </div>

            {/* Loan Amount Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Loan Amount Range
              </label>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Min: {formatMoney(amountFilter[0])}</span>
                  <span className="text-xs text-gray-500">Max: {formatMoney(amountFilter[1])}</span>
                </div>
                <input
                  type="range"
                  min="100000"
                  max="10000000"
                  step="100000"
                  value={amountFilter[0]}
                  onChange={(e) => setAmountFilter([Number(e.target.value), amountFilter[1]])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <input
                  type="range"
                  min="100000"
                  max="10000000"
                  step="100000"
                  value={amountFilter[1]}
                  onChange={(e) => setAmountFilter([amountFilter[0], Number(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Comparison section */}
      {comparedLoans.length > 0 && (
        <div className="bg-indigo-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Landmark className="h-5 w-5 text-indigo-600" />
              <h2 className="text-lg font-medium text-indigo-900">Selected for Comparison</h2>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-indigo-700">
                {comparedLoans.length} of 3 loans selected
              </span>
              <button
                onClick={() => setShowComparisonTable(!showComparisonTable)}
                className="text-sm text-indigo-700 hover:text-indigo-900 font-medium"
              >
                {showComparisonTable ? 'Hide Comparison Table' : 'Show Comparison Table'}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {comparedLoans.map((loan) => (
              <div
                key={loan.id}
                className="bg-white rounded-md py-1 px-3 flex items-center gap-2 border border-indigo-200"
              >
                <span className="text-sm font-medium">{loan.bankName} {loan.loanType} Loan</span>
                <button
                  onClick={() => handleRemoveFromComparison(loan.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          {showComparisonTable && (
            <div className="mt-6 bg-white rounded-lg border border-gray-200 overflow-hidden">
              <LoanComparisonTable
                loans={comparedLoans}
                onRemove={handleRemoveFromComparison}
              />
            </div>
          )}
        </div>
      )}

      {/* Loans grid */}
      {filteredLoans.length === 0 ? (
        <div className="text-center py-16">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No loans match your filters</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Try adjusting your filter criteria to see more loan options from our partner banks.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLoans.map((loan) => (
            <LoanCard
              key={loan.id}
              loan={loan}
              onCompare={handleCompare}
              isCompared={comparedLoans.some(l => l.id === loan.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LoanComparison;
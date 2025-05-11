import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  calculateEMI, 
  calculateTotalPayment, 
  calculateTotalInterest, 
  calculateAmortizationSchedule,
  formatCurrency
} from '../utils/emiCalculator';
import { AlertCircle } from 'lucide-react';

interface EMICalculatorProps {
  initialPrincipal?: number;
  initialInterestRate?: number;
  initialTenure?: number;
}

const EMICalculator: React.FC<EMICalculatorProps> = ({
  initialPrincipal = 2000000,
  initialInterestRate = 8.5,
  initialTenure = 20 * 12, // 20 years in months
}) => {
  const [principal, setPrincipal] = useState(initialPrincipal);
  const [interestRate, setInterestRate] = useState(initialInterestRate);
  const [tenureMonths, setTenureMonths] = useState(initialTenure);
  const [showYearlyBreakup, setShowYearlyBreakup] = useState(false);
  
  const [emi, setEmi] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState<any[]>([]);

  useEffect(() => {
    // Calculate EMI and related values
    const calculatedEmi = calculateEMI(principal, interestRate, tenureMonths);
    const calculatedTotalPayment = calculateTotalPayment(calculatedEmi, tenureMonths);
    const calculatedTotalInterest = calculateTotalInterest(calculatedTotalPayment, principal);
    
    // Set the calculated values in state
    setEmi(calculatedEmi);
    setTotalPayment(calculatedTotalPayment);
    setTotalInterest(calculatedTotalInterest);
    
    // Calculate amortization schedule
    const schedule = calculateAmortizationSchedule(principal, interestRate, tenureMonths);
    setAmortizationSchedule(schedule);
  }, [principal, interestRate, tenureMonths]);

  // Format number to display as currency (Indian Rupees)
  const formatInr = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Get yearly breakup of payments
  const getYearlyData = () => {
    const yearlyData = [];
    for (let year = 1; year <= Math.ceil(tenureMonths / 12); year++) {
      const startMonth = (year - 1) * 12;
      const endMonth = Math.min(startMonth + 11, tenureMonths - 1);
      
      let yearlyPrincipal = 0;
      let yearlyInterest = 0;
      
      for (let i = startMonth; i <= endMonth; i++) {
        if (amortizationSchedule[i]) {
          yearlyPrincipal += amortizationSchedule[i].principalPayment;
          yearlyInterest += amortizationSchedule[i].interestPayment;
        }
      }
      
      yearlyData.push({
        year,
        principal: yearlyPrincipal,
        interest: yearlyInterest,
        total: yearlyPrincipal + yearlyInterest,
      });
    }
    return yearlyData;
  };

  const pieChartData = [
    { name: 'Principal', value: principal },
    { name: 'Interest', value: totalInterest },
  ];

  const COLORS = ['#3b82f6', '#ef4444'];

  const handlePrincipalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setPrincipal(value);
  };

  const handleInterestChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setInterestRate(value);
  };

  const handleTenureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setTenureMonths(value * 12); // Convert years to months
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">EMI Calculator</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Loan Amount Slider */}
        <div>
          <label htmlFor="principal" className="block text-sm font-medium text-gray-700 mb-1">
            Loan Amount
          </label>
          <div className="flex items-center">
            <input
              type="range"
              id="principal"
              min="100000"
              max="10000000"
              step="100000"
              value={principal}
              onChange={handlePrincipalChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-gray-500">₹1L</span>
            <span className="text-sm font-medium text-gray-700">{formatInr(principal)}</span>
            <span className="text-xs text-gray-500">₹1Cr</span>
          </div>
        </div>
        
        {/* Interest Rate Slider */}
        <div>
          <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-1">
            Interest Rate (% p.a.)
          </label>
          <div className="flex items-center">
            <input
              type="range"
              id="interest"
              min="5"
              max="20"
              step="0.05"
              value={interestRate}
              onChange={handleInterestChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-gray-500">5%</span>
            <span className="text-sm font-medium text-gray-700">{interestRate.toFixed(2)}%</span>
            <span className="text-xs text-gray-500">20%</span>
          </div>
        </div>
        
        {/* Loan Tenure Slider */}
        <div>
          <label htmlFor="tenure" className="block text-sm font-medium text-gray-700 mb-1">
            Loan Tenure (Years)
          </label>
          <div className="flex items-center">
            <input
              type="range"
              id="tenure"
              min="1"
              max="30"
              step="1"
              value={tenureMonths / 12}
              onChange={handleTenureChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-gray-500">1 Yr</span>
            <span className="text-sm font-medium text-gray-700">{(tenureMonths / 12)} Years</span>
            <span className="text-xs text-gray-500">30 Yrs</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Monthly EMI</p>
          <p className="text-2xl font-bold text-blue-600">{formatInr(emi)}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Principal</p>
          <p className="text-2xl font-bold text-blue-600">{formatInr(principal)}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Total Interest</p>
          <p className="text-2xl font-bold text-red-500">{formatInr(totalInterest)}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Total Payment</p>
          <p className="text-2xl font-bold text-gray-700">{formatInr(totalPayment)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
        {/* Pie Chart showing principal vs interest */}
        <div className="bg-white rounded-lg p-4 h-80">
          <h3 className="text-lg font-medium mb-4 text-gray-700">Principal vs. Interest Breakup</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatInr(Number(value))} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Bar Chart showing yearly breakup */}
        <div className="bg-white rounded-lg p-4 h-80">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-700">
              {showYearlyBreakup ? 'Yearly Payment Breakup' : 'Monthly Payment Breakup'}
            </h3>
            <button
              onClick={() => setShowYearlyBreakup(!showYearlyBreakup)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Show {showYearlyBreakup ? 'Monthly' : 'Yearly'} View
            </button>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            {showYearlyBreakup ? (
              <BarChart data={getYearlyData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="year" name="Year" label={{ value: 'Year', position: 'insideBottomRight', offset: 0 }} />
                <YAxis tickFormatter={(value) => `₹${value / 1000}K`} />
                <Tooltip formatter={(value) => formatInr(Number(value))} />
                <Legend />
                <Bar dataKey="principal" name="Principal" stackId="a" fill="#3b82f6" />
                <Bar dataKey="interest" name="Interest" stackId="a" fill="#ef4444" />
              </BarChart>
            ) : (
              <BarChart 
                data={amortizationSchedule.slice(0, Math.min(24, amortizationSchedule.length))} 
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="month" name="Month" />
                <YAxis tickFormatter={(value) => `₹${value / 1000}K`} />
                <Tooltip formatter={(value) => formatInr(Number(value))} />
                <Legend />
                <Bar dataKey="principalPayment" name="Principal" stackId="a" fill="#3b82f6" />
                <Bar dataKey="interestPayment" name="Interest" stackId="a" fill="#ef4444" />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg flex items-start space-x-3 mb-6">
        <div className="flex-shrink-0 mt-0.5">
          <AlertCircle className="h-5 w-5 text-blue-500" />
        </div>
        <div>
          <h4 className="text-sm font-medium text-blue-800">How EMI is Calculated</h4>
          <p className="text-sm text-blue-700 mt-1">
            EMI = P × r × (1 + r)<sup>n</sup> ÷ [(1 + r)<sup>n</sup> - 1], where P is principal, r is monthly interest rate, and n is loan tenure in months.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EMICalculator;
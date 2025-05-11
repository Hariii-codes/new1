/**
 * Calculate EMI (Equated Monthly Installment)
 * Formula: EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
 * Where:
 * P = Principal loan amount
 * r = Interest rate per month [Annual interest rate / (12 * 100)]
 * n = Loan tenure in number of months
 * 
 * @param principal - Principal loan amount
 * @param interestRate - Annual interest rate (in percentage)
 * @param tenureMonths - Loan tenure in months
 * @returns EMI amount
 */
export const calculateEMI = (
  principal: number,
  interestRate: number,
  tenureMonths: number
): number => {
  // Convert annual interest rate to monthly rate and decimal form
  const monthlyRate = interestRate / (12 * 100);
  
  // Calculate EMI using the formula
  const emi =
    principal *
    monthlyRate *
    Math.pow(1 + monthlyRate, tenureMonths) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  
  return Math.round(emi);
};

/**
 * Calculate total payment over the entire loan tenure
 * 
 * @param emi - EMI amount
 * @param tenureMonths - Loan tenure in months
 * @returns Total payment amount
 */
export const calculateTotalPayment = (emi: number, tenureMonths: number): number => {
  return emi * tenureMonths;
};

/**
 * Calculate total interest payable over the entire loan tenure
 * 
 * @param totalPayment - Total payment amount
 * @param principal - Principal loan amount
 * @returns Total interest amount
 */
export const calculateTotalInterest = (totalPayment: number, principal: number): number => {
  return totalPayment - principal;
};

/**
 * Calculate loan amortization schedule
 * 
 * @param principal - Principal loan amount
 * @param interestRate - Annual interest rate (in percentage)
 * @param tenureMonths - Loan tenure in months
 * @returns Amortization schedule as an array of objects
 */
export const calculateAmortizationSchedule = (
  principal: number,
  interestRate: number,
  tenureMonths: number
) => {
  const monthlyRate = interestRate / (12 * 100);
  const emi = calculateEMI(principal, interestRate, tenureMonths);
  
  let balance = principal;
  const schedule = [];
  
  for (let month = 1; month <= tenureMonths; month++) {
    // Calculate interest for the current month
    const interestPayment = balance * monthlyRate;
    
    // Calculate principal payment for the current month
    const principalPayment = emi - interestPayment;
    
    // Update the remaining balance
    balance -= principalPayment;
    
    // Add this month's details to the schedule
    schedule.push({
      month,
      emi: Math.round(emi),
      interestPayment: Math.round(interestPayment),
      principalPayment: Math.round(principalPayment),
      balance: Math.round(Math.max(0, balance)), // Ensure balance doesn't go below 0 due to rounding
    });
  }
  
  return schedule;
};

/**
 * Calculate processing fee based on bank's structure
 * 
 * @param principal - Principal loan amount
 * @param processingFeeType - Type of processing fee ('percentage' or 'fixed')
 * @param processingFeeValue - Value of processing fee (percentage or fixed amount)
 * @param minAmount - Minimum processing fee amount (optional)
 * @param maxAmount - Maximum processing fee amount (optional)
 * @returns Processing fee amount
 */
export const calculateProcessingFee = (
  principal: number,
  processingFeeType: 'percentage' | 'fixed',
  processingFeeValue: number,
  minAmount?: number,
  maxAmount?: number
): number => {
  let fee = 0;
  
  if (processingFeeType === 'percentage') {
    fee = (principal * processingFeeValue) / 100;
  } else {
    fee = processingFeeValue;
  }
  
  // Apply min and max constraints if provided
  if (minAmount !== undefined && fee < minAmount) {
    fee = minAmount;
  }
  
  if (maxAmount !== undefined && fee > maxAmount) {
    fee = maxAmount;
  }
  
  return Math.round(fee);
};

/**
 * Format currency in Indian Rupees
 * 
 * @param amount - Amount to format
 * @returns Formatted amount as string
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format percentage with 2 decimal places
 * 
 * @param percentage - Percentage value
 * @returns Formatted percentage as string
 */
export const formatPercentage = (percentage: number): string => {
  return `${percentage.toFixed(2)}%`;
};
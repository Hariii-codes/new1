export interface BankLoan {
  id: string;
  bankName: string;
  bankLogo: string;
  loanType: 'home' | 'personal' | 'auto';
  interestType: 'fixed' | 'floating';
  interestRate: {
    min: number;
    max: number;
  };
  principalLimits: {
    min: number;
    max: number;
  };
  tenureRange: {
    min: number; // In months
    max: number; // In months
  };
  processingFee: {
    type: 'percentage' | 'fixed';
    value: number;
    minAmount?: number;
    maxAmount?: number;
  };
  eligibility: string[];
  documents: string[];
  features: string[];
  benefits: string[];
}

export interface BankBranch {
  id: string;
  bankName: string;
  branchName: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  location: {
    latitude: number;
    longitude: number;
  };
  workingHours: string;
  services: string[];
}

const banks: BankLoan[] = [
  {
    id: 'sbi-home-1',
    bankName: 'State Bank of India',
    bankLogo: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/SBI-logo.svg',
    loanType: 'home',
    interestType: 'floating',
    interestRate: {
      min: 8.4,
      max: 9.15,
    },
    principalLimits: {
      min: 500000,
      max: 50000000,
    },
    tenureRange: {
      min: 60, // 5 years
      max: 360, // 30 years
    },
    processingFee: {
      type: 'percentage',
      value: 0.35,
      minAmount: 2000,
      maxAmount: 10000,
    },
    eligibility: [
      'Salaried individuals with minimum income of ₹25,000 per month',
      'Self-employed professionals with minimum income of ₹50,000 per month',
      'Age between 21-65 years at loan maturity',
    ],
    documents: [
      'KYC documents (Aadhaar, PAN, etc.)',
      'Income proof (Salary slips, IT returns)',
      'Property documents',
      'Bank statements for last 6 months',
    ],
    features: [
      'Doorstep service',
      'No prepayment charges',
      'Quick approval process',
    ],
    benefits: [
      'Special rates for women borrowers',
      'Loan for under construction property',
      'Balance transfer facility available',
    ],
  },
  {
    id: 'sbi-personal-1',
    bankName: 'State Bank of India',
    bankLogo: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/SBI-logo.svg',
    loanType: 'personal',
    interestType: 'fixed',
    interestRate: {
      min: 10.5,
      max: 12.75,
    },
    principalLimits: {
      min: 100000,
      max: 2000000,
    },
    tenureRange: {
      min: 12, // 1 year
      max: 60, // 5 years
    },
    processingFee: {
      type: 'percentage',
      value: 1.5,
      minAmount: 1000,
      maxAmount: 15000,
    },
    eligibility: [
      'Salaried individuals with minimum income of ₹25,000 per month',
      'Age between 21-60 years',
      'CIBIL score above 700',
    ],
    documents: [
      'KYC documents (Aadhaar, PAN, etc.)',
      'Income proof (Salary slips for last 3 months)',
      'Bank statements for last 6 months',
      'Form 16 for the last 2 years',
    ],
    features: [
      'Minimal documentation',
      'Quick approval within 48 hours',
      'No collateral required',
    ],
    benefits: [
      'Lower interest rates for existing customers',
      'Special offers during festive seasons',
      'Flexible repayment options',
    ],
  },
  {
    id: 'hdfc-home-1',
    bankName: 'HDFC Bank',
    bankLogo: 'https://upload.wikimedia.org/wikipedia/en/2/28/HDFC_Bank_Logo.svg',
    loanType: 'home',
    interestType: 'floating',
    interestRate: {
      min: 8.5,
      max: 9.25,
    },
    principalLimits: {
      min: 500000,
      max: 100000000,
    },
    tenureRange: {
      min: 36, // 3 years
      max: 300, // 25 years
    },
    processingFee: {
      type: 'percentage',
      value: 0.5,
      minAmount: 3000,
      maxAmount: 10000,
    },
    eligibility: [
      'Salaried individuals with minimum income of ₹30,000 per month',
      'Self-employed professionals with minimum income of ₹60,000 per month',
      'Age between 21-65 years at loan maturity',
    ],
    documents: [
      'KYC documents (Aadhaar, PAN, etc.)',
      'Income proof (Salary slips, IT returns)',
      'Property documents',
      'Bank statements for last 6 months',
    ],
    features: [
      'Home loan overdraft facility',
      'Flexible EMI options',
      'Top-up loan facility',
    ],
    benefits: [
      'Special rates for premium customers',
      'Part-payment facility',
      'Tax benefits under Section 24 and 80C',
    ],
  },
  {
    id: 'hdfc-personal-1',
    bankName: 'HDFC Bank',
    bankLogo: 'https://upload.wikimedia.org/wikipedia/en/2/28/HDFC_Bank_Logo.svg',
    loanType: 'personal',
    interestType: 'fixed',
    interestRate: {
      min: 10.25,
      max: 16.5,
    },
    principalLimits: {
      min: 50000,
      max: 4000000,
    },
    tenureRange: {
      min: 12, // 1 year
      max: 60, // 5 years
    },
    processingFee: {
      type: 'percentage',
      value: 2.5,
      minAmount: 999,
      maxAmount: 25000,
    },
    eligibility: [
      'Salaried individuals with minimum income of ₹20,000 per month',
      'Age between 21-60 years',
      'Minimum 2 years of work experience',
    ],
    documents: [
      'KYC documents (Aadhaar, PAN, etc.)',
      'Latest 3 months salary slips',
      'Bank statements for last 6 months',
      'Latest Form 16',
    ],
    features: [
      'Pre-approved loans for existing customers',
      'Paperless application process',
      'Instant disbursement for eligible customers',
    ],
    benefits: [
      'No collateral required',
      'No foreclosure charges after 12 months',
      'Special festive offers',
    ],
  },
  {
    id: 'icici-home-1',
    bankName: 'ICICI Bank',
    bankLogo: 'https://upload.wikimedia.org/wikipedia/commons/1/12/ICICI_Bank_Logo.svg',
    loanType: 'home',
    interestType: 'floating',
    interestRate: {
      min: 8.55,
      max: 9.35,
    },
    principalLimits: {
      min: 500000,
      max: 75000000,
    },
    tenureRange: {
      min: 36, // 3 years
      max: 360, // 30 years
    },
    processingFee: {
      type: 'percentage',
      value: 0.5,
      minAmount: 3000,
      maxAmount: 10000,
    },
    eligibility: [
      'Salaried individuals with minimum income of ₹25,000 per month',
      'Self-employed professionals with minimum income of ₹50,000 per month',
      'Age between 21-65 years at loan maturity',
    ],
    documents: [
      'KYC documents (Aadhaar, PAN, etc.)',
      'Income proof (Salary slips, IT returns)',
      'Property documents',
      'Bank statements for last 6 months',
    ],
    features: [
      'Fixed + Floating rate option',
      'Online account access',
      'Doorstep service',
    ],
    benefits: [
      'Special rates for women borrowers',
      'Special offers for existing customers',
      'Additional loan for furnishing',
    ],
  },
  {
    id: 'icici-personal-1',
    bankName: 'ICICI Bank',
    bankLogo: 'https://upload.wikimedia.org/wikipedia/commons/1/12/ICICI_Bank_Logo.svg',
    loanType: 'personal',
    interestType: 'fixed',
    interestRate: {
      min: 10.49,
      max: 18.49,
    },
    principalLimits: {
      min: 50000,
      max: 5000000,
    },
    tenureRange: {
      min: 12, // 1 year
      max: 60, // 5 years
    },
    processingFee: {
      type: 'percentage',
      value: 2.25,
      minAmount: 999,
      maxAmount: 20000,
    },
    eligibility: [
      'Salaried individuals with minimum income of ₹17,500 per month',
      'Age between 23-58 years',
      'Minimum 2 years of work experience with 1 year at current job',
    ],
    documents: [
      'KYC documents (Aadhaar, PAN, etc.)',
      'Latest 2 months salary slips',
      'Bank statements for last 3 months',
      'Latest Form 16',
    ],
    features: [
      'Instant digital approval',
      'Flexible tenure options',
      'Minimum documentation',
    ],
    benefits: [
      'No security or collateral required',
      'Lower rates for existing customers',
      'No hidden charges',
    ],
  },
  {
    id: 'axis-home-1',
    bankName: 'Axis Bank',
    bankLogo: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Axis_Bank_logo.svg',
    loanType: 'home',
    interestType: 'floating',
    interestRate: {
      min: 8.6,
      max: 9.3,
    },
    principalLimits: {
      min: 300000,
      max: 75000000,
    },
    tenureRange: {
      min: 36, // 3 years
      max: 360, // 30 years
    },
    processingFee: {
      type: 'percentage',
      value: 0.5,
      minAmount: 2500,
      maxAmount: 10000,
    },
    eligibility: [
      'Salaried individuals with minimum income of ₹25,000 per month',
      'Self-employed professionals with minimum income of ₹50,000 per month',
      'Age between 21-70 years at loan maturity',
    ],
    documents: [
      'KYC documents (Aadhaar, PAN, etc.)',
      'Income proof (Salary slips, IT returns)',
      'Property documents',
      'Bank statements for last 6 months',
    ],
    features: [
      'Adjustable EMI options',
      'Property search services',
      'Digital loan approval',
    ],
    benefits: [
      'Special interest rates for premium customers',
      'No pre-payment or foreclosure charges',
      'Home loan balance transfer facility',
    ],
  },
  {
    id: 'axis-personal-1',
    bankName: 'Axis Bank',
    bankLogo: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Axis_Bank_logo.svg',
    loanType: 'personal',
    interestType: 'fixed',
    interestRate: {
      min: 10.49,
      max: 18,
    },
    principalLimits: {
      min: 50000,
      max: 4000000,
    },
    tenureRange: {
      min: 12, // 1 year
      max: 60, // 5 years
    },
    processingFee: {
      type: 'percentage',
      value: 2,
      minAmount: 999,
      maxAmount: 15000,
    },
    eligibility: [
      'Salaried individuals with minimum income of ₹15,000 per month',
      'Age between 21-60 years',
      'Minimum 1 year of work experience',
    ],
    documents: [
      'KYC documents (Aadhaar, PAN, etc.)',
      'Latest 3 months salary slips',
      'Bank statements for last 3 months',
      'Latest Form 16',
    ],
    features: [
      'Completely digital process',
      'Pre-qualified offers for existing customers',
      'Minimal documentation',
    ],
    benefits: [
      'No collateral required',
      'Special offers during festive season',
      'Flexible repayment options',
    ],
  },
  {
    id: 'pnb-home-1',
    bankName: 'Punjab National Bank',
    bankLogo: 'https://upload.wikimedia.org/wikipedia/en/4/4c/Punjab_National_Bank_logo.svg',
    loanType: 'home',
    interestType: 'floating',
    interestRate: {
      min: 8.45,
      max: 9.05,
    },
    principalLimits: {
      min: 200000,
      max: 50000000,
    },
    tenureRange: {
      min: 36, // 3 years
      max: 360, // 30 years
    },
    processingFee: {
      type: 'percentage',
      value: 0.35,
      minAmount: 2000,
      maxAmount: 10000,
    },
    eligibility: [
      'Salaried individuals with minimum income of ₹20,000 per month',
      'Self-employed professionals with minimum income of ₹45,000 per month',
      'Age between 21-65 years at loan maturity',
    ],
    documents: [
      'KYC documents (Aadhaar, PAN, etc.)',
      'Income proof (Salary slips, IT returns)',
      'Property documents',
      'Bank statements for last 6 months',
    ],
    features: [
      'Lower interest rates for women borrowers',
      'Longer tenure options available',
      'Higher loan-to-value ratio',
    ],
    benefits: [
      'No prepayment penalties',
      'Free property insurance for loan tenure',
      'Special offers for government employees',
    ],
  },
  {
    id: 'pnb-personal-1',
    bankName: 'Punjab National Bank',
    bankLogo: 'https://upload.wikimedia.org/wikipedia/en/4/4c/Punjab_National_Bank_logo.svg',
    loanType: 'personal',
    interestType: 'fixed',
    interestRate: {
      min: 8.95,
      max: 12.65,
    },
    principalLimits: {
      min: 50000,
      max: 1500000,
    },
    tenureRange: {
      min: 12, // 1 year
      max: 60, // 5 years
    },
    processingFee: {
      type: 'percentage',
      value: 1.5,
      minAmount: 1000,
      maxAmount: 15000,
    },
    eligibility: [
      'Salaried individuals with minimum income of ₹15,000 per month',
      'Age between 21-60 years',
      'Minimum 1 year of work experience',
    ],
    documents: [
      'KYC documents (Aadhaar, PAN, etc.)',
      'Latest 3 months salary slips',
      'Bank statements for last 3 months',
      'Latest Form 16',
    ],
    features: [
      'Competitive interest rates',
      'Simplified documentation',
      'Flexible tenure options',
    ],
    benefits: [
      'No security or collateral required',
      'Special offers for existing customers',
      'No hidden charges',
    ],
  },
];

export const branches: BankBranch[] = [
  {
    id: 'sbi-branch-1',
    bankName: 'State Bank of India',
    branchName: 'Connaught Place',
    address: '11, Sansad Marg, Connaught Place',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110001',
    phone: '+91 11 2337 4343',
    email: 'cp.branch@sbi.co.in',
    location: {
      latitude: 28.6315,
      longitude: 77.2167,
    },
    workingHours: 'Mon-Fri: 10:00 AM - 4:00 PM, Sat: 10:00 AM - 2:00 PM',
    services: ['Home Loan', 'Personal Loan', 'Auto Loan', 'Insurance', 'Investment Advisory'],
  },
  {
    id: 'sbi-branch-2',
    bankName: 'State Bank of India',
    branchName: 'Adyar',
    address: 'L.B Road, Adyar',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600020',
    phone: '+91 44 2440 2323',
    email: 'adyar.branch@sbi.co.in',
    location: {
      latitude: 13.0012,
      longitude: 80.2565,
    },
    workingHours: 'Mon-Fri: 10:00 AM - 4:00 PM, Sat: 10:00 AM - 2:00 PM',
    services: ['Home Loan', 'Personal Loan', 'Auto Loan', 'Insurance'],
  },
  {
    id: 'hdfc-branch-1',
    bankName: 'HDFC Bank',
    branchName: 'Bandra West',
    address: 'Ground Floor, Turner Road, Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050',
    phone: '+91 22 2640 7573',
    email: 'bandra.west@hdfcbank.com',
    location: {
      latitude: 19.0596,
      longitude: 72.8295,
    },
    workingHours: 'Mon-Fri: 9:30 AM - 4:30 PM, Sat: 9:30 AM - 2:00 PM',
    services: ['Home Loan', 'Personal Loan', 'Auto Loan', 'Wealth Management'],
  },
  {
    id: 'hdfc-branch-2',
    bankName: 'HDFC Bank',
    branchName: 'HSR Layout',
    address: '27th Main, Sector 1, HSR Layout',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560102',
    phone: '+91 80 2572 8452',
    email: 'hsr.layout@hdfcbank.com',
    location: {
      latitude: 12.9116,
      longitude: 77.6475,
    },
    workingHours: 'Mon-Fri: 9:30 AM - 4:30 PM, Sat: 9:30 AM - 2:00 PM',
    services: ['Home Loan', 'Personal Loan', 'Auto Loan', 'Investment Advisory'],
  },
  {
    id: 'icici-branch-1',
    bankName: 'ICICI Bank',
    branchName: 'MG Road',
    address: 'MG Road, Near Trinity Metro Station',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560001',
    phone: '+91 80 4182 0123',
    email: 'mgroad.blr@icicibank.com',
    location: {
      latitude: 12.9756,
      longitude: 77.6097,
    },
    workingHours: 'Mon-Fri: 9:30 AM - 5:00 PM, Sat: 9:30 AM - 2:30 PM',
    services: ['Home Loan', 'Personal Loan', 'Auto Loan', 'Wealth Management'],
  },
  {
    id: 'icici-branch-2',
    bankName: 'ICICI Bank',
    branchName: 'Salt Lake',
    address: 'Sector 5, Salt Lake',
    city: 'Kolkata',
    state: 'West Bengal',
    pincode: '700091',
    phone: '+91 33 4406 6970',
    email: 'saltlake.kol@icicibank.com',
    location: {
      latitude: 22.5735,
      longitude: 88.4322,
    },
    workingHours: 'Mon-Fri: 9:30 AM - 5:00 PM, Sat: 9:30 AM - 2:30 PM',
    services: ['Home Loan', 'Personal Loan', 'Auto Loan', 'Insurance'],
  },
  {
    id: 'axis-branch-1',
    bankName: 'Axis Bank',
    branchName: 'Jubilee Hills',
    address: 'Road No. 36, Jubilee Hills',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500033',
    phone: '+91 40 2354 8970',
    email: 'jubileehills.hyd@axisbank.com',
    location: {
      latitude: 17.4341,
      longitude: 78.4075,
    },
    workingHours: 'Mon-Fri: 9:30 AM - 5:00 PM, Sat: 9:30 AM - 2:00 PM',
    services: ['Home Loan', 'Personal Loan', 'Auto Loan', 'Wealth Management'],
  },
  {
    id: 'axis-branch-2',
    bankName: 'Axis Bank',
    branchName: 'Lajpat Nagar',
    address: 'Ring Road, Lajpat Nagar',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110024',
    phone: '+91 11 4174 2100',
    email: 'lajpatnagar.del@axisbank.com',
    location: {
      latitude: 28.5681,
      longitude: 77.2421,
    },
    workingHours: 'Mon-Fri: 9:30 AM - 5:00 PM, Sat: 9:30 AM - 2:00 PM',
    services: ['Home Loan', 'Personal Loan', 'Auto Loan', 'Investment Advisory'],
  },
  {
    id: 'pnb-branch-1',
    bankName: 'Punjab National Bank',
    branchName: 'Model Town',
    address: 'Main Road, Model Town',
    city: 'Delhi',
    state: 'Delhi',
    pincode: '110009',
    phone: '+91 11 2743 6700',
    email: 'modeltown@pnb.co.in',
    location: {
      latitude: 28.7084,
      longitude: 77.1891,
    },
    workingHours: 'Mon-Fri: 10:00 AM - 4:00 PM, Sat: 10:00 AM - 2:00 PM',
    services: ['Home Loan', 'Personal Loan', 'Auto Loan', 'Insurance'],
  },
  {
    id: 'pnb-branch-2',
    bankName: 'Punjab National Bank',
    branchName: 'Civil Lines',
    address: 'University Road, Civil Lines',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411001',
    phone: '+91 20 2612 4590',
    email: 'civillines.pune@pnb.co.in',
    location: {
      latitude: 18.5308,
      longitude: 73.8474,
    },
    workingHours: 'Mon-Fri: 10:00 AM - 4:00 PM, Sat: 10:00 AM - 2:00 PM',
    services: ['Home Loan', 'Personal Loan', 'Auto Loan', 'Investment Advisory'],
  },
];

export default banks;
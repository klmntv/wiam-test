export interface PersonalData {
  phone: string;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female';
}

export interface AddressWork {
  workplace: string;
  address: string;
}

export interface LoanParameters {
  amount: number;
  term: number;
}

export interface FormData {
  personalData: PersonalData | null;
  addressWork: AddressWork | null;
  loanParameters: LoanParameters | null;
}

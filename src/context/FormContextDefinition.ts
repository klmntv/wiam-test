import { createContext } from 'react';
import type {
  FormData,
  PersonalData,
  AddressWork,
  LoanParameters,
} from '../types/formData.types';

export interface FormContextType {
  formData: FormData;
  updatePersonalData: (data: PersonalData) => void;
  updateAddressWork: (data: AddressWork) => void;
  updateLoanParameters: (data: LoanParameters) => void;
  resetFormData: () => void;
}

export const FormContext = createContext<FormContextType | undefined>(
  undefined
);

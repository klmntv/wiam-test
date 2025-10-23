import React, { useState } from 'react';
import type { ReactNode } from 'react';
import type {
  FormData,
  PersonalData,
  AddressWork,
  LoanParameters,
} from '../types/formData.types';
import { FormContext } from './FormContextDefinition';

const initialFormData: FormData = {
  personalData: null,
  addressWork: null,
  loanParameters: null,
};

export const FormProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const updatePersonalData = (data: PersonalData) => {
    setFormData((prev) => ({
      ...prev,
      personalData: data,
    }));
  };

  const updateAddressWork = (data: AddressWork) => {
    setFormData((prev) => ({
      ...prev,
      addressWork: data,
    }));
  };

  const updateLoanParameters = (data: LoanParameters) => {
    setFormData((prev) => ({
      ...prev,
      loanParameters: data,
    }));
  };

  const resetFormData = () => {
    setFormData(initialFormData);
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        updatePersonalData,
        updateAddressWork,
        updateLoanParameters,
        resetFormData,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

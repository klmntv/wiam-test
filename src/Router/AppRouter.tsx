import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '../config/constants';
import PersonalDataForm from '../components/PersonalDataForm';
import AddressWorkForm from '../components/AddressWorkForm';
import LoanParametersForm from '../components/LoanParametersForm';
import SuccessModal from '../components/SuccessModal';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<PersonalDataForm />} />
      <Route path={ROUTES.ADDRESS_WORK} element={<AddressWorkForm />} />
      <Route path={ROUTES.LOAN_PARAMETERS} element={<LoanParametersForm />} />
      <Route path={ROUTES.SUCCESS} element={<SuccessModal />} />
    </Routes>
  );
};

export default AppRouter;

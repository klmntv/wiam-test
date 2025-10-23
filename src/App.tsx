import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { FormProvider } from './context/FormContext';
import AppRouter from './Router/AppRouter';

const App: React.FC = () => {
  return (
    <FormProvider>
      <Router>
        <div className="min-vh-100 bg-light py-4">
          <AppRouter />
        </div>
      </Router>
    </FormProvider>
  );
};

export default App;

import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/useFormContext';

const SuccessModal: React.FC = () => {
  const navigate = useNavigate();
  const { formData, resetFormData } = useFormContext();

  const handleClose = () => {
    resetFormData();
    navigate('/');
  };

  const personalData = formData.personalData;
  const loanParameters = formData.loanParameters;

  if (!personalData || !loanParameters) {
    navigate('/');
    return null;
  }

  return (
    <Modal show={true} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Application Approved!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <div className="mb-3">
            <svg
              className="text-success"
              width="64"
              height="64"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </svg>
          </div>
          <h5>
            Congratulations, {personalData.lastName} {personalData.firstName}.
          </h5>
          <p className="mb-0">
            You have been approved{' '}
            <strong className="text-success">${loanParameters.amount}</strong>{' '}
            for <strong className="text-primary">{loanParameters.term}</strong>{' '}
            days.
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Start New Application
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SuccessModal;

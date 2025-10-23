import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Alert,
  Spinner,
} from 'react-bootstrap';
import type { LoanParameters } from '../types/formData.types';
import { useFormContext } from '../context/useFormContext';
import { submitLoanApplication } from '../services/api';

const LoanParametersForm: React.FC = () => {
  const navigate = useNavigate();
  const { formData, updateLoanParameters } = useFormContext();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<LoanParameters>({
    defaultValues: formData.loanParameters || {
      amount: 200,
      term: 10,
    },
  });

  const currentAmount = watch('amount');
  const currentTerm = watch('term');

  const onSubmit = async (data: LoanParameters) => {
    if (!formData.personalData) {
      setError('Personal data is missing. Please start from the beginning.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      updateLoanParameters(data);

      await submitLoanApplication(
        formData.personalData.firstName,
        formData.personalData.lastName
      );

      navigate('/success');
    } catch (err) {
      setError('Failed to submit application. Please try again.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    const currentValues = getValues();
    updateLoanParameters(currentValues);
    navigate('/address-work');
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Header as="h4" className="text-center">
              Loan Parameters
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-4" controlId="amount">
                  <Form.Label>
                    Loan Amount <span className="text-danger">*</span>
                  </Form.Label>
                  <div className="text-center mb-2">
                    <h4 className="text-primary">${currentAmount}</h4>
                  </div>
                  <Controller
                    name="amount"
                    control={control}
                    rules={{
                      required: 'Loan amount is required',
                      min: {
                        value: 200,
                        message: 'Minimum loan amount is $200',
                      },
                      max: {
                        value: 1000,
                        message: 'Maximum loan amount is $1000',
                      },
                      validate: (value) =>
                        value % 100 === 0 || 'Amount must be a multiple of 100',
                    }}
                    render={({ field }) => (
                      <Form.Range
                        {...field}
                        min={200}
                        max={1000}
                        step={100}
                        value={field.value}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    )}
                  />
                  <div className="d-flex justify-content-between small text-muted">
                    <span>$200</span>
                    <span>$1000</span>
                  </div>
                  {errors.amount && (
                    <div className="text-danger small mt-1">
                      {errors.amount.message}
                    </div>
                  )}
                </Form.Group>

                <Form.Group className="mb-4" controlId="term">
                  <Form.Label>
                    Loan Term <span className="text-danger">*</span>
                  </Form.Label>
                  <div className="text-center mb-2">
                    <h4 className="text-primary">
                      {currentTerm} {currentTerm === 1 ? 'day' : 'days'}
                    </h4>
                  </div>
                  <Controller
                    name="term"
                    control={control}
                    rules={{
                      required: 'Loan term is required',
                      min: {
                        value: 10,
                        message: 'Minimum term is 10 days',
                      },
                      max: {
                        value: 30,
                        message: 'Maximum term is 30 days',
                      },
                      validate: (value) =>
                        Number.isInteger(value) || 'Term must be an integer',
                    }}
                    render={({ field }) => (
                      <Form.Range
                        {...field}
                        min={10}
                        max={30}
                        step={1}
                        value={field.value}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    )}
                  />
                  <div className="d-flex justify-content-between small text-muted">
                    <span>10 days</span>
                    <span>30 days</span>
                  </div>
                  {errors.term && (
                    <div className="text-danger small mt-1">
                      {errors.term.message}
                    </div>
                  )}
                </Form.Group>

                <Row>
                  <Col xs={6}>
                    <div className="d-grid">
                      <Button
                        variant="secondary"
                        onClick={handleBack}
                        size="lg"
                        disabled={submitting}
                      >
                        Back
                      </Button>
                    </div>
                  </Col>
                  <Col xs={6}>
                    <div className="d-grid">
                      <Button
                        variant="success"
                        type="submit"
                        size="lg"
                        disabled={submitting}
                      >
                        {submitting ? (
                          <>
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                              className="me-2"
                            />
                            Submitting...
                          </>
                        ) : (
                          'Submit Application'
                        )}
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoanParametersForm;

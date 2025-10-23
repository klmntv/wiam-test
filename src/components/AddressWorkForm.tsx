import React, { useEffect, useState } from 'react';
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
} from 'react-bootstrap';
import type { AddressWork } from '../types/formData.types';
import { useFormContext } from '../context/useFormContext';
import { getWorkplaceCategories } from '../services/api';

const AddressWorkForm: React.FC = () => {
  const navigate = useNavigate();
  const { formData, updateAddressWork } = useFormContext();
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<AddressWork>({
    defaultValues: formData.addressWork || {
      workplace: '',
      address: '',
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await getWorkplaceCategories();
        setCategories(data);
        setError(null);
      } catch (err) {
        setError('Failed to load workplace categories. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const onSubmit = (data: AddressWork) => {
    updateAddressWork(data);
    navigate('/loan-parameters');
  };

  const handleBack = () => {
    const currentValues = getValues();
    if (currentValues.workplace || currentValues.address) {
      updateAddressWork(currentValues);
    }
    navigate('/');
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Header as="h4" className="text-center">
              Address and Workplace
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="workplace">
                  <Form.Label>
                    Workplace <span className="text-danger">*</span>
                  </Form.Label>
                  <Controller
                    name="workplace"
                    control={control}
                    rules={{
                      required: 'Workplace is required',
                    }}
                    render={({ field }) => (
                      <Form.Select
                        {...field}
                        isInvalid={!!errors.workplace}
                        disabled={loading}
                        value={field.value || ''}
                      >
                        <option value="">
                          {loading ? 'Loading...' : 'Select workplace'}
                        </option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category.charAt(0).toUpperCase() +
                              category.slice(1)}
                          </option>
                        ))}
                      </Form.Select>
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.workplace?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="address">
                  <Form.Label>
                    Address <span className="text-danger">*</span>
                  </Form.Label>
                  <Controller
                    name="address"
                    control={control}
                    rules={{
                      required: 'Address is required',
                      minLength: {
                        value: 5,
                        message: 'Address must be at least 5 characters',
                      },
                    }}
                    render={({ field }) => (
                      <Form.Control
                        {...field}
                        type="text"
                        placeholder="Enter your residential address"
                        isInvalid={!!errors.address}
                      />
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.address?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Row>
                  <Col xs={6}>
                    <div className="d-grid">
                      <Button
                        variant="secondary"
                        onClick={handleBack}
                        size="lg"
                      >
                        Back
                      </Button>
                    </div>
                  </Col>
                  <Col xs={6}>
                    <div className="d-grid">
                      <Button variant="primary" type="submit" size="lg">
                        Next
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

export default AddressWorkForm;

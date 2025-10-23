import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { IMaskInput } from 'react-imask';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import type { PersonalData } from '../types/formData.types';
import { useFormContext } from '../context/useFormContext';

const PersonalDataForm: React.FC = () => {
  const navigate = useNavigate();
  const { formData, updatePersonalData } = useFormContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalData>({
    defaultValues: formData.personalData || {
      phone: '',
      firstName: '',
      lastName: '',
      gender: '' as 'male' | 'female',
    },
  });

  const onSubmit = (data: PersonalData) => {
    updatePersonalData(data);
    navigate('/address-work');
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Header as="h4" className="text-center">
              Personal Data
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="phone">
                  <Form.Label>
                    Phone Number <span className="text-danger">*</span>
                  </Form.Label>
                  <Controller
                    name="phone"
                    control={control}
                    rules={{
                      required: 'Phone number is required',
                      pattern: {
                        value: /^0\d{3}\s\d{3}\s\d{3}$/,
                        message: 'Phone must match format: 0XXX XXX XXX',
                      },
                    }}
                    render={({ field: { onChange, value, ...field } }) => (
                      <IMaskInput
                        {...field}
                        mask="0000 000 000"
                        value={value}
                        unmask={false}
                        onAccept={(value: string) => onChange(value)}
                        placeholder="0XXX XXX XXX"
                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                        type="tel"
                      />
                    )}
                  />
                  {errors.phone && (
                    <div className="invalid-feedback d-block">
                      {errors.phone?.message}
                    </div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="firstName">
                  <Form.Label>
                    First Name <span className="text-danger">*</span>
                  </Form.Label>
                  <Controller
                    name="firstName"
                    control={control}
                    rules={{
                      required: 'First name is required',
                      minLength: {
                        value: 2,
                        message: 'First name must be at least 2 characters',
                      },
                    }}
                    render={({ field }) => (
                      <Form.Control
                        {...field}
                        type="text"
                        placeholder="Enter your first name"
                        isInvalid={!!errors.firstName}
                      />
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.firstName?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="lastName">
                  <Form.Label>
                    Last Name <span className="text-danger">*</span>
                  </Form.Label>
                  <Controller
                    name="lastName"
                    control={control}
                    rules={{
                      required: 'Last name is required',
                      minLength: {
                        value: 2,
                        message: 'Last name must be at least 2 characters',
                      },
                    }}
                    render={({ field }) => (
                      <Form.Control
                        {...field}
                        type="text"
                        placeholder="Enter your last name"
                        isInvalid={!!errors.lastName}
                      />
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.lastName?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="gender">
                  <Form.Label>
                    Gender <span className="text-danger">*</span>
                  </Form.Label>
                  <Controller
                    name="gender"
                    control={control}
                    rules={{
                      required: 'Gender is required',
                      validate: (value) =>
                        value === 'male' ||
                        value === 'female' ||
                        'Gender is required',
                    }}
                    render={({ field }) => (
                      <Form.Select
                        {...field}
                        isInvalid={!!errors.gender}
                        value={field.value || ''}
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </Form.Select>
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.gender?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit" size="lg">
                    Next
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PersonalDataForm;

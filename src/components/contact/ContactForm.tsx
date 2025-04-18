
// src/components/contact/ContactForm.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { useTheme } from '@/hooks/useTheme';
import { ContactApi } from '@/api/contactApi';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const FormContainer = styled(motion.div)`
  background-color: ${props => props.theme === 'dark' ? '#1e1e1e' : '#ffffff'};
  padding: 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const FormTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: ${props => props.theme === 'dark' ? '#ffffff' : '#222222'};
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div<{ fullWidth?: boolean }>`
  grid-column: ${props => props.fullWidth ? '1 / 3' : 'auto'};
  
  @media (max-width: 768px) {
    grid-column: 1;
  }
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${props => props.theme === 'dark' ? '#e0e0e0' : '#333333'};
`;

const FormInput = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  border: 1px solid ${props => props.hasError 
    ? '#e74c3c' 
    : props.theme === 'dark' ? '#333333' : '#dddddd'};
  border-radius: 0.5rem;
  background-color: ${props => props.theme === 'dark' ? '#2a2a2a' : '#ffffff'};
  color: ${props => props.theme === 'dark' ? '#e0e0e0' : '#333333'};
  transition: border-color 0.3s, box-shadow 0.3s;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
  }
  
  &::placeholder {
    color: ${props => props.theme === 'dark' ? '#666666' : '#aaaaaa'};
  }
`;

const FormTextarea = styled.textarea<{ hasError?: boolean }>`
  width: 100%;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  border: 1px solid ${props => props.hasError 
    ? '#e74c3c' 
    : props.theme === 'dark' ? '#333333' : '#dddddd'};
  border-radius: 0.5rem;
  background-color: ${props => props.theme === 'dark' ? '#2a2a2a' : '#ffffff'};
  color: ${props => props.theme === 'dark' ? '#e0e0e0' : '#333333'};
  resize: vertical;
  min-height: 150px;
  transition: border-color 0.3s, box-shadow 0.3s;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
  }
  
  &::placeholder {
    color: ${props => props.theme === 'dark' ? '#666666' : '#aaaaaa'};
  }
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const SubmitButton = styled.button<{ isLoading?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${props => props.isLoading ? 'not-allowed' : 'pointer'};
  transition: background-color 0.3s, transform 0.3s;
  margin-top: 1rem;
  grid-column: 1 / 3;
  opacity: ${props => props.isLoading ? 0.7 : 1};
  width: 100%;
  
  &:hover:not(:disabled) {
    background-color: #2980b9;
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    grid-column: 1;
  }
`;

const StatusMessage = styled.div<{ type: 'success' | 'error' }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-radius: 0.5rem;
  background-color: ${props => props.type === 'success' ? 'rgba(46, 204, 113, 0.1)' : 'rgba(231, 76, 60, 0.1)'};
  color: ${props => props.type === 'success' ? '#2ecc71' : '#e74c3c'};
  font-weight: 500;
`;

const ContactForm: React.FC = () => {
  const { theme } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm<FormData>();
  
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await ContactApi.sendMessage(data);
      
      if (response.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Your message has been sent successfully. I will get back to you soon!'
        });
        reset();
      } else {
        throw new Error(response.message || 'Failed to send message');
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error 
          ? error.message 
          : 'Something went wrong. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <FormContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      theme={theme}
    >
      <FormTitle theme={theme}>Get In Touch</FormTitle>
      
      {submitStatus && (
        <StatusMessage type={submitStatus.type}>
          {submitStatus.type === 'success' ? (
            <FiCheckCircle size={20} />
          ) : (
            <FiAlertCircle size={20} />
          )}
          {submitStatus.message}
        </StatusMessage>
      )}
      
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <FormLabel htmlFor="name" theme={theme}>Your Name</FormLabel>
          <FormInput
            id="name"
            type="text"
            placeholder="John Doe"
            {...register('name', { 
              required: 'Name is required',
              minLength: {
                value: 2,
                message: 'Name should be at least 2 characters'
              }
            })}
            hasError={!!errors.name}
            theme={theme}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </FormGroup>
        
        <FormGroup>
          <FormLabel htmlFor="email" theme={theme}>Your Email</FormLabel>
          <FormInput
            id="email"
            type="email"
            placeholder="john@example.com"
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            hasError={!!errors.email}
            theme={theme}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </FormGroup>
        
        <FormGroup fullWidth>
          <FormLabel htmlFor="subject" theme={theme}>Subject</FormLabel>
          <FormInput
            id="subject"
            type="text"
            placeholder="Project Inquiry"
            {...register('subject', { 
              required: 'Subject is required',
              minLength: {
                value: 3,
                message: 'Subject should be at least 3 characters'
              }
            })}
            hasError={!!errors.subject}
            theme={theme}
          />
          {errors.subject && <ErrorMessage>{errors.subject.message}</ErrorMessage>}
        </FormGroup>
        
        <FormGroup fullWidth>
          <FormLabel htmlFor="message" theme={theme}>Your Message</FormLabel>
          <FormTextarea
            id="message"
            placeholder="Hello, I'm interested in working with you on a project..."
            {...register('message', { 
              required: 'Message is required',
              minLength: {
                value: 10,
                message: 'Message should be at least 10 characters'
              }
            })}
            hasError={!!errors.message}
            theme={theme}
          />
          {errors.message && <ErrorMessage>{errors.message.message}</ErrorMessage>}
        </FormGroup>
        
        <SubmitButton 
          type="submit" 
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'} <FiSend />
        </SubmitButton>
      </Form>
    </FormContainer>
  );
};

export default ContactForm;

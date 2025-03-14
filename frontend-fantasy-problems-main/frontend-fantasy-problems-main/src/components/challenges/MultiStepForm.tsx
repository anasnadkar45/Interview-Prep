
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface FormData {
  // Step 1: Personal Information
  firstName: string;
  lastName: string;
  email: string;
  
  // Step 2: Address Information
  address: string;
  city: string;
  state: string;
  zipCode: string;
  
  // Step 3: Account Setup
  username: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  [key: string]: string;
}

const MultiStepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const steps = [
    { id: 1, title: 'Personal Information' },
    { id: 2, title: 'Address' },
    { id: 3, title: 'Account Setup' },
    { id: 4, title: 'Review & Submit' }
  ];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Email is invalid';
        }
        break;
        
      case 2:
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.zipCode.trim()) {
          newErrors.zipCode = 'Zip code is required';
        } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
          newErrors.zipCode = 'Zip code is invalid';
        }
        break;
        
      case 3:
        if (!formData.username.trim()) {
          newErrors.username = 'Username is required';
        } else if (formData.username.length < 4) {
          newErrors.username = 'Username must be at least 4 characters';
        }
        
        if (!formData.password.trim()) {
          newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
          newErrors.password = 'Password must be at least 8 characters';
        }
        
        if (!formData.confirmPassword.trim()) {
          newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const goToNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const goToPreviousStep = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, you would send the form data to a server here
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
  };
  
  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div 
                className={`flex items-center justify-center h-10 w-10 rounded-full border-2 
                  ${currentStep >= step.id ? 'border-primary bg-primary text-primary-foreground' : 'border-muted text-muted-foreground'}`}
              >
                {currentStep > step.id ? <Check size={16} /> : step.id}
              </div>
              <span className={`text-xs mt-2 ${currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'}`}>
                {step.title}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div 
                className={`h-1 flex-1 mx-2 ${
                  currentStep > index + 1 ? 'bg-primary' : 'bg-muted'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };
  
  const renderFormFields = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Personal Information</h2>
            
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-md ${errors.firstName ? 'border-red-500' : 'border-input'}`}
              />
              {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-md ${errors.lastName ? 'border-red-500' : 'border-input'}`}
              />
              {errors.lastName && <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-input'}`}
              />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Address Information</h2>
            
            <div>
              <label className="block text-sm font-medium mb-1">Street Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-md ${errors.address ? 'border-red-500' : 'border-input'}`}
              />
              {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-md ${errors.city ? 'border-red-500' : 'border-input'}`}
              />
              {errors.city && <p className="text-sm text-red-500 mt-1">{errors.city}</p>}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-md ${errors.state ? 'border-red-500' : 'border-input'}`}
                />
                {errors.state && <p className="text-sm text-red-500 mt-1">{errors.state}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Zip Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-md ${errors.zipCode ? 'border-red-500' : 'border-input'}`}
                />
                {errors.zipCode && <p className="text-sm text-red-500 mt-1">{errors.zipCode}</p>}
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Account Setup</h2>
            
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-md ${errors.username ? 'border-red-500' : 'border-input'}`}
              />
              {errors.username && <p className="text-sm text-red-500 mt-1">{errors.username}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-md ${errors.password ? 'border-red-500' : 'border-input'}`}
              />
              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-md ${errors.confirmPassword ? 'border-red-500' : 'border-input'}`}
              />
              {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Review Your Information</h2>
            
            <section className="space-y-4">
              <h3 className="text-lg font-medium">Personal Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">First Name</p>
                  <p>{formData.firstName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Name</p>
                  <p>{formData.lastName}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p>{formData.email}</p>
                </div>
              </div>
            </section>
            
            <section className="space-y-4">
              <h3 className="text-lg font-medium">Address</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">Street Address</p>
                  <p>{formData.address}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">City</p>
                  <p>{formData.city}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">State</p>
                  <p>{formData.state}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Zip Code</p>
                  <p>{formData.zipCode}</p>
                </div>
              </div>
            </section>
            
            <section className="space-y-4">
              <h3 className="text-lg font-medium">Account</h3>
              <div>
                <p className="text-sm text-muted-foreground">Username</p>
                <p>{formData.username}</p>
              </div>
            </section>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  const renderButtons = () => {
    return (
      <div className="flex justify-between mt-8">
        {currentStep > 1 && (
          <Button
            type="button"
            variant="outline"
            onClick={goToPreviousStep}
            className="flex items-center gap-1"
          >
            <ChevronLeft size={16} />
            Previous
          </Button>
        )}
        
        <div className="ml-auto">
          {currentStep < steps.length ? (
            <Button
              type="button"
              onClick={goToNextStep}
              className="flex items-center gap-1"
            >
              Next
              <ChevronRight size={16} />
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700"
            >
              Submit
            </Button>
          )}
        </div>
      </div>
    );
  };
  
  if (isSubmitted) {
    return (
      <div className="w-full max-w-2xl mx-auto p-8 space-y-6 text-center">
        <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
          <Check size={32} />
        </div>
        <h2 className="text-2xl font-bold">Registration Complete!</h2>
        <p className="text-muted-foreground">Thank you for completing the multi-step form.</p>
        <Button
          onClick={() => {
            setFormData({
              firstName: '',
              lastName: '',
              email: '',
              address: '',
              city: '',
              state: '',
              zipCode: '',
              username: '',
              password: '',
              confirmPassword: ''
            });
            setCurrentStep(1);
            setIsSubmitted(false);
          }}
        >
          Start Over
        </Button>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Multi-step Form</h2>
      
      {renderStepIndicator()}
      
      <form onSubmit={handleSubmit} className="border rounded-lg p-6 shadow-sm">
        {renderFormFields()}
        {renderButtons()}
      </form>
    </div>
  );
};

export default MultiStepForm;

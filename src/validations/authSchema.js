import * as Yup from 'yup';

const registerSchema = Yup.object({
  fullName: Yup.string().required('Full Name is required').min(3, 'Full Name must be at least 3 characters'),
  userName: Yup.string().required('User Name is required').min(3, 'User Name must be at least 3 characters'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  phoneNumber: Yup.string().matches(/^[0-9]{10}$/, 'Phone Number must be 10 digits').required('Phone Number is required').matches(/^05\d{8}$/, 'Phone Number must start with 05'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required').matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
  .matches(/[0-9]/, 'Password must contain at least one number')
  .matches(/[@$!%*?&]/, 'Password must contain at least one special character')
});

export default registerSchema; 

export const loginSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required').matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
  .matches(/[0-9]/, 'Password must contain at least one number')
  .matches(/[@$!%*?&]/, 'Password must contain at least one special character')
}); 
 

export const emailSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Email is required'),
})

export const codeSchema = Yup.object({
  code: Yup.string().required('Code is required').matches(/^\d+$/, 'Digits only'),
})

export const newPasswordSchema = Yup.object({
  newPassword: Yup.string()
    .required('Password is required')
    .min(6, 'At least 6 characters')
    .matches(/[A-Z]/, 'Needs an uppercase letter')
    .matches(/[a-z]/, 'Needs a lowercase letter')
    .matches(/[0-9]/, 'Needs a number')
    .matches(/[@$!%*?&]/, 'Needs a special character'),
  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('newPassword')], 'Passwords do not match'),
})

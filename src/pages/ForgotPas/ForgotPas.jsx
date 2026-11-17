import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Box, Button, Container, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { emailSchema, codeSchema, newPasswordSchema } from '../../validations/authSchema'

const BASE = 'https://knowledgeshop.runasp.net/api/auth/Account'
const steps = ['Email', 'Code', 'New password']
const blackBtn = { mt: 2, bgcolor: '#000', '&:hover': { bgcolor: '#1c2024' } }

function EmailStep({ onDone }) {
  const [serverError, setServerError] = useState(null)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(emailSchema),
  })

  const onSubmit = async ({ email }) => {
    setServerError(null)
    try {
      await axios.post(`${BASE}/SendCode`, { email })
      onDone(email)
    } catch (error) {
      setServerError(error.response?.data?.message || 'Could not send the code. Try again.')
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography color="text.secondary" sx={{ textAlign: 'center' }}>
        Enter your email and we will send you a code.
      </Typography>
      {serverError && <Alert severity="error" sx={{ mt: 2 }}>{serverError}</Alert>}
      <TextField label="Email" fullWidth margin="normal" {...register('email')}
        error={!!errors.email} helperText={errors.email?.message} />
      <Button type="submit" fullWidth variant="contained" disabled={isSubmitting} sx={blackBtn}>
        {isSubmitting ? 'Sending...' : 'Send code'}
      </Button>
    </Box>
  )
}

function CodeStep({ email, onDone, onBack }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(codeSchema),
  })

  return (
    <Box component="form" onSubmit={handleSubmit(({ code }) => onDone(code))}>
      <Typography color="text.secondary" sx={{ textAlign: 'center' }}>
        We sent a code to {email}
      </Typography>
      <TextField label="Code" fullWidth margin="normal" {...register('code')}
        error={!!errors.code} helperText={errors.code?.message} />
      <Button type="submit" fullWidth variant="contained" sx={blackBtn}>Continue</Button>
      <Button fullWidth color="inherit" sx={{ mt: 1 }} onClick={onBack}>Change email</Button>
    </Box>
  )
}

function PasswordStep({ email, code, onBackToCode }) {
  const navigate = useNavigate()
  const [serverError, setServerError] = useState(null)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(newPasswordSchema),
  })

  const onSubmit = async ({ newPassword }) => {
    setServerError(null)
    try {
      await axios.patch(`${BASE}/ResetPassword`, { email, code, newPassword })
      navigate('/login')
    } catch (error) {
      setServerError(error.response?.data?.message || 'Reset failed. Check the code and try again.')
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography color="text.secondary" sx={{ textAlign: 'center' }}>
        Choose a new password.
      </Typography>
      {serverError && <Alert severity="error" sx={{ mt: 2 }}>{serverError}</Alert>}
      <TextField label="New password" type="password" fullWidth margin="normal" {...register('newPassword')}
        error={!!errors.newPassword} helperText={errors.newPassword?.message} />
      <TextField label="Confirm password" type="password" fullWidth margin="normal" {...register('confirmPassword')}
        error={!!errors.confirmPassword} helperText={errors.confirmPassword?.message} />
      <Button type="submit" fullWidth variant="contained" disabled={isSubmitting} sx={blackBtn}>
        {isSubmitting ? 'Saving...' : 'Reset password'}
      </Button>
      <Button fullWidth color="inherit" sx={{ mt: 1 }} onClick={onBackToCode}>Re-enter code</Button>
    </Box>
  )
}

export default function ForgotPas() {
  const [step, setStep] = useState(0)
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')

  return (
    <main>
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: 'background.paper', p: 4, borderRadius: 2, boxShadow: 3, mt: 8 }}>
          <Typography variant="h4" component="h1" sx={{ textAlign: 'center' }} gutterBottom>
            Forgot password
          </Typography>

          <Stepper activeStep={step} alternativeLabel sx={{ mb: 3 }}>
            {steps.map((label) => (
              <Step key={label}><StepLabel>{label}</StepLabel></Step>
            ))}
          </Stepper>

          {step === 0 && (
            <EmailStep onDone={(value) => { setEmail(value); setStep(1) }} />
          )}
          {step === 1 && (
            <CodeStep
              email={email}
              onDone={(value) => { setCode(value); setStep(2) }}
              onBack={() => setStep(0)}
            />
          )}
          {step === 2 && (
            <PasswordStep email={email} code={code} onBackToCode={() => setStep(1)} />
          )}

          <Typography variant="body2" sx={{ textAlign: 'center', mt: 3 }}>
            <Link to="/login">Back to login</Link>
          </Typography>
        </Box>
      </Container>
    </main>
  )
}
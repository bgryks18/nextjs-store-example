'use client'
import { useGetSession } from '@/api/user'
import {
  Button,
  FormControl,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material'
import { FormGroup } from '@mui/material'
import { makeStyles } from 'tss-react/mui'
import { SubmitHandler, useForm } from 'react-hook-form'
import CircularProgress from '@mui/material/CircularProgress'
import { useSetAtom } from 'jotai'
import { errorState } from '@/store/ui'
import { useRouter } from 'next/navigation'
import { PATH } from '@/types/common'

interface IFormInput {
  email: string
  password: string
}

const useStyles = makeStyles()((theme) => ({
  formContainer: {
    width: 400,
    maxWidth: '100%',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  formGroup: {
    display: 'flex',
    gap: 12,
  },
  sendButton: {
    textTransform: 'none',
    gap: 6,
  },
}))

const LoginForm = () => {
  const { mutateAsync: mutateGetSession, isPending, isError } = useGetSession()
  const setError = useSetAtom(errorState)
  const { classes } = useStyles()
  const { register, handleSubmit } = useForm<IFormInput>()
  const router = useRouter()
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await mutateGetSession()
      router.push(PATH.HOME)
    } catch (e: any) {
      console.log('login error', e)
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.formContainer}>
      <Typography component="div" variant="h6" color="GrayText">
        Login For Shopping
      </Typography>
      <FormGroup>
        <FormControl className={classes.formGroup}>
          <TextField
            label="E-mail"
            defaultValue="test@hotmail.com"
            {...register('email')}
          />
          <TextField
            type="password"
            label="Password"
            defaultValue="123456"
            {...register('password')}
          />
          <Button
            variant="contained"
            size="large"
            type="submit"
            disabled={isPending}
            className={classes.sendButton}
          >
            {isPending && <CircularProgress size={18} color="secondary" />}
            <span>Login</span>
          </Button>
        </FormControl>
      </FormGroup>
      <Snackbar
        open={isError}
        autoHideDuration={1000}
        onClose={() => {
          console.log('CLOSED')
        }}
        message="Error"
      />
    </form>
  )
}

export default LoginForm

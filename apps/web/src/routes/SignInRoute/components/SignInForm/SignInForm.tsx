import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useClient } from '@/hooks'
import { toast } from 'sonner'
import * as yup from 'yup'
import { useFormik } from 'formik'

const formSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
})

export function SignInForm () {
  const client = useClient()
  const formik = useFormik({
    validationSchema: formSchema,
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async values => {
      try {
        await client.signIn({ email: values.email, password: values.password })
      } catch (error) {
        toast.error(await client.getError(error))
      }
    }
  })

  return (
    <form className="px-8 md:px-8 py-14 md:py-14" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground text-balance text-sm">
            Login to your Flex Board account
          </p>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Password</Label>
          <Input
            id="password"
            type="password"
            required
            minLength={6}
            value={formik.values.password}
            onChange={formik.handleChange}
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={formik.isSubmitting}
        >
          Login
        </Button>
      </div>
    </form>
  )
}

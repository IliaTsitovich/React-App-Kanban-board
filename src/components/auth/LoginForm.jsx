import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../../context/AuthContext';
import { loginSchema } from '../../lib/validation';
import { Input } from '../common/Input';
import Button from '../common/Button';

export function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });

  async function onSubmit(data) {
    const result = await login(data);
    if (!result.ok) {
      setError('root', { message: result.error });
      return;
    }
    toast.success(`Welcome back, ${result.user.username}!`);
    navigate('/', { replace: true });
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input
        id="username"
        label="Username"
        autoComplete="username"
        autoFocus
        error={errors.username?.message}
        {...register('username')}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        error={errors.password?.message}
        {...register('password')}
      />
      {errors.root && (
        <p className="field-error" role="alert">
          {errors.root.message}
        </p>
      )}
      <Button type="submit" className="submit_button validated" disabled={isSubmitting}>
        Log in
      </Button>
    </form>
  );
}

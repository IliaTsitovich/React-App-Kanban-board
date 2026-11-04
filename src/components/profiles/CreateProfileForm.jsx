import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../../context/ProfileContext';
import { profileSchema } from '../../lib/validation';
import { Input } from '../common/Input';
import Button from '../common/Button';

export function CreateProfileForm() {
  const { createProfile } = useProfile();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: zodResolver(profileSchema) });

  function onSubmit(data) {
    const result = createProfile(data);
    if (!result.ok) {
      setError('username', { message: result.error });
      return;
    }
    navigate('/', { replace: true });
  }

  return (
    <form className="profile-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input
        id="username"
        label="Profile name"
        autoComplete="off"
        autoFocus
        error={errors.username?.message}
        {...register('username')}
      />
      <Button type="submit" className="submit_button validated">
        Create profile
      </Button>
    </form>
  );
}

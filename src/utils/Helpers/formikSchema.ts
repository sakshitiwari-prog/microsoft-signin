import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .max(40, 'Name should be less than 40 characters')
    .min(1, 'Name should be more than 1 characters')
    .required('*Please enter your name'),

  email: Yup.string()
    .email('*Please enter a valid email address')
    .required('*Please enter your email address'),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      '*Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character',
    )
    .required('*Please enter your password'),
});
export const ProfileSchema = Yup.object().shape({
  name: Yup.string()
    .max(40, 'Name should be less than 40 characters')
    .min(1, 'Name should be more than 1 characters')
    .required('*Please enter your name'),

  email: Yup.string()
    .email('*Please enter a valid email address')
    .required('*Please enter your email address'),
});
export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('*Please enter a valid email address')
    .required('*Please enter your email address'),
  password: Yup.string().required('*Please enter your password'),
});

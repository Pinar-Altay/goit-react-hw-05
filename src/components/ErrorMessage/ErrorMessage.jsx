import s from './ErrorMessage.module.css';

const ErrorMessage = () => {
  return (
    <div className={s.error}>
      <span>Something went wrong!</span>
    </div>
  );
};

export default ErrorMessage;

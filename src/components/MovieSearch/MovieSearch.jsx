import { Formik, Form, Field } from 'formik';
import s from './MovieSearch.module.css';

const MovieSearch = ({ onSearch }) => {
  const handleSubmit = ({ name }) => {
    onSearch(name.trim());
  };

  const initialValues = {
    name: '',
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      <Form className={s.searchForm}>
        <Field name="name" />
        <button type="submit">Search</button>
      </Form>
    </Formik>
  );
};

export default MovieSearch;

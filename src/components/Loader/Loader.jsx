import { MagnifyingGlass } from 'react-loader-spinner';
import s from './Loader.module.css';

const Loader = () => {
  return (
    <div className={s.loader}>
      <MagnifyingGlass
        visible={true}
        height="120"
        width="120"
        glassColor="#c0efff"
        color="#e15b64"
      />
    </div>
  );
};

export default Loader;

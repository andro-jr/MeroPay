import { useState } from 'react';
import '../../index.css';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const FormInput = ({
  placeholder,
  type,
  label,
  name,
  value,
  style,
  ...rest
}) => {
  const [show, setShow] = useState(false);

  const showPassword = () => {
    setShow(!show);
    console.log(show);
  };

  return (
    <div
      className={`relative mb-5 ${style}  min-w-auto lg:min-w-[300px] xl:min-w-[400px] flex flex-col-reverse`}
    >
      <input
        className='relative w-full py-3 mt-2  border-b-2 border-blue-600 outline-none placeholder:text-sm placeholder:tracking-wider transition tracking-wider text-sm peer'
        placeholder={placeholder}
        type={type === 'password' ? (show ? 'text' : 'password') : type}
        name={name}
        id={name}
        {...rest}
        required
      />
      <label
        htmlFor={name}
        className='form__label peer-focus:text-blue-600 transition'
      >
        {name}
      </label>

      <label
        className={`absolute top-1/2 right-3 translate-y-1/2 text-gray-500 cursor-pointer`}
        onClick={showPassword}
      >
        {name === 'password' && show === true ? (
          <AiFillEyeInvisible />
        ) : name === 'password' && show === false ? (
          <AiFillEye />
        ) : (
          ''
        )}
      </label>
    </div>
  );
};

export default FormInput;

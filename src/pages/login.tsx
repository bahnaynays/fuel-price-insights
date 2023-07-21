import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';

const SigninPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  /*const onSubmit = async (data) => {
    console.log(data);

    const response = await fetch('api/loginback',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);

      //storing local token
      localStorage.setItem('token', responseData.token);

      //attempt at redirecting user to fuel form
      router.push('/fuelform');

    } else {
      const errorData = await response.json();
      console.log(errorData);
    }
  }*/

  const onSubmit = async (data) => {
    console.log(data);

    const response = await fetch('api/loginback',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);
      
      // Store the token in local storage
      localStorage.setItem('token', responseData.token);

      // Redirect user to a protected page, if needed
      //router.push('/protected-page-url');
      
    } else {
      const errorData = await response.json();
      console.log(errorData);
    }
  }

  return (
    <div className="flex flex-col min-h-screen ">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-opacity-80 bg-black z-20">
        {showModal && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md flex flex-col relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                onClick={() => setShowModal(false)}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M11.414 10L15.707 5.707a1 1 0 10-1.414-1.414L10 8.586 5.707 4.293a1 1 0 10-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 001.414 1.414L10 11.414l4.293 4.293a1 1 0 001.414-1.414L11.414 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <form onSubmit={handleSubmit(onSubmit)} className="flex-grow">
                <div className="mb-4">
                  <label className="text-black mb-1">Email:</label>
                  <div className="flex">
                    <input
                      {...register('email', { required: true })}
                      className="border border-gray-300 rounded-md px-3 py-2 text-black"
                    />
                  </div>
                  {errors.email && <p>This field is required</p>}
                </div>
                <div className="mb-4">
                  <label className="text-black mb-1">Password:</label>
                  <div className="flex">
                    <input
                      type="password"
                      {...register('password', { required: true })}
                      className="border border-gray-300 rounded-md px-3 py-2 text-black"
                    />
                  </div>
                  {errors.password && <p>This field is required</p>}
                </div>
                <div className="flex justify-end">
                  <button className="text-md flex items-center rounded-md px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white w-full" type="submit">Log In</button>
                </div>
              </form>
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                onClick={() => setShowModal(false)}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M11.414 10L15.707 5.707a1 1 0 10-1.414-1.414L10 8.586 5.707 4.293a1 1 0 10-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 001.414 1.414L10 11.414l4.293 4.293a1 1 0 001.414-1.414L11.414 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
        <div className="bg-white p-8 rounded-lg shadow-md flex flex-col flex-grow-0 relative">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            onClick={() => setShowModal(true)}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M11.414 10L15.707 5.707a1 1 0 10-1.414-1.414L10 8.586 5.707 4.293a1 1 0 10-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 001.414 1.414L10 11.414l4.293 4.293a1 1 0 001.414-1.414L11.414 10z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <form onSubmit={handleSubmit(onSubmit)} className="flex-grow">
            <div className="mb-4">
              <label className="text-black mb-1">Email:</label>
              <div className="flex">
                <input
                  {...register('email', { required: true })}
                  className="border border-gray-300 rounded-md px-3 py-2 text-black"
                />
              </div>
              {errors.email && <p>This field is required</p>}
            </div>
            <div className="mb-4">
              <label className="text-black mb-1">Password:</label>
              <div className="flex">
                <input
                  type="password"
                  {...register('password', { required: true })}
                  className="border border-gray-300 rounded-md px-3 py-2 text-black"
                />
              </div>
              {errors.password && <p>This field is required</p>}
            </div>
            <div className="flex justify-end">
              <button className="text-md flex items-center rounded-md px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white w-full" type="submit">Log In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;

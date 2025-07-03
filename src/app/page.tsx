'use client';

import { useState } from 'react';
import { useForm, FieldErrors } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast, { Toaster } from 'react-hot-toast';
import { FaEnvelope, FaLock, FaStarOfLife } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";

const schema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type FormData = z.infer<typeof schema>;

export default function NeumorphicForm() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [checked, setChecked] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-indigo-100 shadow-lg border-zinc-400 runded-2xl border-dashed border-2 rounded-xl pointer-events-auto flex `}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <img
                className="h-10 w-10 rounded-full"
                src="/user.png"
                alt="avatar"
              />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                {activeTab === 'login' ? 'Welcome back!' : 'Registration Complete 🎉'}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                <span className="font-semibold">User:</span> {data.username}<br />
                <span className="font-semibold">Email:</span> {data.email}
              </p>
            </div>
          </div>
        </div>
        

        <div className="flex flex-row  items-center justify-center">
          <div className='w-[1.5px] h-[60px] bg-zinc-500'>

          </div>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-xl p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    ));
  };

  const onError = (errors: FieldErrors<FormData>) => {
    const firstError = Object.values(errors)[0]?.message;
    if (typeof firstError === 'string') {
      toast.error(firstError);
    } else {
      toast.error('Form has errors, please correct them.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e0e5ec]">
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="w-[400px] p-6 rounded-[2.5rem] bg-[#e0e5ec] shadow-[12px_12px_25px_#c1c9d6,_-12px_-12px_25px_#ffffff] flex flex-col gap-6 text-gray-600 font-semibold select-none"
      >
        <Toaster position="top-center" />

        <div className="flex justify-between items-center w-full">
          <div className="w-[220px] p-2 rounded-full bg-[#e0e5ec] shadow-[inset_6px_6px_12px_#c5cbd5,_inset_-6px_-6px_12px_#ffffff] relative">
            <div
              className={`absolute top-2 bottom-2 w-[48%] rounded-full bg-[#e0e5ec] shadow-[inset_6px_6px_10px_#c5cbd5,_inset_-6px_-6px_10px_#ffffff] transition-all duration-300 ease-in-out ${
                activeTab === 'login' ? 'left-2' : 'left-[50%]'
              }`}
            />
            <div className="relative z-10 flex justify-between text-sm font-bold">
              <button
                type="button"
                onClick={() => setActiveTab('login')}
                className={`w-1/2 py-2 rounded-full transition-all duration-300 ${
                  activeTab === 'login' ? 'text-blue-500' : 'text-gray-500'
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('register')}
                className={`w-1/2 py-2 rounded-full transition-all duration-300 ${
                  activeTab === 'register' ? 'text-blue-500' : 'text-gray-500'
                }`}
              >
                Register
              </button>
            </div>
          </div>

          <div className="relative flex size-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex size-4 rounded-full bg-sky-500"></span>
          </div>
        </div>

<div className="relative w-full">
  <FaUserAlt className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
  <input
    {...register('username')}
    autoComplete="off"
    placeholder="Username"
    className="w-full pl-12 py-4 pr-4 rounded-2xl bg-[#e0e5ec] text-sm
      shadow-[inset_6px_6px_10px_#c3cad5,_inset_-6px_-6px_10px_#ffffff]
      placeholder-gray-400 focus:outline-none"
  />
</div>
      <div className="relative w-full">
  <FaEnvelope className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
  <input
    {...register('email')}
    autoComplete="off"
    placeholder="Email"
    className="w-full pl-12 py-4 pr-4 rounded-2xl bg-[#e0e5ec] text-sm
      shadow-[inset_6px_6px_10px_#c3cad5,_inset_-6px_-6px_10px_#ffffff]
      placeholder-gray-400 focus:outline-none"
  />
</div>

{/* Password Input */}
<div className="relative w-full">
  <FaLock className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
  <input
    type="password"
    {...register('password')}
    autoComplete="off"
    placeholder="Password"
    className="w-full pl-12 py-4 pr-4 rounded-2xl bg-[#e0e5ec] text-sm
      shadow-[inset_6px_6px_10px_#c3cad5,_inset_-6px_-6px_10px_#ffffff]
      placeholder-gray-400 focus:outline-none"
  />
</div>
        <div className="flex justify-between items-end w-full">
          <button
            type="submit"
            className="relative group px-10 py-3 rounded-2xl bg-[#dce1ea] text-blue-500 text-lg font-bold tracking-wide shadow-[9px_9px_16px_#b2b8c2,_-9px_-9px_16px_#ffffff] transition-all duration-300 ease-in-out hover:shadow-[inset_9px_9px_16px_#b2b8c2,_inset_-9px_-9px_16px_#ffffff] active:scale-95"
          >
            <span className="relative z-10">{activeTab === 'login' ? 'Login' : 'Register'}</span>
            <span className="absolute inset-0 rounded-[1.8rem] bg-white/30 opacity-0 group-hover:opacity-10 transition duration-300"></span>
          </button>

          <div className="flex items-center gap-4">
            <div className="text-sm text-red-500 flex flex-row items-center gap-2"><FaStarOfLife /> Remember</div>
            <label className="relative w-8 h-8 rounded-[0.5rem] flex items-center justify-center bg-[#e0e5ec] shadow-[6px_6px_12px_#c5cbd5,_-6px_-6px_12px_#ffffff] hover:scale-105 transition-all duration-300 cursor-pointer">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => setChecked(!checked)}
                className="hidden"
              />
              {checked && (
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
              <span
                className={`absolute inset-0 rounded-[0.5rem] transition-all duration-300 ${
                  checked
                    ? 'shadow-[inset_4px_4px_10px_#c5cbd5,_inset_-4px_-4px_10px_#ffffff]'
                    : ''
                }`}
              />
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}

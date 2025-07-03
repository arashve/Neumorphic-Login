import { Toaster } from 'react-hot-toast';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
      {children}
    </>
  );
}

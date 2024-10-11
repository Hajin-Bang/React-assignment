import * as React from 'react';
import { cn } from '@/lib/utils';
import { useToastStore } from '@/store/toast/useToastStore';

interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {}

const Toast: React.FC<ToastProps> = ({ className, ...props }) => {
  const { isVisible, message, type } = useToastStore();

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center space-x-4 rounded-lg p-4 shadow-lg transition-opacity duration-300',
        type === 'success'
          ? 'bg-green-500 text-white'
          : 'bg-red-500 text-white',
        isVisible ? 'opacity-100' : 'opacity-0',
        className
      )}
      {...props}
    >
      <span>{message}</span>
    </div>
  );
};

export default Toast;

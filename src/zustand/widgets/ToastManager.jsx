import React, { useEffect } from 'react';
import {create} from 'zustand';
import './ToastManager.css';
import {nanoid} from 'nanoid';
import clsx from 'clsx';


// Create a toast store with Zustand inside the component file.
const useToastStore = create((set) => ({
  toasts: [],
  addToast: (toast) =>
    set((state) => ({ toasts: [...state.toasts, toast] })),
  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));

// Toast component: displays an individual toast and auto-dismisses it.
function Toast({ id, message, type = 'success', duration = 3000, onRemove }) {
  const [fadeOut, setFadeOut] = React.useState(false);

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => {
      setFadeOut(true);
    }, duration - 500);

    const removeTimer = setTimeout(() => {
      onRemove(id);
    }, duration);

    return () => {
      clearTimeout(removeTimer);
      clearTimeout(fadeOutTimer);
    }
  }, [id, duration, onRemove]);

  return (
  <div className={clsx("toast", type, fadeOut && "fade-out")}>
    <div className='toast-text'>{message}</div> 
  </div>
  )
}

// ToastManager component: renders toasts from the store.
export default function ToastManager() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onRemove={removeToast}
        />
      ))}
    </div>
  );
}

// Export a hook to allow adding toasts from anywhere in your app.
export const useToast = () => {
  const addToast = useToastStore((state) => state.addToast);

  return (message, type = 'success', duration) => {
    const id = nanoid();
    addToast({ id, message, type, duration });
  };
};

export const useToast_noReact = (message, type = 'success', duration) => {
  const id = nanoid();
  useToastStore.getState().addToast({ id, message, type, duration });
};

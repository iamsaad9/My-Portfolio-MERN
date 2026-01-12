import React, { useState, useEffect } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

interface ToastProps {
  message: string;
  type: string;
  duration?: number;
  onClose: () => void;
}

interface ToastContainerProps {
  toasts: {
    id: string;
    message: string;
    type: string;
    duration?: number;
  }[];
  removeToast: (id: string) => void;
}

const Toast = ({
  message,
  type = "info",
  duration = 3000,
  onClose,
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 300);
  };

  const config = {
    success: {
      icon: CheckCircle,
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-800",
      iconColor: "text-green-500",
    },
    error: {
      icon: AlertCircle,
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-800",
      iconColor: "text-red-500",
    },
    warning: {
      icon: AlertTriangle,
      bg: "bg-amber-50",
      border: "border-amber-200",
      text: "text-amber-800",
      iconColor: "text-amber-500",
    },
    info: {
      icon: Info,
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-800",
      iconColor: "text-blue-500",
    },
  } as const;

  const {
    icon: Icon,
    bg,
    border,
    text,
    iconColor,
  } = config[type as keyof typeof config];

  return (
    <div
      className={`flex items-start gap-3 ${bg} ${border} border rounded-lg px-4 py-3 shadow-lg min-w-[320px] max-w-md transition-all duration-300 ${
        isVisible && !isExiting
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-2"
      }`}
    >
      <Icon className={`${iconColor} flex-shrink-0 mt-0.5`} size={20} />
      <p className={`${text} flex-1 text-sm font-medium`}>{message}</p>
      <button
        onClick={handleClose}
        className={`${text} hover:opacity-70 transition-opacity flex-shrink-0`}
      >
        <X size={18} />
      </button>
    </div>
  );
};

export const ToastContainer = ({
  toasts,
  removeToast,
}: ToastContainerProps) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

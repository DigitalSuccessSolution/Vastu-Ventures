import React, { useEffect } from "react";
import { Trash2, AlertCircle } from "lucide-react";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  error?: string | null;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function DeleteConfirmModal({
  isOpen,
  title,
  message,
  error,
  onConfirm,
  onCancel,
  isLoading = false
}: DeleteConfirmModalProps) {
  
  // Disable body & html scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-navy/50 backdrop-blur-sm animate-fade-in p-4 overflow-hidden">
      <div className="bg-white border border-border rounded-2xl w-full max-w-sm p-6 shadow-2xl flex flex-col gap-4 animate-scale-up text-left max-h-[90vh] overflow-y-auto relative z-10">
        
        {/* Warning Icon Banner */}
        <div className="flex gap-4 items-start">
          <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-500 shrink-0">
            <Trash2 className="w-6 h-6" />
          </div>
          <div className="flex-grow">
            <h3 className="font-serif text-base font-bold text-navy">{title}</h3>
            <p className="text-xs text-navy-light/80 font-normal leading-relaxed mt-1">{message}</p>
          </div>
        </div>

        {/* Optional Error Message Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex gap-3 items-start animate-fade-in">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <p className="text-[11px] text-red-700 font-medium leading-relaxed">
              {error}
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 justify-end mt-2 pt-2 border-t border-border/40">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 border border-border text-navy-light text-xs font-bold rounded-xl hover:bg-background transition-colors cursor-pointer disabled:opacity-50"
          >
            {error ? "Close" : "Cancel"}
          </button>
          {!error && (
            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-70 flex items-center gap-1.5"
            >
              {isLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Deleting...
                </>
              ) : (
                "Confirm Delete"
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

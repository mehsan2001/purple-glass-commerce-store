
import React from 'react';
import { toast } from "@/components/ui/toast";

export { toast };

export const useToast = () => {
  // Return the toast state
  return {
    toast,
    toasts: [] // This is just a placeholder, actual implementation depends on your toast component
  };
};

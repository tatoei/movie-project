"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CheckoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckoutDialog = ({ isOpen, onClose }: CheckoutDialogProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(60);

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
        </DialogHeader>
        <p className="text-gray-700">
          Please transfer the payment to account number{" "}
          <span className="font-bold">123-456-7890</span> within:
        </p>
        <p className="text-2xl font-bold text-center my-4">
          {timeLeft} seconds
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;

"use client";

import { cn } from "@/shared/lib/utils";
import { DialogContent, Dialog, DialogTrigger } from "@/shared/ui/dialog";
import { DialogHeader } from "@/shared/ui/dialog";
import { DialogTitle } from "@/shared/ui/dialog";
import { DialogDescription } from "@/shared/ui/dialog";
import { DialogFooter } from "@/shared/ui/dialog";
import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";
import { createContext, use } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

type ModalData<T extends FieldValues> = {
  onSubmit: (data: T) => void;
  form: UseFormReturn<T>;
  columnId: string;
};

type ModalContextType<T extends FieldValues> = {
  id: string;
  open?: boolean;
  data?: ModalData<T>;
  onOpenChange?: (open: boolean) => void;
};

const ModalContext = createContext<ModalContextType<FieldValues>>({
  id: "",
  open: false,
  onOpenChange: () => {},
  data: undefined,
});

export function Modal<T extends FieldValues>({
  children,
  data,
}: {
  children: React.ReactNode;
  data?: ModalData<T>;
}) {
  return (
    <ModalContext.Provider
      value={{ id: "", data } as ModalContextType<FieldValues>}
    >
      <Dialog>{children}</Dialog>
    </ModalContext.Provider>
  );
}

Modal.Content = function ModalContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { data } = use(ModalContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data?.form && data?.onSubmit) {
      data.form.handleSubmit(data.onSubmit)(e);
    }
  };

  return (
    <DialogContent className={cn("sm:max-w-[425px]", className)}>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">{children}</div>
      </form>
    </DialogContent>
  );
};

Modal.Trigger = function ModalTrigger({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DialogTrigger>{children}</DialogTrigger>;
};

Modal.Header = function ModalHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <DialogHeader>
      <DialogTitle>{title}</DialogTitle>
      <DialogDescription>{description}</DialogDescription>
    </DialogHeader>
  );
};

Modal.Input = function ModalInput({
  label,
  name,
  className,
  ...restInputProps
}: {
  label: string;
  name: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const { id, data } = use(ModalContext);

  return (
    <div className={cn("grid gap-3", className)}>
      <Label htmlFor={`${id}-${name}`}>{label}</Label>
      <Input
        id={`${id}-${name}`}
        {...data?.form?.register(name)}
        {...restInputProps}
      />
    </div>
  );
};

Modal.Footer = function ModalFooter({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DialogFooter>{children}</DialogFooter>;
};

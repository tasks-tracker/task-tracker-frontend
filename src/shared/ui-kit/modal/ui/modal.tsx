"use client";

import { cn } from "@/shared/lib/utils";
import { DialogContent, Dialog, DialogTrigger } from "@/shared/ui/dialog";
import { DialogHeader } from "@/shared/ui/dialog";
import { DialogTitle } from "@/shared/ui/dialog";
import { DialogDescription } from "@/shared/ui/dialog";
import { DialogFooter } from "@/shared/ui/dialog";
import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";
import { createContext, use, useId } from "react";

const ModalContext = createContext<{
  id: string;
}>({
  id: "",
});

export function Modal({ children }: { children: React.ReactNode }) {
  const id = useId();
  return (
    <ModalContext.Provider value={{ id }}>
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
  return (
    <form>
      <DialogContent className={cn("sm:max-w-[425px]", className)}>
        <div className="grid gap-4">{children}</div>
      </DialogContent>
    </form>
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
  value,
  className,
  ...restInputProps
}: {
  label: string;
  name: string;
  value: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const { id } = use(ModalContext);
  return (
    <div className={cn("grid gap-3", className)}>
      <Label htmlFor={`${id}-${name}`}>{label}</Label>
      <Input
        id={`${id}-${name}`}
        name={name}
        defaultValue={value}
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

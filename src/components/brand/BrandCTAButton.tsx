"use client";

import { Button, type ButtonProps } from "@/components/ui/Button";
import { useBrandModal } from "./ModalProvider";

type Props = Omit<ButtonProps, "href" | "onClick"> & {
  children?: React.ReactNode;
};

/** A Button that opens the global "Submit Your Brand" modal. */
export function BrandCTAButton({ children, ...props }: Props) {
  const { open } = useBrandModal();
  return (
    <Button {...(props as ButtonProps)} onClick={open}>
      {children ?? "Submit Your Brand"}
    </Button>
  );
}

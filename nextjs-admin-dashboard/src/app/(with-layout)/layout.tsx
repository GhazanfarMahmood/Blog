import ProtectedLayout from "@/components/Layouts/ProtectedLayout";
import { type PropsWithChildren } from "react";

export default function WithLayout({ children }: PropsWithChildren) {
  return <ProtectedLayout>{children}</ProtectedLayout>;
}
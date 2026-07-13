import Link from "next/link";
import { Suspense } from "react";
import SigninWithPassword from "../SigninWithPassword";

export default function Signin() {
  return (
    <Suspense fallback={<div>Loading...</div>}>

      <div>
        <SigninWithPassword />
      </div>
      
    </Suspense>
  );
}

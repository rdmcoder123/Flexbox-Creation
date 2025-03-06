"use client";

import { useEffect, useRef } from "react";

export function useInsideContainerClick(handler?: () => void) {
   const ref = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      if (!ref.current) return;

      const currentRef = ref.current.children[0] as HTMLElement;

      function handleClick(e: Event) {
         if (currentRef && currentRef === e.target) {
            handler?.();
         }

         currentRef.childNodes.forEach((child) => {
            if (child === e.target) {
               handler?.();
            }
         });
      }

      currentRef.addEventListener("click", handleClick);

      return () => currentRef.removeEventListener("click", handleClick);
   }, [ref, handler]);

   return ref;
}

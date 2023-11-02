/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useCallback,
  useEffect,
} from 'react';

export  const useOnClickOutside  = (active:boolean, ref: any, callback: any)  => {

 const   handleClickOutside = useCallback((event:any) => {
  if (ref.current && !ref.current.contains(event.target) && active) {
        callback();
  }
}, [ref, callback, active]);

   useEffect(() => {
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("wheel", handleClickOutside);
      return () => {
         // Unbind the event listener on clean up
         document.removeEventListener("mousedown", handleClickOutside);
         document.removeEventListener("wheel", handleClickOutside);
      };
   }, [ref]);
}

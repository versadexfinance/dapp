import { useEffect, useRef } from "react";

const useOutsideClick = (callback) => {
    const ref = useRef<any>();
  
    useEffect(() => {
      const handleClick = (event) => {
        callback();
      };
  
      document.addEventListener('click', handleClick);
  
      return () => {
        document.removeEventListener('click', handleClick);
      };
    }, []);
  
    return ref;
  };

  export default useOutsideClick;
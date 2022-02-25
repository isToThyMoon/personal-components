import { useEffect, useState } from "react";

export const useDebounce = <T>(value: T, delay:number) => {
    const [debouncedValue, setdebouncedValue] = useState(value)
    console.log('*********debouncedValue', debouncedValue)
    useEffect(()=>{
        const timeSet = setTimeout(() => {
            console.log('*********setdebouncedValue',)
            setdebouncedValue(value)
        }, delay);
        return () => { clearTimeout(timeSet)}
    },[value, delay])
    return debouncedValue;
}

import { useState } from "react";



const useInput = (validate) => {


    const [input,setInput] = useState('')
    const [isTouched,setIsTouched] = useState(false);

    const isValid = validate(input);
    const hasError = !isValid && isTouched;


    const isTouchedHandler = () => {
        setIsTouched(true);
    }

    const inputHandler = (e) => {
        setInput(e.target.value);

    }


    return {value: input,hasError,inputHandler,isTouchedHandler,isValid}
}

export default useInput;
import { useState } from "react"

export const useValue = (init) => {
    const [value, setValue] = useState(init);

    const handleChange = event => {
        const target = event.target;
        const type = target.type;
        switch(type){
            case "number":
                setValue({...value, [target.name]: target.value ? +target.value:""});
                break;
            case "file":
                setValue({...value, [target.name]:target.files[0]});
                break;
            default: //text, select, password...
                setValue({...value, [target.name]:target.value});
        }
    }
    
    const reset = (initValue="") => {
        setValue(initValue);
    }
    return [value, handleChange, reset];
}
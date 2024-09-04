import { useState } from "react";


export const useForm = ( initialForm = {} ) => {

    const [ formState, setFormState ] = useState( initialForm );

    const onInputChange = ({target}) => {
      const { name, value } = target;
      setFormState({
        // Mantenemos el estado anterior
        ...formState,
        [ name ]: value
      });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm
    }
  
}

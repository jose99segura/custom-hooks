import { useEffect, useState } from "react";


const localChache = {};


export const useFetch = ( url ) => {

    const [state, setState] = useState({
        data: null,
        isLoading: true,
        hasError: false,
        error: null
    });

    useEffect(() => {
        getFetch();
    }, [url]);

    const setLoadingState = () => {
        setState({
            data: null,
            isLoading: true,
            hasError: false,
            error: null
        });
    }

    const getFetch = async() => {

        // Comprobar si esta en el cache
        if( localChache[url] ) {
            console.log('Datos desde el cache');
            setState({
                data: localChache[url],
                isLoading: false,
                hasError: false,
                error: null
            });
            return;
        }

        setLoadingState();
        const resp = await fetch(url);

        // Sleep 2s
        await new Promise(resolve => setTimeout(resolve, 2000));

        if( !resp.ok ) {
            setState({
                data: null,
                isLoading: false,
                hasError: true,
                error: resp.statusText
            });
            return;
        }

        const data = await resp.json();

        setState({
            data,
            isLoading: false,
            hasError: false,
            error: null
        })

        // Manejo del Cach
        localChache[url] = data;

    }
    
    return {
        data: state.data,
        isLoading: state.isLoading,
        hasError: state.hasError,
    }

}

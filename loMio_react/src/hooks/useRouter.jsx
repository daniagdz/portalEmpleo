import { useEffect, useState } from 'react'

/*
ambia la URL en la barra de direcciones del navegador de forma 
silenciosa y emite un evento global (popstate) para avisar a toda la aplicación.
*/
export function useRouter() {
    const [ currentPath, setCurrentPath] = useState(window.location.pathname)

    useEffect(() => {
        const handleLocationChange = () => {
            setCurrentPath(window.location.pathname)
        }
        window.addEventListener('popstate', handleLocationChange)

        return () => {
            window.removeEventListener('popstate', handleLocationChange)
        }
    }, [])

    function navigateTo(path){
        // estado/datos, titulo, url a reflejar -> actualizamos barra navegacion web
        window.history.pushState({}, '', path)
        
        window.dispatchEvent(new PopStateEvent('popstate'))
    }


    return {
        currentPath,
        navigateTo

    }

}

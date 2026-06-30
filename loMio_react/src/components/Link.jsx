import { useRouter } from "../hooks/useRouter";

export function Link({href, children, ...restOfProps}){

    const {navigateTo} = useRouter()

    const handleClick = (ev) =>{
        ev.preventDefault();

        // estado/datos, titulo, url a reflejar
        //window.history.pushState({}, '', href)

        //const navigationEvent = new PopStateEvent('popstate')
        //enviamos un eveneto que indica que ocurre algo en el historial
        //window.dispatchEvent(navigationEvent)

        navigateTo(href)

    }

    return (
        <a href={href} {...restOfProps} onClick={handleClick}>
            {children}
        </a>
    )
}

/*
el user clica en un Link, 
se ejecuta el component, 
con el pushstate se cambia la url y se crea el evento popstate. 
Entonces, desde app, como se habia ejecutado el popstate, 
el useEffect lo detecta y ejecuta el handleLocationChange para movernos 
de pagina

*/
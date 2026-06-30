import { useRouter } from "../hooks/useRouter"

/*
Cona la sintaxis 'component: Component' hacemos rename del parametro a un
    para usarlo como component y que aparezca nuestra página
*/
export function Route({path, component: Component }){
        
    const {currentPath} = useRouter()
        
    if(currentPath !== path){
        return null
    }

    return <Component />
}
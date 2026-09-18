import { useRouter } from "../hooks/useRouter"

/*
Cona la sintaxis 'component: Component' hacemos rename del parametro a un
    para usarlo como component y que aparezca nuestra página
*/

/*
Escucha ese evento global, revisa si su path coincide con la nueva URL y, 
si es así, renderiza su componente (como Contact o SearchPage)
*/
export function Route({path, element }){
        
    const {currentPath} = useRouter()
        
    if(currentPath !== path){
        return null
    }

    return element
}
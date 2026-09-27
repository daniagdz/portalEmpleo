
import { useNavigate, useLocation } from 'react-router'

/*
Con currentPath obtenemos de la url de la web el valor -> '/search'

*/
export function useRouter() {

    const navigate = useNavigate()
    const location = useLocation()
    const currentPath = location.pathname

    function navigateTo(path){
        navigate(path)
    }

    return {
        currentPath,
        navigateTo
    }

}

import { Link as NavLink } from 'react-router'

export function Link ({ href, children, ...restOfProps }) {

    //ABSTRACTION PATTERN

    /*
    Si cambiamos react-router a futuro por otra dependencia podremos cambiar
        únicamente el componente (Link) en un lugar (aqui) y que se actualice en todos
        los sitios donde se usa
    */
   return (
    <NavLink to={href} {...restOfProps}>
      {children}
    </NavLink>
  )
}
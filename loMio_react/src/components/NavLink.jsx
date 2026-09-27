import { NavLink as RRNavLink} from "react-router";

export function NavLink({ to, children, ...restOfProps }){
    return(
        <RRNavLink
            to={to}
            {...restOfProps}
        >
            {children}
        </RRNavLink>
    )
}
import Link from 'next/link';
import './nav.css'

export const Nav = () => {
    return (
        <nav className="menu navbar-expand-md">
            <ul className="items flex-row flex-column flex-md-row">
                <Link className='links'
                    href={{ pathname: '/home', }}
                >INICIO
                </Link>

                <Link className='links'
                    href={
                        {
                            pathname: '/cardServicios',
                        }
                    }
                > SERVICIOS
                </Link>

                <Link className='links'
                    href='/home#linkcontacto'
                >CONTACTO
                </Link>

                <Link className='links cuenta'
                    href={
                        {
                            pathname: '/login',
                        }
                    }
                > CUENTA
                </Link>
            </ul>
        </nav>

    );
}
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'
const NotFoundPage = () => {
    return (
        <>
            <Layout mainClassName="page-404">
                <div className="page-404-content">
                    <span className="page-404-header">404</span>
                    <span className="page-404-header-2">
                        Strona, której szukasz nie została znaleziona
                    </span>
                    <span className="page-404-header-3">Możliwe przyczyny</span>
                    <ul className="page-404-list">
                        <li className="list-item">
                            Strona nie istnieje lub została usunięta,
                        </li>
                        <li className="list-item">
                            Strona zmieniła swoje położenie,
                        </li>
                        <li className="list-item">
                            Strona jest w trakcie tworzenia lub trwają prace
                            serwisowe.
                        </li>
                    </ul>
                    <Link href="/">
                        <a className="page-404-back-to-home">
                            Przejdź do strony głównej
                        </a>
                    </Link>
                </div>
            </Layout>
        </>
    )
}

export default NotFoundPage

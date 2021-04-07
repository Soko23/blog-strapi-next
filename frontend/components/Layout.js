import Header from './Header'
import Footer from './Footer'
import CookiesModal from './CookiesModal'

const Layout = ({ mainClassName, children }) => {
    // console.log(props)
    return (
        <>
            <Header />
            <main className={mainClassName}>{children}</main>
            <Footer />
            <CookiesModal />
        </>
    )
}

export default Layout

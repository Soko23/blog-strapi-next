import Link from 'next/link'
import { useState, useEffect } from 'react'

const Footer = () => {
    const [footerData, setFooterData] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/footer`)
            const data = await res.json()
            setFooterData(data)
        }

        fetchData()
    }, [])

    if (footerData) {
        return (
            <>
                <footer className="footer">
                    <div className="footer-row footer-content">
                        <div className="footer-content-inner-1">
                            <span className="footer-copyright">{footerData.copyright}</span>
                            <a href={footerData.author.url} className="footer-executive" target="_blank">
                                {footerData.author.text}
                                <img
                                    src={`${process.env.NEXT_PUBLIC_API_URL}${footerData.author.image.url}`}
                                    alt={footerData.author.image.alternativeText}
                                    className="footer-kamikaze-logo"
                                />
                            </a>
                        </div>
                        <div className="footer-content-inner-2">
                            <a href={footerData.companyLogo.url} className="company-logo" target="_blank">
                                <img
                                    src={`${process.env.NEXT_PUBLIC_API_URL}${footerData.companyLogo.image.url}`}
                                    alt={footerData.companyLogo.image.alternativeText}
                                />
                            </a>
                        </div>
                        <div className="footer-content-inner-3">
                            <nav className="footer-nav">
                                <ul className="footer-menu-list">
                                    {footerData.footerMenu.footerMenuItem.map((el) => (
                                        <li key={el.id} className="menu-item">
                                            <Link href={el.slug}>{el.displayName}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                        <div className="footer-content-inner-4">
                            <a href="" className="footer-executive-mobile">
                                <img src="" alt="" className="footer-kamikaze-logo-mobile" />
                            </a>
                        </div>
                    </div>
                </footer>
            </>
        )
    } else {
        return null
    }
}

export default Footer

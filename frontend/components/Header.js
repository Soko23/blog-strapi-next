import Link from 'next/link'
import { useState, useEffect } from 'react'

const Header = () => {
    const [menuItems, setMenuItems] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu`)
            const data = await res.json()
            setMenuItems(data)
        }

        fetchData()
    }, [])

    const smoothScroll = (e) => {
        let href = e.target.getAttribute('href')
        if (href.includes('/#') && window.location.pathname === '/') {
            e.preventDefault()
            const element = document.querySelector(e.target.getAttribute('href').replace('/', ''))
            const y = element.getBoundingClientRect().top + window.pageYOffset
            window.scrollTo({
                top: y - 80,
                behavior: 'smooth',
            })
        }
    }

    const scrollToAnchor = () => {
        if (window.location.hash !== '') {
            const element = document.querySelector(window.location.hash)
            const y = element.getBoundingClientRect().top + window.pageYOffset
            window.scrollTo({
                top: y,
                behavior: 'smooth',
            })
        }
    }

    if (typeof window !== 'undefined') {
        window.addEventListener('load', () => {
            scrollToAnchor()
        })
    }

    const toggleMenu = () => {
        document.querySelector('#hamburger').classList.toggle('opened')
        document.querySelector('#nav').classList.toggle('opened')
    }

    return (
        <>
            <header className="header">
                <Link href="/">
                    <a className="header-logo">
                        <img src="/images/logo.png" alt="Page logo" />
                    </a>
                </Link>
                <nav id="nav" className="nav">
                    <ul className="menu-list">
                        {menuItems.item &&
                            menuItems.item.map(({ id, class: className, slug, displayName }) => {
                                return (
                                    <li
                                        className={`menu-item ${className !== null ? className : ''}`}
                                        key={id}
                                        onClick={toggleMenu}
                                    >
                                        <Link href={slug}>
                                            <a onClick={smoothScroll}>{displayName}</a>
                                        </Link>
                                    </li>
                                )
                            })}
                    </ul>
                </nav>
                <button id="hamburger" className="hamburger" onClick={toggleMenu}>
                    <span className="hamburger-item"></span>
                    <span className="hamburger-item"></span>
                    <span className="hamburger-item"></span>
                </button>
            </header>
        </>
    )
}

export default Header

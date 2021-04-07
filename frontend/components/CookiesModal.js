import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Cookies from 'js-cookie'

const CookiesModal = () => {
    const initialCookiesModalState = Cookies.get('cookiesConsent')
    const [cookiesConsent, setCookiesConsent] = useState(initialCookiesModalState)
    const [cookiesData, setCookiesData] = useState([])

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/cookies`)
            .then((response) => response.json())
            .then((data) => {
                setCookiesData(data)
            })
    }, [])

    const { cookiesText } = cookiesData

    useEffect(() => {
        toggleCookiesModal()
    })

    const toggleCookiesModal = () => {
        const cookiesModal = document.querySelector('#cookies-modal')
        if (cookiesConsent !== 'true') {
            cookiesModal.classList.add('show')
        } else {
            cookiesModal.classList.remove('show')
        }
    }

    const acceptCookies = () => {
        setCookiesConsent('true')
        Cookies.set('cookiesConsent', 'true')
    }

    return (
        <>
            <div id="cookies-modal" className="cookies-modal-container">
                <div className="cookies-modal">
                    <div className="cookies-modal-info" dangerouslySetInnerHTML={{ __html: cookiesText }}></div>
                    <div className="cookies-modal-buttons">
                        <button id="accept-cookies" className="cookies-modal-accept-cookies" onClick={acceptCookies}>
                            Akceptuję
                        </button>
                        <Link href="/polityka-prywatnosci" className="cookies-modal-more-info">
                            <a className="cookies-modal-more-info">Więcej informacji</a>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CookiesModal

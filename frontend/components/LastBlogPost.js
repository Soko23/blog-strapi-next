import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { truncate } from '../helpers/helpers'

const LastBlogPost = () => {
    const [lastBlogPost, setLastBlogPost] = useState([])

    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog-posts?_sort=published_at:desc&_limit=1`)
            const json = await response.json()
            setLastBlogPost(json)
        }
        getData()
    }, [])

    const { postThumb, title, excerpt, slug } = lastBlogPost[0] || {}

    return (
        <>
            {lastBlogPost.length > 0 && (
                <div className="home-page-last-post-wrapper">
                    <div className="home-page-last-post-inner">
                        <img
                            src={`${process.env.NEXT_PUBLIC_API_URL}${postThumb.url}`}
                            alt={`${postThumb.alternativeText}`}
                            className="home-page-last-post-image"
                        />
                        <div className="home-page-last-post-info-wrapper">
                            <Link href={`blog/${slug}`}>
                                <a className="home-page-last-post-title">
                                    <h2>{title}</h2>
                                </a>
                            </Link>
                            <h3
                                className="home-page-last-post-excerpt"
                                dangerouslySetInnerHTML={{
                                    __html: truncate(excerpt, 20),
                                }}
                            ></h3>
                            <Link href={`blog/${slug}`}>
                                <a className="home-page-last-post-button">Czytaj więcej</a>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default LastBlogPost

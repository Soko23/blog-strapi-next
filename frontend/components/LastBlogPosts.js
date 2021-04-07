import React, { useState, useEffect } from 'react'
import { truncate, formatDate } from '../helpers/helpers'
import Link from 'next/link'

const LastBlogPosts = (props) => {
    const [lastBlogPosts, setLastBlogPosts] = useState([])
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog-posts?_sort=published_at:desc&id_ne=${props.currentPostId}&_limit=3`)
            .then((response) => response.json())
            .then((data) => {
                setLastBlogPosts(data)
            })
    }, [])

    return (
        <ul className="last-blog-posts-wrapper">
            {lastBlogPosts.length > 0 &&
                lastBlogPosts.map((post) => {
                    return (
                        <li key={post.id}>
                            <img
                                className="last-post-image"
                                src={`${process.env.NEXT_PUBLIC_API_URL}${post.postThumb.url}`}
                                alt={post.postThumb.alternativeText}
                            />
                            <span className="last-post-date">{formatDate(post.published_at)}</span>
                            <Link href={`${post.slug}`}>
                                <a className="last-post-title">
                                    <h3>{post.title}</h3>
                                </a>
                            </Link>
                            <h4
                                className="last-post-excerpt"
                                dangerouslySetInnerHTML={{
                                    __html: truncate(post.excerpt, 10),
                                }}
                            ></h4>
                            <Link href={`${post.slug}`}>
                                <a className="last-post-button">czytaj więcej</a>
                            </Link>
                        </li>
                    )
                })}
        </ul>
    )
}

export default LastBlogPosts

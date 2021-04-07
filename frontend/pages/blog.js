import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'
import { truncate, formatDate } from '../helpers/helpers'

const BlogPage = ({ data }) => {
    return (
        <>
            <Head>
                <title>
                    Blog page
                    {process.env.defaults[0].titleConstant}
                </title>
                <meta name="description" content="Desc" />
                <meta
                    property="og:image"
                    content={
                        typeof seo !== 'undefined'
                            ? seo.openGraph.ogImage
                                ? `${process.env.NEXT_PUBLIC_API_URL}${seo.openGraph.ogImage.url}`
                                : process.env.defaults[0].ogImage
                            : process.env.defaults[0].ogImage
                    }
                />
            </Head>
            <Layout mainClassName="blog-page">
                <h1 className="blog-page-header">Lorem ipsum</h1>
                <section className="posts-list">
                    <div className="latest-post">
                        <img
                            src={`${process.env.NEXT_PUBLIC_API_URL}${data[0].postThumb.url}`}
                            alt={`${process.env.NEXT_PUBLIC_API_URL}${data[0].postThumb.alternativeText}`}
                            className="latest-post-image"
                        />
                        <div className="latest-post-info-wrapper">
                            <span className="latest-post-date">{formatDate(data[0].published_at)}</span>
                            <Link href={`blog/${data[0].slug}`}>
                                <a className="latest-post-title">
                                    <h2>{data[0].title}</h2>
                                </a>
                            </Link>
                            <h3
                                className="latest-post-excerpt"
                                dangerouslySetInnerHTML={{
                                    __html: data[0].excerpt,
                                }}
                            ></h3>
                            <Link href={`blog/${data[0].slug}`}>
                                <a className="latest-post-button">Czytaj więcej</a>
                            </Link>
                        </div>
                    </div>

                    <h3 className="posts-list-last-posts">ostatnie wpisy</h3>
                    <div className="posts-container">
                        {data.slice(1).map((post) => {
                            return (
                                <div className="post-wrapper" key={post.id}>
                                    <img
                                        className="blog-post-image"
                                        src={`${process.env.NEXT_PUBLIC_API_URL}${post.postThumb.url}`}
                                        alt={post.postThumb.alternativeText}
                                    />
                                    <span className="blog-post-date">{formatDate(post.published_at)}</span>
                                    <Link href={`blog/${post.slug}`}>
                                        <a className="blog-post-title">
                                            <h3>{post.title}</h3>
                                        </a>
                                    </Link>
                                    <h4
                                        className="blog-post-excerpt"
                                        dangerouslySetInnerHTML={{
                                            __html: truncate(post.excerpt, 10),
                                        }}
                                    ></h4>
                                    <Link href={`blog/${post.slug}`}>
                                        <a className="blog-post-button">czytaj więcej</a>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </section>
            </Layout>
        </>
    )
}

export default BlogPage

export const getStaticProps = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog-posts?_sort=published_at:desc`)
    const data = await res.json()

    return {
        props: {
            data,
        },
    }
}

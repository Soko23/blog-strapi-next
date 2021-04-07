import Head from 'next/head'
import Layout from '../../components/Layout'
import { formatDate } from '../../helpers/helpers'
import LastBlogPosts from '../../components/LastBlogPosts'

const BlogPost = ({ data }) => {
    const { id, bannerImage, title, seo, excerpt, content, postThumb, published_at: publishedAt } = data[0]
    return (
        <>
            <Head>
                <title>
                    {seo.title ? `${seo.title}${process.env.defaults[0].titleConstant}` : process.env.defaults[0].title}
                </title>
                <meta
                    name="description"
                    content={seo.description ? seo.description : process.env.defaults[0].description}
                />
                <meta
                    property="og:image"
                    content={
                        seo.openGraph.ogImage
                            ? `${process.env.NEXT_PUBLIC_API_URL}${seo.openGraph.ogImage.url}`
                            : process.env.defaults[0].ogImage
                    }
                />
            </Head>
            <Layout mainClassName="blog-post">
                <div className="post-banner">
                    <img
                        className="post-banner-desktop"
                        src={`${process.env.NEXT_PUBLIC_API_URL}${bannerImage.url}`}
                        alt=""
                    />
                    <img
                        className="post-banner-mobile"
                        src={`${process.env.NEXT_PUBLIC_API_URL}${postThumb.url}`}
                        alt=""
                    />
                </div>
                <section className="post-container">
                    <div className="post-container-inner">
                        <span className="post-date">{formatDate(publishedAt)}</span>
                        <h1 className="post-title">{title}</h1>
                        <span
                            className="post-excerpt"
                            dangerouslySetInnerHTML={{
                                __html: excerpt,
                            }}
                        ></span>
                        <div
                            className="post-content"
                            dangerouslySetInnerHTML={{
                                __html: content,
                            }}
                        ></div>
                    </div>
                </section>
                <section className="last-blog-posts">
                    <h2 className="last-blog-posts-header">Zobacz take:</h2>
                    <LastBlogPosts currentPostId={id} />
                </section>
            </Layout>
        </>
    )
}

export const getStaticProps = async (context) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog-posts?slug=${context.params.blogPost}`)
    const data = await res.json()

    return {
        props: {
            data,
        },
    }
}

export const getStaticPaths = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog-posts`)
    const blogPosts = await res.json()

    const slugs = blogPosts.map((blogPost) => blogPost.slug)
    const paths = slugs.map((slug) => ({
        params: { blogPost: slug.toString() },
    }))

    return {
        paths,
        fallback: false,
    }
}

export default BlogPost

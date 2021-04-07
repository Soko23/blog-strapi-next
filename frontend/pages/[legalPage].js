import Head from 'next/head'
import Layout from '../components/Layout'

const LegalPage = ({ data }) => {
    const { legalPageContent, title, seo } = data[0]
    return (
        <>
            <Head>
                <title>
                    {seo.title
                        ? `${seo.title}${process.env.defaults[0].titleConstant}`
                        : process.env.defaults[0].title}
                </title>
                <meta
                    name="description"
                    content={
                        seo.description
                            ? seo.description
                            : process.env.defaults[0].description
                    }
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
            <Layout mainClassName="legal-page">
                <div className="legal-page-content">
                    <h1 className="legal-page-header">{title}</h1>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: legalPageContent,
                        }}
                    ></div>
                </div>
            </Layout>
        </>
    )
}

export const getStaticProps = async (context) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/legal-pages?slug=${context.params.legalPage}`
    )
    const data = await res.json()

    return {
        props: {
            data,
        },
    }
}

export const getStaticPaths = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/legal-pages`)
    const legalPages = await res.json()

    const slugs = legalPages.map((legalPage) => legalPage.slug)
    const paths = slugs.map((slug) => ({
        params: { legalPage: slug.toString() },
    }))

    return {
        paths,
        fallback: false,
    }
}

export default LegalPage

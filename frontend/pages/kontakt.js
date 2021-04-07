import Head from 'next/head'
import Layout from '../components/Layout'

const Contact = ({ data }) => {
    const { title, address, companyName, email, info, phone, seo } = data
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
            <Layout mainClassName="contact-page">
                <div className="contact-page-col-1">
                    <h1 className="contact-page-header">
                        {title}
                        <br />
                        <br />
                        {companyName}
                    </h1>
                    <address className="contact-page-address">
                        <span
                            className="contact-page-street"
                            dangerouslySetInnerHTML={{
                                __html: address,
                            }}
                        ></span>
                        <a href={`tel:${phone}`} className="contact-page-phone">
                            {phone}
                        </a>
                        <a href={`mailto:${email}`} className="contact-page-email">
                            {email}
                        </a>
                    </address>
                </div>
                <div className="contact-page-col-2" dangerouslySetInnerHTML={{ __html: info }}></div>
            </Layout>
        </>
    )
}

export default Contact

export const getStaticProps = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`)
    const data = await res.json()

    return {
        props: {
            data,
        },
    }
}

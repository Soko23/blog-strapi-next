import Head from 'next/head'
import SwiperCore, { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import LastBlogPost from '../components/LastBlogPost'
import Layout from '../components/Layout'

SwiperCore.use([Navigation])

const Home = ({ data }) => {
    const { header, section1, whereBuySection, whichContainsSection, recipe, infoSection, seo } = data

    return (
        <Layout mainClassName="home-page">
            <Head>
                <title>{seo.title ? seo.title : process.env.defaults[0].title}</title>
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
            <section className="section-intro">
                <div className="section-intro-text-wrapper">
                    <h1
                        className="section-intro-header"
                        dangerouslySetInnerHTML={{
                            __html: header.title,
                        }}
                    ></h1>
                    <img
                        src={`${process.env.NEXT_PUBLIC_API_URL}${header.mobileImage.url}`}
                        alt={header.mobileImage.alt}
                        className="section-intro-image-mobile"
                    />
                    <p className="section-intro-paragraph" dangerouslySetInnerHTML={{ __html: header.title2 }} />
                    <a className="section-intro-button" href="#" target="_blank">
                        kup online
                    </a>
                </div>
                <img
                    className="section-intro-image"
                    src={`${process.env.NEXT_PUBLIC_API_URL}${header.image.url}`}
                    alt={header.image.alt}
                />
            </section>
            <section id="kiedy-stosowac" className="section-when-use">
                <div className="when-use-header-wrapper">
                    <h2 className="when-use-header" dangerouslySetInnerHTML={{ __html: section1.section1Title }} />
                </div>
                <div className="when-use-image">
                    <img
                        src={`${process.env.NEXT_PUBLIC_API_URL}${section1.section1Image.url}`}
                        alt={section1.section1Image.alternativeText}
                        className="when-use-image-inner"
                    />
                    <img
                        src={`${process.env.NEXT_PUBLIC_API_URL}${section1.section1ImageMobile.url}`}
                        alt={section1.section1ImageMobile.alternativeText}
                        className="when-use-image-inner-mobile"
                    />
                </div>
                <ul className="when-use-list">
                    {section1.section1List.map((item) => (
                        <li key={item.id} className="when-use-list-item">
                            <div className="when-use-list-item-inner">
                                <img
                                    className="when-use-list-item-image"
                                    src={`${process.env.NEXT_PUBLIC_API_URL}${item.section1ListItemImage.url}`}
                                    alt=""
                                />
                                <span className="when-use-list-item-text">{item.section1ListItemText}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
            <section id="gdzie-kupic" className="section-where-buy">
                <div className="where-buy">
                    <h2 className="where-buy-header">{whereBuySection.whereBuyTitle}</h2>
                    <div className="where-buy-buttons">
                        <a href={whereBuySection.whereBuyOnline} target="_blank" className="where-buy-button-online">
                            Kup online
                        </a>
                        <a href={whereBuySection.whereBuyLocal} target="_blank" className="where-buy-button-local">
                            Kup lokalnie
                        </a>
                    </div>
                </div>
            </section>
            <section id="co-zawiera" className="section-which-contains">
                <h2 className="which-contains-header">{whichContainsSection.title}</h2>
                <h3 className="which-contains-header-2">{whichContainsSection.subtitle}</h3>
                <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}${whichContainsSection.image.url}`}
                    alt={whichContainsSection.image.alternativeText}
                    className="which-contains-infographic"
                />

                <Swiper
                    id="slider-container"
                    className="which-contains-slider-container swiper-container"
                    slidesPerView={1}
                    navigation={{ clickable: true }}
                >
                    {whichContainsSection.whichContainsSlider.map((slide) => {
                        return (
                            <SwiperSlide key={slide.id}>
                                <figure className="slider-image">
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_API_URL}${slide.slideImage.url}`}
                                        alt={slide.slideImage.alternativeText}
                                    />
                                    <figcaption className="slider-title">{slide.slideTitle}</figcaption>
                                </figure>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>

                <h4 className="which-contains-header-3">{whichContainsSection.paragraph}</h4>
                <a
                    href={`${process.env.NEXT_PUBLIC_API_URL}${whichContainsSection.sectionWhichContainsLeaflet.file.url}`}
                    download
                    target="_blank"
                    className="which-contains-download-leaflet"
                >
                    {whichContainsSection.sectionWhichContainsLeaflet.content}
                </a>
            </section>
            <section className="home-page-last-post">
                <h2 className="home-page-last-post-header">Lorem ipsum dolor</h2>
                <LastBlogPost />
            </section>
            <section id="historia" className="section-recipe">
                <div className="recipe-content">
                    <h2 className="recipe-header">{recipe.recipeTitle}</h2>
                    <div className="recipe-paragraph" dangerouslySetInnerHTML={{ __html: recipe.recipeContent }} />
                </div>
                <div id="info" className="recipe-info">
                    <div className="recipe-info-paragraph" dangerouslySetInnerHTML={{ __html: recipe.recipeInfo }} />
                </div>
            </section>
            <section className="section-info">
                <div className="section-info-paragraph" dangerouslySetInnerHTML={{ __html: infoSection.info }} />
            </section>
        </Layout>
    )
}

export default Home

export const getStaticProps = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home-page`)
    const data = await res.json()

    return {
        props: {
            data,
        },
    }
}

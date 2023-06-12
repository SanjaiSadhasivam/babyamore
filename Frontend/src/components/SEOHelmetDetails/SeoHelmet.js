import React from 'react'
import { Helmet } from "react-helmet";

function SeoHelmet(meta) {
    // console.log("metaaa", meta.meta)
    return (
        <div>
            <Helmet >
                <meta charSet="utf-8" />
                <title>{meta?.meta?.Title}</title>
                {/* <link rel="canonical" href="http://babyamore.in" /> */}
                {/* <meta name="title" content={meta.meta.Title} /> */}
                <meta name="description" content={meta?.meta?.Description} />
                <meta name="robots" content="index" />
                <meta property="og:title" content={meta?.meta?.Description} />
                <link rel="canonical" href={window.location.href} />
                <meta name="keywords" content={ meta?.meta?.Title } />
                 {/* <meta property="og:image" content={`${Product_images}/${Product.ProductLogo}`} /> */}

            </Helmet>
        </div>
    )
}

export default SeoHelmet
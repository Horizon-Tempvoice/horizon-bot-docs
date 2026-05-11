'use client'
import Script from 'next/script'

export function Analytics() {
    return (
        <>
            <Script src="https://analytics.diamondforge.me/script.js" data-website-id="6e92de1c-42cb-4a3d-8698-3e907c128215" strategy="afterInteractive" />
            <Script src="https://analytics.diamondforge.me/recorder.js" data-website-id="6e92de1c-42cb-4a3d-8698-3e907c128215" data-sample-rate="0.6" data-mask-level="moderate" data-max-duration="900000" strategy="afterInteractive" />
        </>
    )
}

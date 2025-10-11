export const dynamic = "force-dynamic"
import Navbar from '@/components/Navbar'


export const metadata = {
title: "BHOS Debate Club",
description: "BHOS Debate Club Home Page",
openGraph: {
title: "BHOS Debate Club",
description: "BHOS Debate Club Home Page",
url: 'https://debate.bhos.club',
siteName: 'BHOS Debate Club',
},
twitter: {
card: 'summary_large_image',
title: "BHOS Debate Club",
description: "BHOS Debate Club Home Page",
},
};


export default function Password() {
return (
<>
<Navbar />
<div className="max-w-4xl mx-auto px-4 py-20 text-center">
<h1 className="text-[12px] font-bold text-black dark:text-gray-200 mb-4">
Nə Axtarırsan balaca?
</h1>



<div className="relative" style={{ paddingTop: '56.25%' }}>
<iframe
className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
src={`https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&rel=0&modestbranding=1&controls=1`}
title="Rick Astley - Never Gonna Give You Up (Rickroll)"
frameBorder="0"
allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
allowFullScreen
/>
</div>


</div>
</>
)
}

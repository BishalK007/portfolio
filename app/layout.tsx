

export const metadata: Metadata = {
  title: 'Bishal',
  description: 'Welcome to My Portfolio',
  keywords: 'CV, resume, Bishal, Karmakar, full stack developer, portfolio, download resume',
  openGraph: {
    title: 'Bishal',
    description: 'Bishal Karmakar, a software engineer and full-stack developer specializing in modern web technologies.',
    type: 'website',
    url: '/cv',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bishal',
    description: 'Bishal Karmakar, a software engineer and full-stack developer specializing in modern web technologies.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="notranslate">
      <body className="">
        {children}
      </body>
    </html>
  )
}


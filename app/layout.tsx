
export const metadata = {
  title: 'Bishal ',
  description: 'Welcome to My Portfolio',
}

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


import '@styles/globals.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider' 

export const metadata = {
  title: 'PROMPY',
  description: 'A AI Prompts Collection',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">
          <Nav />
          {children}
        </main>
      </body>
    </html>
  )
}

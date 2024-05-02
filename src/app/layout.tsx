import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavigationBar from '../components/NavigationBar'
import { Suspense } from 'react'
import { AuthModalProvider } from '../contexts/authModal'
import { UserProvider } from '../contexts/userContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Quick Learnings',
  description:
    'An application that allows users to add topics, generate and practice quizes, a perfect way to learn.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className} suppressHydrationWarning={true}>
        <UserProvider>
          <AuthModalProvider>
            <Suspense fallback={<div>Loading...</div>}>
              <NavigationBar />
            </Suspense>
            {children}
          </AuthModalProvider>
        </UserProvider>
      </body>
    </html>
  )
}

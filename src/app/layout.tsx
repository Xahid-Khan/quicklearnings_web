import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavigationBar from '@/src/components/NavigationBar'
import { Suspense } from 'react'
import { AuthModalProvider } from '@/src/contexts/authContext'
import { UserProvider } from '@/src/contexts/userContext'
import { SubjectProvider } from '@/src/contexts/subjectContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Quick Learnings',
  description:
    'An application that allows users to add topics, generate and practice quizzes, a perfect way to learn.'
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
            <SubjectProvider>{children}</SubjectProvider>
          </AuthModalProvider>
        </UserProvider>
      </body>
    </html>
  )
}

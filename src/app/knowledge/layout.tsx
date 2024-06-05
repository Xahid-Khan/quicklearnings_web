import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { KnowledgeProvider } from '@/contexts/knowledgeContext'
import { Suspense } from 'react'
import Loading from '@/components/LoadingScreen'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Quick Learnings: Knowledge',
  description:
    'An application that allows users to add topics, generate and practice quizzes, a perfect way to learn. A best way to memories and practice newly acquired knowledge'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className={inter.className} suppressHydrationWarning={true}>
      <Suspense fallback={<Loading />}>
        <KnowledgeProvider>{children}</KnowledgeProvider>
      </Suspense>
    </main>
  )
}

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { QuizProvider } from '@/contexts/quizContext'
import { TopicProvider } from '@/contexts/topicContext'
import { KnowledgeProvider } from '@/contexts/knowledgeContext'
import { Suspense } from 'react'
import Loading from '@/components/LoadingScreen'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Quick Learnings: Quiz',
  description:
    'An application that allows users to add topics, generate and practice quizzes, a perfect way to learn.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className={inter.className} suppressHydrationWarning={true}>
      <Suspense fallback={<Loading />}>
        <TopicProvider>
          <KnowledgeProvider>
            <QuizProvider>{children}</QuizProvider>
          </KnowledgeProvider>
        </TopicProvider>
      </Suspense>
    </main>
  )
}

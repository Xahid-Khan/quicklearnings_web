import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { TopicProvider } from '@/contexts/topicContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Quick Learnings: Topic',
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
      <TopicProvider>{children}</TopicProvider>
    </main>
  )
}

import type { Metadata } from 'next'
import { QuizAttemptProvider } from '@/contexts/quizAttemptContext'

export const metadata: Metadata = {
  title: 'Quiz is progress',
  description:
    'An application that allows users to add topics, generate and practice quizzes, a perfect way to learn.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <QuizAttemptProvider>{children}</QuizAttemptProvider>
}

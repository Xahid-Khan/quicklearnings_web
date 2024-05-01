import Image from 'next/image'

export default function Loading() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center'>
      <Image
        src={'/loading.gif'}
        alt='Loading Screen'
        width={1080}
        height={1020}
        priority
      />
    </main>
  )
}

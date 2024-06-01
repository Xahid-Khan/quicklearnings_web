import Image from 'next/image'

export default function Loading() {
  return (
    <main className='absolute top-0 left-0 bg-[#191f26] flex min-h-screen w-full flex-col items-center justify-center z-50'>
      <Image
        src={'/loading.gif'}
        alt='Loading Screen'
        width={1080}
        height={1020}
        priority
        style={{ width: '1080px', height: 'auto' }}
      />
    </main>
  )
}

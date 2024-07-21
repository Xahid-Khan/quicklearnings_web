import Image from 'next/image'

export default function Loading() {
  return (
    <main className='absolute top-0 left-0 flex min-h-screen w-full flex-col items-center justify-center z-50' 
    style={{background: `radial-gradient(#003937, white)`}}>
      <Image
        src={'/loading.gif'}
        alt='Loading Screen'
        width={200}
        height={200}
        priority
      />
    </main>
  )
}

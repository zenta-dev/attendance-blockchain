import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const poppins = Poppins({ weight: ["400", "500"], subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'Blockchain Attendance | UAS KDI',
  description: 'Dibuat untuk memenuhi tugas mata kuliah Keamanan Data dan Informasi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Image
          src="/assets/img/login-bg.jpg"
          alt="login"
          className="login__img"
          layout="fill"
        />
        {children}
        <Toaster />
      </body>
    </html>
  )
}

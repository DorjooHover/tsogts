import type { NextPage } from 'next'
import Login from './Login'
import Head from 'next/head'
// import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Монголын цогц сургалтын төв</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="./img/logo/lil_logo.png" />
      </Head>
      <Login />
    </div>
  )
}

export default Home

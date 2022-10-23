import { motion } from 'framer-motion';
import type { NextPage, NextPageContext } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import InfoSection from '../components/info/info-section';
import TrustedBySection from '../components/logos/logos-section';
import MoreInfoSection from '../components/more-info/more-info';
import HamburgerMenu from '../components/navbar/hamburger-menu';
import HomeNavbar from '../components/navbar/home-navbar';
import StatsSection from '../components/stats/stats-section';

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);
  console.log(session);
  return {
    props: { session },
  };
}

const Home: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <main className=''>
      <div className='bg-slate-900 flex flex-col border border-red-600 h-full'>
        <HomeNavbar />
        <section className='px-6 grow flex flex-col gap-10'>
          <p className='text-white text-3xl px-2 text-center font-semibold '>
            Great teamwork starts with a
            <span className=' text-yellow-500'> digital HQ</span>
          </p>
          <motion.button
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className='text-slate-900 text-lg py-4 w-full font-semibold bg-slate-200 rounded '
            onClick={() => router.push('/auth')}
          >
            Sign up today
          </motion.button>
          <div className='border border-red-600 grow h-72'></div>
        </section>
      </div>
      <div className='bg-orange-50 pb-12 lg:pb-20'>
        <TrustedBySection />
        <InfoSection />
      </div>
      <StatsSection />
      <section className='px-4 py-20 bg-slate-900'>
        <p className='text-3xl text-white text-center font-bold mb-10'>
          Welcome to your new digital HQ
        </p>
        <div className='flex flex-col gap-4 xl:flex-row max-w-3xl mx-auto'>
          <button className='bg-slate-50 text-slate-900 py-4  rounded xl:w-1/2 font-semibold  hover:shadow-[inset_0px_0px_0px_3px_rgba(15,23,42,.3)] hover:rounded-none transition-all duration-300'>
            Get Orderly today
          </button>
          <button className='bg-slate-900 py-4 text-white rounded xl:w-1/2 font-semibold border border-white hover:shadow-[inset_0px_0px_0px_1px_rgba(255,255,255,255)] transition-all duration-200 '>
            Get Orderly today
          </button>
        </div>
      </section>
      <div className='max-w-7xl mx-auto'>
        <MoreInfoSection />
        <footer className='px-6 mt-10'>
          <hr />
          <div className='flex flex-col md:flex-row gap-10 py-8'>
            <Link href='#'>
              <a className='font-bold text-sm'>Status</a>
            </Link>
            <Link href='#'>
              <a className='font-bold text-sm'>Privacy</a>
            </Link>
            <Link href='#'>
              <a className='font-bold text-sm'>Terms</a>
            </Link>
            <Link href='#'>
              <a className='font-bold text-sm'>Cookie Preferences</a>
            </Link>
            <Link href='#'>
              <a className='font-bold text-sm'>Contact Us</a>
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
};

export default Home;

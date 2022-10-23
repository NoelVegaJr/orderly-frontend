import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import * as React from 'react';
import HamburgerMenu from './hamburger-menu';

interface IHomeNavbarProps {}

const HomeNavbar: React.FunctionComponent<IHomeNavbarProps> = (props) => {
  const { data: session, status } = useSession();
  return (
    <nav className='text-white  flex items-center justify-between gap-6  px-6 h-24 bg-slate-900'>
      <div className='flex items-center font-bold gap-4 '>
        <p className='mr-6 text-2xl'>Orderly</p>
        <div className='hidden lg:flex gap-4 '>
          <Link href='#'>
            <a className='text-sm text-white  hover:shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255)] transition-all duration-100'>
              Product
            </a>
          </Link>
          <Link href='#'>
            <a className='text-sm text-white hover:shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255)] transition-all duration-100'>
              Solutions
            </a>
          </Link>
          <Link href='#'>
            <a className='text-sm text-white hover:shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255)] transition-all duration-100'>
              Enterprise
            </a>
          </Link>
          <Link href='#'>
            <a className='text-sm text-white hover:shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255)] transition-all duration-100'>
              Resources
            </a>
          </Link>
          <Link href='#'>
            <a className='text-sm text-white hover:shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255)] transition-all duration-100'>
              Pricing
            </a>
          </Link>
        </div>
      </div>
      <HamburgerMenu />
      <div className='hidden text-md lg:flex items-center gap-6 font-semibold'>
        {!session ? (
          <Link href='/auth'>
            <a className='hover:shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255)] transition-all duration-100'>
              Sign In
            </a>
          </Link>
        ) : (
          <button
            onClick={() => signOut()}
            className='hover:shadow-[inset_0px_-1px_0px_0px_rgba(255,255,255)] transition-all duration-100'
          >
            Log out
          </button>
        )}

        <Link href='#'>
          <a className='p-2 border rounded hover:shadow-[inset_0px_0px_0px_1px_rgba(255,255,255,255)] transition-all duration-200'>
            Talk to sales
          </a>
        </Link>

        <Link href='demo'>
          <a className='p-2.5 px-6 bg-slate-100 text-slate-900 hover:shadow-[inset_0px_0px_0px_3px_rgba(15,23,42)] transition-all duration-200  rounded'>
            Demo
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default HomeNavbar;

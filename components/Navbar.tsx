'use client';

import { auth } from '@/auth';
import Link from 'next/link'
import React from 'react'

const navbar = async () => {

    const session = await auth()

    return (
      <div>
        <nav className='flex justify-between items-center p-4 shadow-lg'>
          <h1>Next Auth Demo</h1>
          <ul className='flex justify-between'>
              <li className='p-4 hover:bg-gray-600 rounded'><Link href="/">Home</Link></li>
              <li className='p-4 hover:bg-gray-600 rounded'><Link href="/about">About</Link></li>
              {!session? (<li className='p-4 hover:bg-gray-600 rounded'><Link href="/signin">Sign In</Link></li>)
              : <li className='p-4 hover:bg-gray-600 rounded'><Link href="/api/auth/signout">Sign Out</Link></li> }
              
          </ul>
        </nav>
      </div>
    )    
  }

export default navbar
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div class="navigation p-10 absolute top-0 right-0 left-0 bg-black bg-opacity-10">
        <nav className="nav">
            <ul
            class="navigation__list--primary uppercase flex items-center justify-between">
            <li class="navigation__item">
                <Link
                href="/"
                class="navigation__logo no-underline text-white text-3xl font-bold"
                >legalbot
                </Link>
            </li>
            <li class="navigation__item">
                <ul
                class="navigation__list--secondary uppercase flex items-center list-none gap-10">
                <li class="navigation__item--2">
                    <Link
                    href="/"
                    class="navigation__link text-white no-underline text-2xl px-4"
                    >Home
                    </Link>
                </li>
                <li class="navigation__item--2">
                    <Link
                    href="/about"
                    class="navigation__link text-white no-underline text-2xl px-4"
                    >About
                    </Link>
                </li>
                <li class="navigation__item--2">
                    <Link
                    href="/help"
                    class="navigation__link text-white no-underline text-2xl px-4"
                    >help
                    </Link>
                </li>
                <li class="navigation__item--2">
                    <Link
                    href="/login"
                    class="navigation__link text-white no-underline text-2xl px-4"
                    >Log in
                    </Link>
                </li>
                <li class="navigation__item--2">
                    <Link
                    href="/signup"
                    class="navigation__link text-white no-underline text-2xl px-4"
                    >Sign Up
                    </Link>
                </li>
                </ul>
            </li>
            <li class="navigation__item">
                <div class="navigation__item-search relative h-10 flex bg-white rounded-full w-[30rem]">
                    <label for="search" className=''>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 inline-block mx-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>               
                    </label> 
                    <input
                        type="text"
                        id="search"
                        class="navigation__search w-[20rem] h-full"
                        name="search"
                        placeholder="What's your problem" />
                </div>
            </li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar
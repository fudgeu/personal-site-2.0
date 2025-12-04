'use client'

import './globals.css'
import {ReactNode} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";

const pages = [
  { name: 'Home', href: '/tech-com-project' },
  { name: 'Resume', href: '/tech-com-project/resume' },
  { name: 'Instructions', href: '/tech-com-project/instructions' },
  { name: 'Proposal', href: '/tech-com-project/proposal'}
]

export default function RootLayout({ children }: {
  children: ReactNode,
}) {
  const pathname = usePathname();

  return (
    <div className="page">
      <main className="main">
        <div className="header">

          <div className="heading">
            <h1>Patrick Koss</h1>
            <p>Software Developer and Documentation Expert</p>
          </div>

          <nav className="nav">
            {pages.map((page) => (
              <Link
                key={page.name}
                href={page.href}
                className={'nav-button ' + (pathname === page.href ? 'active' : '')}
              >
                {page.name}
              </Link>
            ))}
          </nav>

        </div>


        {children}
      </main>

    </div>
  );
}

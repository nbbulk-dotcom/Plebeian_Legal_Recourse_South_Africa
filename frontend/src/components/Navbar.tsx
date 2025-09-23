import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Bars3Icon, XMarkIcon, ScaleIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Generate Documents', href: '/documents' },
  { name: 'Constitutional Analyzer', href: '/constitutional-analyzer' },
  { name: 'Lawyer Accountability', href: '/lawyer-accountability' },
  { name: 'Case Tracker', href: '/case-tracker' },
  { name: 'Public Dashboard', href: '/dashboard' },
  { name: 'Shakira Choonara Case', href: '/shakira-choonara-case' },
  { name: 'About', href: '/about' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <ScaleIcon className="h-8 w-8 text-constitutional-600" />
              <div>
                <div className="text-lg font-bold text-gray-900">Constitutional Liberation</div>
                <div className="text-xs text-gray-600">Free Legal Justice for All</div>
              </div>
            </Link>
          </div>
          
          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.href
                    ? 'text-constitutional-600 border-b-2 border-constitutional-600 pb-1'
                    : 'text-gray-700 hover:text-constitutional-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="fixed inset-0 z-50 bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-2">
                  <ScaleIcon className="h-8 w-8 text-constitutional-600" />
                  <span className="text-lg font-bold text-gray-900">Constitutional Liberation</span>
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                          location.pathname === item.href
                            ? 'bg-constitutional-50 text-constitutional-600'
                            : 'text-gray-900 hover:bg-gray-50'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

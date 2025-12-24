import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
          <Image 
            src="/png-logo-circle.png" 
            alt="Field Service Playbook Logo"
            width={100}
            height={100}
            className="rounded-lg"
          />
          <span className="text-xl font-bold text-gray-900">Field Service Playbook</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/blog" className="text-gray-600 hover:text-blue-600 transition font-medium">
            Blog
          </Link>
          <Link href="/tools" className="text-gray-600 hover:text-blue-600 transition font-medium">
            Tools
          </Link>
          <Link 
            href="https://creativejobhub.com" 
            className="flex flex-col items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="font-semibold">Try Creative Job Hub</span>
            <span className="text-xs text-blue-100">Built by a contractor, for contractors</span>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Link 
            href="/blog"
            className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
          >
            Menu
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="md:hidden mt-4 flex flex-col gap-3 pt-4 border-t border-gray-200">
        <Link href="/blog" className="text-gray-600 hover:text-blue-600 transition font-medium">
          Blog
        </Link>
        <Link href="/tools" className="text-gray-600 hover:text-blue-600 transition font-medium">
          Tools
        </Link>
        <Link 
          href="https://creativejobhub.com" 
          className="text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          target="_blank"
          rel="noopener noreferrer"
        >
          Try Creative Job Hub
        </Link>
      </nav>
    </header>
  );
}

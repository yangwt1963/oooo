import React, { useState } from 'react';
import { Menu, X, Flower2 } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center text-teal-800">
              <Flower2 className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl tracking-tight">ZenFlow 禅悦</span>
            </div>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <a href="#" className="text-stone-600 hover:text-teal-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">首页</a>
              <a href="#courses" className="text-stone-600 hover:text-teal-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">冥想课程</a>
              <a href="#about" className="text-stone-600 hover:text-teal-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">关于养生</a>
              <a href="#community" className="text-stone-600 hover:text-teal-700 px-3 py-2 rounded-md text-sm font-medium transition-colors">社区</a>
            </div>
          </div>
          <div className="flex items-center">
            <button className="hidden md:block bg-teal-700 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-teal-800 transition-colors shadow-sm">
              开始练习
            </button>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-stone-400 hover:text-stone-500 hover:bg-stone-100 focus:outline-none"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-stone-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="text-stone-700 hover:bg-stone-50 block px-3 py-2 rounded-md text-base font-medium">首页</a>
            <a href="#courses" className="text-stone-700 hover:bg-stone-50 block px-3 py-2 rounded-md text-base font-medium">冥想课程</a>
            <a href="#about" className="text-stone-700 hover:bg-stone-50 block px-3 py-2 rounded-md text-base font-medium">关于养生</a>
            <button className="w-full text-left bg-teal-50 text-teal-700 mt-2 block px-3 py-2 rounded-md text-base font-medium">
              开始练习
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
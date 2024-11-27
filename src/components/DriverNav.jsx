// DriverNav.js
import React from 'react';
import DriverBoard from './DriverBoard';
import VIHAR from '../images/bike.png'

const DriverNav = ({ toggleMenu, isMenuOpen }) => {
    return (
        <nav className="bg-white text-red-300 p-4 shadow-md">
            <div className="flex items-center justify-between">
                {/* Hamburger Icon for Mobile */}
                <div
                    id="hamburger"
                    onClick={toggleMenu}
                    className={`z-20 transition-transform duration-300 ease-in-out ${isMenuOpen ? ' m-2 scale-100' : ' shadow-[1px_1px_1px_red] p-2 rounded-lg scale-100'}`}
                >
                    <div
                        className={`w-8 h-1 bg-red-500 mb-2 transition-transform duration-300 rounded-md ease-in-out ${isMenuOpen ? '-rotate-45 bg-orange-400 w-4 translate-y-[7px] ' : ''}`}
                    ></div>
                    <div
                        className={`w-8 h-1 bg-slate-200 mb-2 transition-opacity duration-300 rounded-md ease-in-out ${isMenuOpen ? 'ml-1 bg-blue-500 rotate-1 w-7 ' : ''}`}
                    ></div>
                    <div
                        className={`w-8 h-1 bg-green-800 transition-transform duration-300 rounded-md ease-in-out ${isMenuOpen ? 'rotate-45 bg-red-500 w-4 -translate-y-[7px]' : ''}`}
                    ></div>
                </div>

                <div>
                    <img src={VIHAR} alt="" />
                </div>

                {/* Logo */}
                <div className="text-xl font-semibold">Vihar</div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`absolute z-10 top-0 left-0 w-full bg-white transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out md:hidden`}
            >
                <DriverBoard />
            </div>
        </nav>
    );
};

export default DriverNav;
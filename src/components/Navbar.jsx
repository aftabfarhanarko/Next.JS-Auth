import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <div className=' text-center py-3 px-5 border-b-2 bg-stone-700 text-white space-x-6 '>
            <Link href="/">Home</Link>
            <Link href="/public">Public</Link>
            <Link href="/private">Privet</Link>
            <Link href="/admin">Admin</Link>
            
        </div>
    );
};

export default Navbar;
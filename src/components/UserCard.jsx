"use client"
import { useSession } from 'next-auth/react';
import React from 'react';

const UserCard = () => {
    const session = useSession();
    console.log(session);
    
    return (
        <div>
            <h1 className=' text-4xl font-semibold my-7'>User - CLient Data :</h1>
            <p>{JSON.stringify(session)}</p>
        </div>
    );

};

export default UserCard;
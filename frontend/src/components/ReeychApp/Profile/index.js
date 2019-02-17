import React from 'react';

//import UserInfo from './UserInfo';

function Profile({ id }){
    return (
        <div>
            <h1>Hey, your logged in as {id}</h1>
            <button onClick={(e) => {
                e.preventDefault();
                try{
                    fetch(`/cookieTest`, {
                        method: 'POST',
                        body: JSON.stringify({hey: "Grettings"})
                    })
                } catch(err){
                    console.log('to be expected')
                }
            }}>See</button>
            <button onClick={(e) => {
                e.preventDefault();
                try{
                    fetch(`/cookieTest`);
                } catch(err){
                    console.log('to be expected')
                }
            }}>Other</button>
        </div>
    )
}

export default Profile;
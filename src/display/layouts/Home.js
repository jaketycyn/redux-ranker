import React from 'react';

import { accountService } from '../../_services';

function Home() {
    const user = accountService.userValue;

    return (
        <div>
            <div>
                <h1>Hi {user.firstName}!</h1>
                <p> YOu're logged in with React and JWT!!</p>
            </div>
        </div>
    )
}

export { Home }
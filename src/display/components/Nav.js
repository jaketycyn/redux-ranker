import React, { useState, useEffect } from 'react';
import { NavLink, Route } from 'react-router-dom';

import { Role } from '../../_helpers';
import { accountService } from '../../_services';

function Nav() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const subscription = accountService.user.subscribe(x => setUser(x));
        return subscription.unsubscribe;
    }, []);

    // only show nav when logged in
    if (!user) return null;

    return (
        <div>
            <nav>
                <div>
                    <NavLink exact to='/'>Home</NavLink>
                    <NavLink to='/profile'>Profile</NavLink>
                    {user.role === Role.Admin && 
                        <NavLink to='/admin'>Admin</NavLink>
                    }
                    <a onClick={accountService.logout}>Logout</a>
                </div>
            </nav>
            <Route path='/admin' component={AdminNav} />
        </div>
    );
}

function AdminNav({ match }) { 
    const { path } = match;

    return (
        <nav>
            <div>
                <NavLink to={`${path}/users`}>Users</NavLink>
            </div>
        </nav>
    )
}

export { Nav };
import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { setLoggedUser } from '../features/users/usersSlice'

import { Link } from 'react-router-dom'

const Header = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector((state) => state.users.loggedUser)

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    dispatch(setLoggedUser(null))
  }

  const LogoutButton = () => {
    return (
      <span>
        <i>{loggedUser.username} logged in&nbsp;</i>
        <button onClick={handleLogout}>Logout</button>
      </span>
    )
  }

  return (
    <nav>
      <section>
        <h1>Blog-List</h1>
        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Posts</Link>
            <Link to="/users">Users</Link>
            {loggedUser ? null : (
              <React.Fragment>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </React.Fragment>
            )}
          </div>
          {loggedUser ? <LogoutButton /> : null}
        </div>
      </section>
    </nav>
  )
}

export default Header

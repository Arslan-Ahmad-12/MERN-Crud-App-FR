import React from 'react'
import LogoutButton from './LogoutButton'

const Navbar = () => {
  return (
    <div>
      <nav>
        <ul style={{ display: 'flex', listStyle: 'none', padding: 0, justifyContent: 'flex-end' }}>
          <li>
            <LogoutButton />
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar

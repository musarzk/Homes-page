import React, { useEffect } from 'react'

const Users = ({setSelectedLink, link}) => {
  useEffect (()=> {

    setSelectedLink(link)

  }, [])

  return (
    <div>User</div>
  )
}

export default Users
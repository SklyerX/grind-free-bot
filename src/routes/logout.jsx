import React, { useEffect } from 'react'

const logout = () => {

    useEffect(() => {
        if(window.localStorage.getItem("cookie") !== null || undefined) {
            window.localStorage.removeItem("cookie");
            window.location.replace("/")
        } else {
            window.location.replace("/login")
        }
    }, [])

  return (
    <div>You are being logged out!</div>
  )
}

export default logout
import React from 'react'

export function ErrorMessage({ msg }) {

  return (<>
    {msg && <div className='error'>{msg}</div>}
  </>)
}

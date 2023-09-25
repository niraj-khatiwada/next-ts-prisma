'use client'

import React from 'react'

interface ErrorProps {
  error: Error
}

function Error({ error }: ErrorProps) {
  console.log('---', error.message)
  return <div>Oops. Something went wrong...</div>
}

export default Error

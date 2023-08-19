"use client"

import React from 'react'
import { Button } from './ui/button'
import { signIn } from "next-auth/react"

type Props = {}

const AuthBtn = (props: Props) => {
  return (
    <Button className='px-8 py-[2px] font-bold rounded-full bg-black dark:bg-white'
    onClick={() => signIn()}
    >
        SignIn
    </Button>
  )
}

export default AuthBtn
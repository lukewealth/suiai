"use client"
import React from 'react';
import { SessionProvider } from 'next-auth/react';

type Props = {
  children: React.ReactNode;
  session: any; // Add this prop type
};

const AuthProvider = ({ children, session }: Props) => {
  return <SessionProvider >{children}</SessionProvider>;
};

export default AuthProvider;
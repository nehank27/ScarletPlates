'use client';
import styles from './page.module.css'
import NavBar from './Components /NavBar/NavBar'
import Hero from './Components /Hero/Hero'

import Loading from './Components /Loading/Loading';
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react';
import Image  from 'next/image';
import rutgers from '/public/rutgers.png'
import { motion } from 'framer-motion';


export default function Home() {
  const [loading,setLoading] = useState(true);
  return (
   
       <AnimatePresence mode='sync'>
       {loading ? (
      <Loading
      key='loader'
      setLoading={setLoading}
      />
       ) : 
       <>
       
       <Hero setLoading={setLoading}/>
      
       
       
      
       </>
       }
       </AnimatePresence>
   
  )
}

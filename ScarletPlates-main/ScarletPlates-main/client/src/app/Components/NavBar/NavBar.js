"use client";
import styles from './NavBar.module.css'
import * as Unicons from '@iconscout/react-unicons';
import {AnimatePresence, motion} from 'framer-motion'
import { useState } from 'react';

const sideBar = {
    initial: {
        x:1000
    },
    animate: {
        x:0
    },
    exit: {
        x:1000
    }
}



export default function NavBar() {
    const [nav,setNav] = useState(false)

    const SideBar = () => {
        return (
            
            <motion.div variants={sideBar} key="sidebar" initial="initial" animate="animate" exit="exit" className={styles.menu_container}
            
            >
    
                <section className={styles.menu_box}>
                    <div onClick={()=>setNav(!nav)}>
                    <Unicons.UilX size="60"/>
                    </div>
                    <h3>Lorem</h3>
                    <h3>Ipsum</h3>
                    <h3>Lorem</h3>
                </section>
    
            </motion.div>
         
        )
    }

    return (
        

           
        <>
        <div className={styles.bars} onClick={()=> setNav(!nav)}>
                <Unicons.UilBars size="50"/>
            </div>
           <AnimatePresence>
           {nav ? <SideBar/> : ""}
           </AnimatePresence>
        
        </>
            
       
    )
}
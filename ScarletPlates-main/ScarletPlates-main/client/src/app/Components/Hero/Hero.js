'use client';
import styles from './Hero.module.css'
import {AnimatePresence, easeIn, motion} from 'framer-motion'
import Link from 'next/link';
import rutgers from '/public/rutgers.png'
import Image from 'next/image';
import NavBar from '../NavBar/NavBar';
import { useState } from 'react';
//container to stagger the letter animations
const container = {
    animate : {
        transition: {
            staggerChildren:0.1,
            delayChildren:1.1,
            ease:'ease'
           
        }
    }
}
// letter animation that rises each letter upwards
const letterAnimation = {
    initial: {
        y:600,

      },
      animate: {
        y:0,
      
        transition: {
          ease: [0.5, 0.02, -0.05, 0.95],
          duration:1
        }
      }
}

const TopRow= ({title}) => {
    return (
        <div className={`${styles.top_row} ${styles.row}`}>
            <AnimatedLetters title={title}/>
        </div>
    )
}
const MiddleRow= ({title}) => {
    return (
        <div className={`${styles.mid_row} ${styles.row}`}>
            <AnimatedLetters title={title}/>
        </div>
    )
}
// const BottomRow= ({title}) => {
//     return (
//         <div className={`${styles.bot_row} ${styles.row}`}>
//             <AnimatedLetters title={title}></AnimatedLetters>
//         </div>
//     )
// }

const AnimatedLetters = ({title}) => {
    return (
        <motion.span
        variants={container}
        initial="initial"
        animate="animate"
        >
        {[...title].map((letter,i) => (
            <motion.span className={styles.letters} variants={letterAnimation} key={i}>{letter}</motion.span>
        ))}
        </motion.span>
    )
}

const Circle = ({letters, title }) => {
    return (
        <div className={styles.circle}>
            <h3>{letters}</h3>
        </div>
    )
}

export default function Hero() {
    const [button,setButton] = useState(false);
    return (
    <div className={styles.hero_container}>
        <div className={styles.hero_top}>
        <NavBar/>  
        <motion.div className={styles.hero_row}>
        <TopRow title={"SCARLET PLATES"}/>
        </motion.div>
        </div>
        
       
        <div className={styles.hero_center}>

<AnimatePresence mode='sync'>
    
        <motion.div className={styles.plate}
       layoutId="plate"
       initial={{opacity:0.25}} animate={{opacity:1}} transition={{ duration:1, ease:[0.5, 0.02, 0.01, 0.95]} }
       >
        
        <Image src={rutgers} width={200} height={200}/>
       </motion.div>
</AnimatePresence>

<div className={styles.center_column}>
<h3>Scarlet Served Flavor Deserved</h3>
<button>Choose Your Campus</button>
</div>

<div
       >
        
        <Image src={rutgers} width={200} height={200}/>
       </div>



        
        </div>

    
        <div className={styles.hero_bottom}>
        <Link href={{pathname:'/livingston', query:{campus:'Livi'}}}><Circle  letters={"LV"}/></Link>
        <Link href={{pathname:'/busch', query:{campus:'Busch'}}}><Circle  letters={"BU"}/></Link>
        <Link href={{pathname:'/collegeave', query:{campus:'CollegeAve'}}}><Circle  letters={"CA"}/></Link>
        <Link href={{pathname:'/cookdouglas', query:{campus:'CookDoug'}}}><Circle letters={"CD"}/></Link>

        </div>




    </div>
    )
}
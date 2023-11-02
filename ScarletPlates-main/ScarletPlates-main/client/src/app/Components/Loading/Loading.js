
import {motion} from 'framer-motion'
import styles from './Loading.module.css'

const slogan= {
    initial: {
        opacity:0
    },
    animate: {
        opacity:1,
        transition: {
            duration:5,
            ease:"easeIn"
        }
    },
    exit: {
        opacity:0,
        y:-150,
        transition: {
          ease:"easeInOut",
          duration:1
        }
    }
}

const plate = {
    initial: {opacity:0,y:200},
    animate: {
      opacity:1,
      y:0,
      transition: {
        ease: [0.5, 0.02, 0.01, 0.95],
        duration:1.6
      },
      
     
    },
    exit: {
      opacity:0,
      duration:1
    }
  }
export default function Loading({setLoading}) {


    return (
        <div  className={styles.loading_container}>
       <motion.div variants={plate} layoutId='plate'>
       <motion.svg   animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, repeatType:"reverse"}}    width="200" height="200" viewBox="0 0 91 91" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_2_6)"><path d="M41.965 85.232L43.491 53.84L33.027 83.488L26.923 81.09L40.439 52.532L19.511 76.076L14.715 71.28L38.259 50.352L9.701 63.868L7.303 57.764L36.951 47.3L5.559 48.826V42.286L36.951 44.03L7.303 33.348L9.701 27.462L38.259 40.978L14.715 19.832L19.511 15.254L40.439 38.58L26.923 10.24L33.027 7.624L43.491 37.49L41.965 5.88H48.505L46.761 37.272L57.443 7.624L63.329 10.24L49.813 38.58L70.959 15.254L75.537 19.832L52.211 40.978L80.551 27.462L83.167 33.348L53.301 44.03L84.911 42.286V48.826L53.301 47.3L83.167 57.764L80.551 63.868L52.211 50.352L75.537 71.28L70.959 76.076L49.813 52.532L63.329 81.09L57.443 83.488L46.761 53.84L48.505 85.232H41.965Z" fill="pink"></path></g><defs><clipPath id="clip0_2_6"><rect width="91" height="91" fill="#171614"></rect></clipPath></defs></motion.svg>
       </motion.div>
        <motion.h1
        onAnimationComplete={()=>{setLoading(false)}}
        variants={slogan}
        initial="initial"
        animate="animate"
        exit="exit"
        key='key'
       
        >Scarlet Plates, Where Taste Celebrates.</motion.h1>
        </div>
    )
}
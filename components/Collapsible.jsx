import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import ToggleIcon from '../public/icons/angle-down.svg';

const Collapsible = ({
    title,
    children
}) => {

    const [open, setOpen] = useState(false);

    return (
        <div className="collapsible">
            <motion.div className='collapsible__header' initial={false} onClick={() => setOpen(!open)}>
                <h4 className='collapsible__header--title'>{title}</h4>
                <motion.div className="collapsible__header--icon"
                    initial="collapsed"
                    animate={open ? "open" : "collapsed"}
                    variants={{
                        open: {
                            rotate: 180
                        },
                        collapsed: {
                            rotate: 0
                        }
                    }}>
                    <ToggleIcon></ToggleIcon>
                </motion.div>
            </motion.div>
            <AnimatePresence>
                <motion.div
                    key="content"
                    initial="collapsed"
                    exit="collapsed"
                    animate={open ? "open" : "collapsed"}
                    /*transition={{ type: "spring", velocity: 10, duration: .2 }}*/
                    variants={{
                        open: { opacity: 1, height: "auto", scale: 1 },
                        collapsed: { opacity: 0, height: 0, scale: .99 }
                    }}
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default Collapsible;
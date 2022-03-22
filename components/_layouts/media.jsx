import { useTransform, useViewportScroll, motion } from "framer-motion";

const Media = () => {

    const { scrollY } = useViewportScroll();

    return (
        <motion.div className="media">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="center text-green uppercase">Videos y Audios</h3>
                        </div>
                        <div className="row">
                            <div className="col-4">
                                <div className="media-item">

                                </div>
                            </div>
                            <div className="col-4">
                                <div className="media-item">

                                </div>
                            </div>
                            <div className="col-4">
                                <div className="media-item">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
    );
}

export default Media;
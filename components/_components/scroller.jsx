import { useEffect, useRef } from "react";
import SmoothScrollbar from "smooth-scrollbar";

const Scroller = ({children}) => {
    const scrollbar = useRef();
    const content = useRef();

    useEffect(() => {
        scrollbar.current = SmoothScrollbar.init(content.current, {
            damping: 0.05,
            continuousScrolling: true,
            delegateTo: document,
        })

        scrollbar.current.setPosition(0, 0);
        scrollbar.current.track.xAxis.element.remove();

        return () => {
            if (scrollbar.current) {
                scrollbar.current.destroy();
                scrollbar.current = null;
            }
        }   
    }, [])

    return (
        <div data-scrollbar ref={content}>{children}</div>
    )
}

export default Scroller;
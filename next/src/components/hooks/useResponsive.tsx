import React from "react";
import { useWindowSize } from "react-use";


export const useResponsive = () => {
    const { width } = useWindowSize();

    const getScreen = () => {
        if (width < 425) return "sm";
        if (width < 768) return "md";
        if (width < 1024) return "lg";
        if (width < 1440) return "xl";
        return "2xl";
    }
    
    let [screen, setScreen] = React.useState<string>(getScreen());

    React.useEffect(() => {
        setScreen(getScreen());
    }, [width]) // eslint-disable-line react-hooks/exhaustive-deps

	return screen;
};
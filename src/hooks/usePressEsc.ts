import {useNavigate} from "react-router-dom";
import {useEffect} from "react";


export const usePressEcs = (path: string) => {

    const navigate = useNavigate()
    const initAfterPressEsc = (path: string) => {
        const close = (e: any) => {
            if (e.key === "Escape") {
                navigate(path, {replace: true})
            }
        }
        window.addEventListener('keydown', close)
        return () => window.removeEventListener('keydown', close)
    }

    useEffect(() => {
        initAfterPressEsc(path)
    }, [])
}
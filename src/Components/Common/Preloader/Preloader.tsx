import React, {FC} from "react";
import imgPreloader from "./../../../assets/images/preloader.png"

const Preloader: FC = () => {
    return <img src={imgPreloader} alt="NoPhoto"/>
}
export {Preloader}
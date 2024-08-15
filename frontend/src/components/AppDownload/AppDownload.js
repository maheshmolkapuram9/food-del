import { assets } from "../../assets/assets";
import "./AppDownload.css";

const AppDownload = () => {
    return ( 
        <div className="app-download" id="app-download">
            <p>For better experience Download <br /> Tomato App</p>
            <div className="app-download-platforms">
                <img src={assets.play_store} alt="play store" />
                <img src={assets.app_store} alt="App store" />
            </div>
        </div>
     );
}
 
export default AppDownload;
import { Grid, ThreeDots } from 'react-loader-spinner'
import "./LoadingModal.scss";

const LoadingModal = () => {

    return (
        <div className="loading-modal__overlay">
            <div className="loading-modal__content">
                <Grid
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="grid-loading"
                    radius="12.5"
                    visible={true}
                />
                <div className='loading-modal__loading'>
                    <p>Loading</p>
                    <ThreeDots
                        height="20"
                        width="20"
                        radius="9"
                        color="#000"
                        ariaLabel="three-dots-loading"
                        visible={true}
                        wrapperClass="dots-wrapper"
                    />
                </div>
                <h2>A unique puzzle is being made.</h2>
            </div>
        </div>
    );
};
export default LoadingModal;
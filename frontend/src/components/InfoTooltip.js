import Popup from './Popup';
import imageSuccess from '../images/success.png'
import imageFail from '../images/fail.png'
import { useEffect, useState } from 'react';

const InfoTooltip = (props) => {
    const { name, isOpen, onClose, statusCompleted, errorMessage } = props;
    const [content, setContent] = useState({ image: '', text: '' });

    useEffect(() => {

        if (statusCompleted) {
            setContent({ image: imageSuccess, text: 'Вы успешно зарегистрировались!' })
        }
        if (!statusCompleted && !errorMessage) {
            setContent({ image: imageFail, text: 'Что-то пошло не так! Попробуйте ещё раз.' })
        }
        // если пропс с текстом ошибки у нас передан, то показываем  его
        if (!statusCompleted && errorMessage) {
            setContent({ image: imageFail, text: errorMessage })
        }
    }, [statusCompleted, errorMessage])

    return (
        <Popup name={name} isOpen={isOpen} onClose={onClose}>
            <div className="popup__container">
                <button type="button" className="popup__close" onClick={onClose} />
                <img className="popup__notify-image" src={content.image} alt={content.text} />
                <h3 className='popup__notify-title'>{content.text}</h3>
            </div>
        </Popup>
    )
}
export default InfoTooltip
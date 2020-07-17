import { Image } from 'react-bootstrap';

const Item = (props) => {
    const { name, description, image } = props.data;
    return (
        <div className='my-3'>
            <Image src={image} fluid></Image>
            <div className='byob-text-small'>
                <b>{name}</b>
                <small className='d-block'>
                    <i className='text-muted'>{description}</i>
                </small>
            </div>
        </div>
    );
};

export default Item;

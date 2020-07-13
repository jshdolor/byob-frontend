import { Image } from 'react-bootstrap';

const Item = (props) => {
    const { name, description, image } = props.data;
    return (
        <div className='my-3'>
            <Image src={image} fluid></Image>
            <div className='byob-text-small'>
                {name}
                <small style={{ display: 'block' }}>
                    <i className=' text-muted'>{description}</i>
                </small>
            </div>
        </div>
    );
};

export default Item;

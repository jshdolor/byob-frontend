import { Image, Row, Col, Space } from 'react-bootstrap';
import ButtonAddCart from '~/components/buttons/addCart';
import Link from 'next/link';

const Item = (props) => {
    const { id, name, image, displayPrice, slug, type } = props.data;

    const buttonProps = {
        id,
        text: <i className='byob-text-small'>Add to Cart</i>,
        style: { marginTop: '-10px' },
        type,
    };
    return (
        <div className='my-3'>
            <Link href={`/products/${slug}`}>
                <a className='byob-text-default'>
                    <Image src={image} style={{ width: '100%' }} fluid></Image>
                    <div className='byob-text-small font-weight-bold d-block mt-3'>
                        <div className='ml-2 float-right'>{displayPrice}</div>
                        <div className='mr-auto'>{name}</div>
                    </div>
                </a>
            </Link>
            <ButtonAddCart {...buttonProps}></ButtonAddCart>
        </div>
    );
};

export default Item;

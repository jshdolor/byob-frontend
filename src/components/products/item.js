import { Image, Row, Col, Space } from 'react-bootstrap';
import ButtonAddCart from '~/components/buttons/addCart';
import Link from 'next/link';
import { defaultRefillableValue } from '~/config/app';
import Img from 'react-cool-img';

// Suggest to use low quality or vector images
import loadingImage from '~/components/loader/image-loader';

const ByobImage = ({ name, src }) => (
    <Img
        style={{ width: '100%' }}
        placeholder='/img-preloader.svg'
        src={src}
        error={loadingImage}
        alt={name}
        cache
    />
);

const Item = (props) => {
    const { id, name, image, displayPrice, slug, type } = props.data;
    const qty = type.id === 2 ? defaultRefillableValue : 1;
    const buttonProps = {
        id,
        text: <i className='byob-text-small'>Add to Cart</i>,
        style: { marginTop: '-10px' },
        type,
        qty,
    };
    return (
        <div className='my-3'>
            <Link href={`/products/[slug]`} as={`/products/${slug}`}>
                <a className='byob-text-default'>
                    <ByobImage name={name} src={image}></ByobImage>
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

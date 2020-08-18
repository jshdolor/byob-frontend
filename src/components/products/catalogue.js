import React, { Component } from 'react';
import Item from './item';
import { Row, Col } from 'react-bootstrap';
import { paginate } from '../../utils/paginate';
import PageSelect from '../../components/PageSelect/PageSelect';

class Catalogue extends Component {
    constructor(props) {
        super(props);

        this.state = { currentPage: 1, pageSize: 16 };
        this.browseContainer = React.createRef();
    }

    scrollToTopOfList = () => {
        window.scrollTo(0, this.browseContainer.current.offsetTop);
    };

    handlePageChange = (page) => {
        this.setState({ currentPage: page }, this.scrollToTopOfList);
    };

    render() {
        const { currentPage, pageSize } = this.state;
        const { products } = this.props;
        const paginatedProducts = paginate(products, currentPage, pageSize);
        return (
            <>
                <Row ref={this.browseContainer}>
                    {(paginatedProducts || []).map((product) => (
                        <Col key={product.id} lg={3}>
                            <Item data={product}></Item>
                        </Col>
                    ))}
                </Row>
                <PageSelect
                    itemsCount={products.length}
                    pageSize={pageSize}
                    onPageChange={this.handlePageChange}
                    currentPage={currentPage}
                />
            </>
        );
    }
}

export default Catalogue;

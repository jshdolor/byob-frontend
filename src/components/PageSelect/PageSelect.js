import React from 'react';
import { Pagination } from 'antd';

const PageSelect = (props) => {
  const { itemsCount, pageSize, onPageChange, currentPage } = props;

  return <Pagination className='product-pagination' current={currentPage} defaultCurrent={1} total={itemsCount} pageSize={pageSize} onChange={(page) => onPageChange(page)} />;
};

export default PageSelect;

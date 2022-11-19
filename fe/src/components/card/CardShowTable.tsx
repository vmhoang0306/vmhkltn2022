import { Button, Empty, Skeleton, Space, Table } from 'antd';
import React, { useState } from 'react';
import CardHeader from './CardHeader';

interface TableItemI {
  columns: Array<{
    height?: string | number;
    width?: string | number;
    title: string;
    dataIndex?: string;
    key: string;
    render?: any;
    align?: 'left' | 'center' | 'right';
  }>;
  dataSource: Array<any>;
  scroll?: { y?: number; x?: number };
}

export interface CardShowTablePropsI {
  title: string;
  color: 'blue' | 'orange' | 'yellow' | 'green';
  table: TableItemI;
  isCollapse?: boolean;
  handleLoadmore?: () => void;
  isShowLoadMore?: boolean;
  handleUpdate?: () => void;
  requesting?: boolean;
  classWrap?: string;
  layoutCustom?: any;
}

function CardShowTable(props: CardShowTablePropsI) {
  const {
    title,
    color,
    table,
    isCollapse,
    handleLoadmore,
    handleUpdate,
    isShowLoadMore,
    requesting = false,
    classWrap,
    layoutCustom,
  } = props;
  const [collapse, setCollapse] = useState(false);
  const handleCollapse = () => {
    setCollapse(!collapse);
  };

  return (
    <div className={`card-border-sm pb-3 ${classWrap ? classWrap : ''}`} key={title}>
      <CardHeader
        title={title}
        color={color}
        isCollapse={isCollapse}
        handleCollapse={handleCollapse}
      />
      <Space
        direction="vertical"
        size={25}
        className={`w-100 ${collapse ? `display-none` : ``}`}
        style={{ position: 'relative', top: '-16px' }}
      >
        {layoutCustom}
        <Table
          {...table}
          rowKey="id"
          columns={table.columns}
          pagination={false}
          bordered
          locale={{
            emptyText: requesting ? (
              <Skeleton active />
            ) : (
              <>{table.dataSource?.length > 0 ? '' : <Empty />}</>
            ),
            // emptyText: table.dataSource?.length! > 0 ? '' : <Empty />,
          }}
        />

        <Space className="d-flex justify-content-center w-100">
          {isShowLoadMore && (
            <Button className="btn-custom btn-blue" onClick={handleLoadmore} loading={requesting}>
              XEM THÊM
            </Button>
          )}
          {handleUpdate && (
            <Button className="btn-custom btn-white" onClick={handleUpdate}>
              CẬP NHẬT
            </Button>
          )}
        </Space>
      </Space>
    </div>
  );
}

export default CardShowTable;

import { CaretDownOutlined, DownOutlined, EditOutlined, FormOutlined } from '@ant-design/icons';
import { Button, Col, Dropdown, Menu, Row, Space, Tooltip, Typography } from 'antd';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const { Title } = Typography;

interface CardHeaderPropsI {
  title: string;
  color: 'blue' | 'orange' | 'yellow' | 'green';
  isCollapse?: boolean;
  handleCollapse?: () => void;
  isShowUpdate?: boolean; //xét quyền đế show btn Update
  linkRedirectUpdate?: string; //Hiển thị button (link dẫn tới địa chỉ cập nhật)
  linkRedirectDropUpdate?: string[]; // Hiển thị button dropdown
  linkDropOffer?: string[]; // Hiển thị button dropdown
}

function CardHeader(props: CardHeaderPropsI) {
  const {
    title,
    color,
    isCollapse,
    handleCollapse,
    linkRedirectDropUpdate,
    isShowUpdate,
    linkDropOffer,
  } = props;

  // const listPermission = useAppSelector(selectPermission);
  return (
    <Row>
      <Col
        span={24}
        className={`py-1 px-1 bg-${color}-5`}
        id="cardHeader"
        style={{ position: 'relative' }}
      >
        <Space className="d-flex justify-content-space-between">
          <Title level={4} className="mb-0 txt-white ms-1 text-uppercase">
            {title}
          </Title>
          {isCollapse && (
            <Button
              type="text"
              className="txt-white"
              icon={<CaretDownOutlined />}
              onClick={handleCollapse}
            />
          )}

          {isShowUpdate === true && linkRedirectDropUpdate && (
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item>
                    <Link to={linkRedirectDropUpdate[0]}>
                      <EditOutlined /> <span className="ps-1"> Thông tin nhân viên</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link to={linkRedirectDropUpdate[1]}>
                      <EditOutlined /> <span className="ps-1">Loại, Ca nhân viên</span>
                    </Link>
                  </Menu.Item>
                  {/* <Menu.Item>
                      <Link to={linkRedirectDropUpdate[2]}>
                        <EditOutlined /> <span className="ps-1">Tiểu sử</span>
                      </Link>
                    </Menu.Item> */}
                </Menu>
              }
            >
              <Button>
                <FormOutlined style={{ border: 'none' }} className={`txt-${color}-5`} />
                <DownOutlined style={{ border: 'none' }} className={`txt-${color}-5`} />
              </Button>
            </Dropdown>
          )}
        </Space>
      </Col>
      {/* <BreadcrumbComponent listBreadCrumb={breadcrumb} color={color} /> */}
    </Row>
  );
}

export default CardHeader;

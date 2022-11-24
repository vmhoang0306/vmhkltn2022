import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PAGE_URL } from '../../constant/route';

function PageNotFound(): JSX.Element {
  const [styleMove, setStyleMove] = useState<any>();
  const history = useHistory();
  useEffect(() => {
    var pageX = window.innerWidth;
    var pageY = window.innerHeight;
    var mouseY = 0;
    var mouseX = 0;

    document.addEventListener('mousemove', (event) => {
      mouseY = event.pageY;
      let yAxis = (-(pageY / 2 - mouseY) / pageY) * 300;
      //horizontalAxis
      mouseX = event.pageX / -pageX;
      let xAxis = -mouseX * 100 - 100;
      setStyleMove({
        transform: `translate(${xAxis}%, ${yAxis}%)`,
      });
    });
  }, []);

  const onGoBackPage = () => {
    history.push(PAGE_URL.EMPLOYEEINFO.INFO);
  };

  return (
    <React.Fragment>
      <Row className="mt-3 mb-5">
        <Col span={24}>
          <div className="not-permission">
            <div className="box-permission">
              <div className="box-permission__ghost">
                <div className="symbol" />
                <div className="symbol" />
                <div className="symbol" />
                <div className="symbol" />
                <div className="symbol" />
                <div className="symbol" />
                <div className="box-permission__ghost-container">
                  <div className="box-permission__ghost-eyes" style={styleMove}>
                    <div className="box-permission__eye-left" />
                    <div className="box-permission__eye-right" />
                  </div>
                  <div className="box-permission__ghost-bottom">
                    <div />
                    <div />
                    <div />
                    <div />
                    <div />
                  </div>
                </div>
                <div className="box-permission__ghost-shadow" />
              </div>
              <div className="box-permission__description">
                <div className="box-permission__description-container">
                  <div className="box-permission__description-title"></div>
                  <div className="box-permission__description-text">
                    Đường dẫn không hợp lệ, vui lòng quay lại trang chủ.
                  </div>
                </div>
                <span onClick={onGoBackPage} className="box-permission__button">
                  Trang chủ
                </span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default PageNotFound;

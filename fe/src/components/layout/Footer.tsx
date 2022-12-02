import { Space } from "antd";
import React from "react";
import "./style.scss";

export const FooterComponent = () => {
  return (
    <>
      <div className="footer__style">
        <Space className="d-flex justify-content-center" direction="vertical">
          <hr className="mt-3 mx-5 mb-1" style={{ borderColor: "white" }} />

          <div
            className="text-muted copyright__style"
            style={{ color: "#fff" }}
          >
            Copyright © The Gioi Di Dong <br />
            Khoa Luan Tot Nghiep 2022 | Vo Minh Hoang | 1921006700
          </div>
        </Space>
      </div>
    </>
  );
};

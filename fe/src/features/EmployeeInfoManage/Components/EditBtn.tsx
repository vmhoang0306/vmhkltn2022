import { EditOutlined, InfoCircleOutlined } from "@ant-design/icons";
import {
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Space,
  Switch,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { ButtonUI, TextUI, TitleUI } from "../../../components/general";
import { ModalConfirm } from "../../../components/modules";
import { ApiConstants } from "../../../constant";
import { Notify } from "../../../helpers";
import { IEmployeeInfo } from "../../../models";
import { Utils } from "../../../utils";
import SelectBase from "../../common/components/SelectBase";

interface IProps {
  idEdit: IEmployeeInfo;
  getlist: () => void;
  lstDpm: { value: any; title: any }[];
  lstShift: { value: any; title: any }[];
  lstPosition: { value: any; title: any }[];
  lstStore: { value: any; title: any }[];
}

function EditBtn(props: IProps) {
  const { idEdit, getlist, lstDpm, lstPosition, lstShift, lstStore } = props;
  const [formedit] = Form.useForm();

  const [showEdit, setShowEdit] = useState(false);
  const [requestingEdit, setRequestingEdit] = useState(false);

  useEffect(() => {
    if (showEdit) {
      formedit.setFieldsValue({
        fullname: idEdit.fullname!,
        email: idEdit.contact?.email!,
        phonenumber: idEdit.contact?.phonenumber!,
        identitycardid: idEdit.identitycardid!,
        socialinsuranceid: idEdit.socialinsuranceid!,
        taxcode: idEdit.taxcode!,
        dateofbirth: dayjs(
          Utils.date.formatDateInput(idEdit.dateofbirth!),
          "YYYY/MM/DD"
        ),
        startdatework: dayjs(
          Utils.date.formatDateInput(idEdit.startdatework!),
          "YYYY/MM/DD"
        ),
        gender: idEdit.gender,
        department: idEdit.department?._id,
        store: idEdit.store?._id,
        position: idEdit.position?._id,
        shift: idEdit.shift?._id,
        isactive: idEdit.isactive,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showEdit]);

  const handleCancelEdit = () => {
    setShowEdit(false);
    formedit.resetFields();
  };
  const handleConfirmEdit = () => {
    formedit.submit();
  };

  const handleFinishEdit = async (e: any) => {
    const url = ApiConstants.employeeinfo.update;
    const data: IEmployeeInfo = {
      username: idEdit?.username,
      fullname: e.fullname,
      contact: {
        email: e.email,
        phonenumber: e.phonenumber,
      },
      gender: e.gender,
      dateofbirth: e.dateofbirth,
      identitycardid: e.identitycardid,
      socialinsuranceid: e.socialinsuranceid,
      startdatework: e.startdatework,
      enddatework: e.enddatework,
      reason: e.reason,
      taxcode: e.taxcode,
      salary: e.salary,
      isactive: e.isactive,
      department: e.department,
      position: e.position,
      store: e.store,
      shift: e.shift,
    };

    setRequestingEdit(true);
    const res: any = await axios.post(url, data);
    setRequestingEdit(false);

    if (res.data.data > 0) {
      Notify.success(
        "",
        res.data.message
          ? res.data.message
          : "Cập nhật thông tin người dùng thành công!"
      );
      getlist();
      handleCancelEdit();
    } else {
      console.log(res.data.message);
      Notify.error(
        "",
        res.data.message && res.status === 200
          ? res.data.message
          : "Xảy ra lỗi!"
      );
    }
  };

  return (
    <React.Fragment>
      <ButtonUI
        icon={<EditOutlined />}
        onClick={() => {
          setShowEdit(true);
        }}
      />

      <ModalConfirm
        visible={showEdit}
        setVisible={setShowEdit}
        title={"Cập nhật thông tin người dùng"}
        handleConfirm={handleConfirmEdit}
        loadingBtnConfirm={requestingEdit}
        handleCancel={handleCancelEdit}
        width={768}
      >
        <React.Fragment>
          <Form
            form={formedit}
            layout="vertical"
            className="form-row-gap-1"
            onFinish={handleFinishEdit}
          >
            <Row gutter={[10, 0]}>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Divider orientation="left" orientationMargin="0">
                  <Space direction="horizontal">
                    <InfoCircleOutlined />
                    <TitleUI text="Thông tin cá nhân" />
                  </Space>
                </Divider>
              </Col>

              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="fullname"
                  label={<TextUI strong text="Họ tên" />}
                  rules={[
                    {
                      required: true,
                      message: "Không được bỏ trống trường này!",
                    },
                  ]}
                >
                  <Input
                    className="w-100 min-width-100px"
                    placeholder="Nhập họ tên nhân viên"
                  />
                </Form.Item>
              </Col>

              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="gender"
                  label={<TextUI strong text="Giới tính" />}
                  rules={[
                    {
                      required: true,
                      message: "Không được bỏ trống trường này!",
                    },
                  ]}
                >
                  <SelectBase
                    isShowChooseAll={false}
                    placeholder="Chọn giới tính"
                    defVal={idEdit?.gender}
                    data={[
                      { value: 0, title: "Nữ" },
                      { value: 1, title: "Nam" },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="phonenumber"
                  label={<TextUI strong text="Số điện thoại" />}
                  rules={[
                    {
                      required: true,
                      message: "Không được bỏ trống trường này!",
                    },
                  ]}
                >
                  <Input
                    className="w-100 min-width-100px"
                    placeholder="Nhập số điện thoại"
                  />
                </Form.Item>
              </Col>

              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item name="email" label={<TextUI strong text="Email" />}>
                  <Input
                    className="w-100 min-width-100px"
                    placeholder="Nhập email"
                  />
                </Form.Item>
              </Col>

              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="dateofbirth"
                  label={<TextUI strong text="Ngày sinh" />}
                  rules={[
                    {
                      required: true,
                      message: "Không được bỏ trống trường này!",
                    },
                  ]}
                >
                  <DatePicker
                    format="DD/MM/YYYY"
                    placeholder="Chọn ngày sinh"
                    className="w-100 min-width-100px"
                  />
                </Form.Item>
              </Col>

              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="department"
                  label={<TextUI strong text="Phòng ban" />}
                  rules={[
                    {
                      required: true,
                      message: "Không được bỏ trống trường này!",
                    },
                  ]}
                >
                  <SelectBase
                    isShowChooseAll={false}
                    placeholder="Chọn phòng ban"
                    data={lstDpm}
                    defVal={idEdit?.department?._id}
                  />
                </Form.Item>
              </Col>

              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="store"
                  label={<TextUI strong text="Siêu thị" />}
                  rules={[
                    {
                      required: true,
                      message: "Không được bỏ trống trường này!",
                    },
                  ]}
                >
                  <SelectBase
                    isShowChooseAll={false}
                    placeholder="Chọn siêu thị"
                    data={lstStore}
                    defVal={idEdit?.store?._id}
                  />
                </Form.Item>
              </Col>

              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="position"
                  label={<TextUI strong text="Vị trí" />}
                  rules={[
                    {
                      required: true,
                      message: "Không được bỏ trống trường này!",
                    },
                  ]}
                >
                  <SelectBase
                    isShowChooseAll={false}
                    placeholder="Chọn vị trí"
                    data={lstPosition}
                    defVal={idEdit?.position?._id}
                  />
                </Form.Item>
              </Col>

              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="shift"
                  label={<TextUI strong text="Loại phân ca" />}
                  rules={[
                    {
                      required: true,
                      message: "Không được bỏ trống trường này!",
                    },
                  ]}
                >
                  <SelectBase
                    isShowChooseAll={false}
                    placeholder="Chọn loại phân ca"
                    data={lstShift}
                    defVal={idEdit?.shift?._id}
                  />
                </Form.Item>
              </Col>

              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="isactive"
                  label={<TextUI strong text="Trạng thái hoạt động" />}
                  rules={[
                    {
                      required: true,
                      message: "Không được bỏ trống trường này!",
                    },
                  ]}
                >
                  <Switch defaultChecked={idEdit?.isactive} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[10, 0]}>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                <Divider orientation="left" orientationMargin="0">
                  <Space direction="horizontal">
                    <InfoCircleOutlined />
                    <TitleUI text="Thông tin công việc" />
                  </Space>
                </Divider>
              </Col>

              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="identitycardid"
                  label={<TextUI strong text="CCCD" />}
                  rules={[
                    {
                      required: true,
                      message: "Không được bỏ trống trường này!",
                    },
                  ]}
                >
                  <Input
                    className="w-100 min-width-100px"
                    placeholder="Nhập CCCD"
                  />
                </Form.Item>
              </Col>

              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="socialinsuranceid"
                  label={<TextUI strong text="Mã bảo hiểm xã hội" />}
                >
                  <Input
                    className="w-100 min-width-100px"
                    placeholder="Nhập mã bảo hiểm xã hội"
                  />
                </Form.Item>
              </Col>

              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="taxcode"
                  label={<TextUI strong text="Mã số thuế" />}
                >
                  <Input
                    className="w-100 min-width-100px"
                    placeholder="Nhập mã số thuế"
                  />
                </Form.Item>
              </Col>

              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item
                  name="startdatework"
                  label={<TextUI strong text="Ngày bắt đầu làm việc" />}
                  rules={[
                    {
                      required: true,
                      message: "Không được bỏ trống trường này!",
                    },
                  ]}
                >
                  <DatePicker
                    format="DD/MM/YYYY"
                    placeholder="Chọn ngày bắt đầu làm việc"
                    className="w-100 min-width-100px"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </React.Fragment>
      </ModalConfirm>
    </React.Fragment>
  );
}

export default EditBtn;

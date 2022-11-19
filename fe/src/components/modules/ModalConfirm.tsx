import { Modal, Space } from 'antd';
import { ButtonUI, TitleUI } from '../general';

interface ModalConfirmPropsI {
  visible: boolean;
  title?: string;
  handleConfirm?: () => void;
  handleThird?: () => void;
  handleCancel?: () => void;
  setVisible: (value: boolean) => void;
  children?: JSX.Element;
  textCancel?: string;
  disabledBtnCancel?: boolean;
  textConfirm?: string;
  colorConfirm?: 'primary' | 'success' | 'warning' | 'secondary' | 'danger' | 'violet';
  textThird?: string;
  colorThird?: 'primary' | 'success' | 'warning' | 'secondary' | 'danger' | 'violet';
  disabledBtnThird?: boolean;
  disabledBtnConfirm?: boolean;
  htmlTypeBtnConfirm?: 'button' | 'submit';
  htmlTypeBtnThird?: 'button' | 'submit';
  loadingBtnConfirm?: boolean;
  loadingBtnThird?: boolean;

  showButtonConfirm?: boolean;
  showButtonThird?: boolean;
  showButtonCancel?: boolean;
  width?: number;
  maskClosable?: boolean;
  closable?: boolean;
}
export function ModalConfirm(props: ModalConfirmPropsI) {
  const {
    visible = false,
    title = 'Thông báo',
    handleConfirm,
    handleThird,
    handleCancel,
    setVisible,
    children,
    textCancel = 'Hủy bỏ',
    disabledBtnCancel = false,
    textConfirm = 'Xác nhận',
    textThird = 'Từ chối',
    disabledBtnConfirm = false,
    disabledBtnThird = false,
    colorConfirm = 'primary',
    htmlTypeBtnConfirm = 'button',
    loadingBtnConfirm = false,
    loadingBtnThird = false,
    colorThird = 'danger',
    htmlTypeBtnThird = 'button',
    showButtonConfirm = true,
    showButtonThird = false,
    showButtonCancel = true,
    width = 600,
    maskClosable = true,
    closable = true,
  } = props;
  const confirm = () => {
    handleConfirm && handleConfirm();
  };
  const third = () => {
    handleThird && handleThird();
  };
  const handleCancelModal = () => {
    handleCancel && handleCancel();
    setVisible(false);
  };
  return (
    <Modal
      bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 300px)' }}
      visible={visible}
      title={<TitleUI text={title} />}
      // onOk={() => setVisible(false)}
      onCancel={() => handleCancelModal()}
      width={width}
      maskClosable={maskClosable}
      closable={closable}
      footer={[
        <Space>
          {showButtonCancel && (
            <ButtonUI
              key="cancel"
              color="danger"
              onClick={handleCancelModal}
              text={textCancel}
              disabled={disabledBtnCancel}
            />
          )}
          {showButtonThird && (
            <ButtonUI
              htmlType={htmlTypeBtnThird}
              key="submit"
              text={textThird}
              color={colorThird}
              onClick={third}
              disabled={disabledBtnThird}
              loading={loadingBtnThird}
            />
          )}
          {showButtonConfirm && (
            <ButtonUI
              htmlType={htmlTypeBtnConfirm}
              key="submit"
              text={textConfirm}
              color={colorConfirm}
              onClick={confirm}
              disabled={disabledBtnConfirm}
              loading={loadingBtnConfirm}
            />
          )}
        </Space>,
      ]}
    >
      {children}
    </Modal>
  );
}

// Usage
// const handleConfirm = () => {
//   form.submit();
// };

/* <ModalConfirm
  title="Thêm mới config loại nhân viên"
  visible={visible}
  setVisible={setVisible}
  handleConfirm={handleConfirm}
  handleCancel={handleCancel}
  loadingBtnConfirm={requestingConfirm}
  >
  <React.Fragment>
    <Form
      layout="inline"
      form={form}
      className="form-row-gap-1"
      onFinish={handleFinish}
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 17 }}
    >
      <FormItemSearchCompleteDepartment
        className="d-flex justify-content-space-between"
        name="departmentid"
      />
      <FormItemSearchCompletePosition className="d-flex justify-content-space-between" name="positionid" />
    </Form>
  </React.Fragment>
</ModalConfirm> */

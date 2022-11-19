import { Modal, Space } from 'antd';
import { ButtonUI, TitleUI } from '../general';

interface ModalDeletePropsI {
  visible: boolean;
  title?: string;
  handleConfirm?: () => void;
  setVisible: (value: boolean) => void;
  children?: JSX.Element;
  textCancel?: string;
  disabledBtnCancel?: boolean;
  textConfirm?: string;
  disabledBtnConfirm?: boolean;
  htmlTypeBtnConfirm?: 'button' | 'submit';
  loadingBtnConfirm?: boolean;
}
export function ModalDelete(props: ModalDeletePropsI) {
  const {
    visible = false,
    title = 'Thông báo',
    handleConfirm,
    setVisible,
    children= (<>Bạn có chắc chắn muốn xóa dữ liệu này ?</>),
    textCancel = 'Hủy bỏ',
    disabledBtnCancel = false,
    textConfirm = 'Xác nhận',
    disabledBtnConfirm = false,
    htmlTypeBtnConfirm = 'button',
    loadingBtnConfirm = false,
  } = props;
  const confirm = () => {
    handleConfirm && handleConfirm();
  };
  return (
    <Modal
      visible={visible}
      title={<TitleUI text={title} />}
      onOk={() => setVisible(false)}
      onCancel={() => setVisible(false)}
      footer={[
        <Space>
          <ButtonUI
            key="cancel"
            type="default"
            color="secondary"
            onClick={() => setVisible(false)}
            text={textCancel}
            disabled={disabledBtnCancel}
          />
          <ButtonUI
            htmlType={htmlTypeBtnConfirm}
            key="submit"
            color="danger"
            text={textConfirm}
            onClick={confirm}
            disabled={disabledBtnConfirm}
            loading={loadingBtnConfirm}
          />
        </Space>,
      ]}
    >
      {children}
    </Modal>
  );
}

// Usage
/* <ModalDelete
  visible={showModalDelete}
  setVisible={setShowModalDelete}
  handleConfirm={handleConfirmDelete}
  loadingBtnConfirm={requestingDelete}
/> */
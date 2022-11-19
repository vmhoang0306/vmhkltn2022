import { Alert } from 'antd';

interface AlertUIProps {
  message?: string | JSX.Element;
  description?: string | JSX.Element;
  type: 'info' | 'success' | 'warning' | 'error';
  showIcon?: boolean;
  closable?: boolean;
  banner?: boolean;
}

export function AlertUI(props: AlertUIProps): JSX.Element {
  const { message, description, type, showIcon = true, closable = false, banner = false } = props;

  return (
    <Alert
      message={message}
      description={description}
      type={type}
      showIcon={showIcon}
      closable={closable}
      banner={banner}
    />
  );
}

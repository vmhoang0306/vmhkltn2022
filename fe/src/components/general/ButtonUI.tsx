import { Button } from 'antd';

interface ButtonUIProps {
  color?: 'primary' | 'success' | 'warning' | 'secondary' | 'danger' | 'violet';
  htmlType?: 'button' | 'submit';
  className?: string;
  type?: 'primary' | 'dashed' | 'link' | 'text' | 'default';
  disabled?: boolean;
  loading?: boolean;
  text?: string;
  icon?: JSX.Element;
  shape?: 'default' | 'circle' | 'round';
  size?: 'large' | 'middle' | 'small';
  onClick?: () => void;
}

// Usage
// <ButtonUI text="chức năng"  /> -> For default button

//  <ButtonUI
//    color="warning"
//    text="Chỉnh sửa"
//    icon={<EditOutlined />}
//    onClick={() => handleEdit(record)}
//  />

export function ButtonUI(props: ButtonUIProps): JSX.Element {
  const {
    color = 'primary',
    htmlType = 'button',
    className = '',
    type = 'primary',
    disabled = false,
    loading = false,
    text = '',
    icon,
    shape = 'default',
    size = 'middle',
    onClick,
  } = props;
  return (
    <Button
      type={type}
      htmlType={htmlType}
      disabled={disabled || loading}
      loading={loading}
      icon={icon}
      shape={shape}
      onClick={onClick}
      className={`${disabled ? `btn-ui-${color}-hv-not-allowed` : ''}
        ${className} ${type === 'primary' && !disabled ? `btn-ui-${color}` : ''}
        
        ${type === 'dashed' && !disabled ? `btn-ui-dashed-${color}` : ''}
       ${type === 'default' && !disabled ? `btn-ui-default-${color}` : ''} 
       ${type === 'text' && !disabled ? `btn-ui-text-${color}` : ''}
     `}
      size={size}
    >
      {text}
    </Button>
  );
}

import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

export function LoadingIcon(): JSX.Element {
  const antIcon = <LoadingOutlined style={{ fontSize: 15 }} spin />;
  return <Spin indicator={antIcon} />;
}

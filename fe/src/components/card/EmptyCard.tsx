import { Typography } from 'antd';
import React from 'react';

interface EmptyCardProps {
  color?: 'primary' | 'warning' | 'success' | 'danger' | 'secondary';
  colorLinear?: boolean;
  title?: string;
  children: JSX.Element;
  isShadow?: boolean;
}

const { Title } = Typography;

function EmptyCard(props: EmptyCardProps) {
  const { color = 'primary', colorLinear = false, title = '', children, isShadow = true } = props;

  return (
    <div className={`card-empty ${isShadow && 'card-float-shadow-sm '}`}>
      <div className={`card-header ${colorLinear ? `bg-${color}-linear` : `bg-${color}`}`}>
        <Title className="mb-0 txt-white" level={3}>
          {title}
        </Title>
      </div>
      <div className="pt-3 px-3 pb-5"> {children}</div>
    </div>
  );
}

export default EmptyCard;

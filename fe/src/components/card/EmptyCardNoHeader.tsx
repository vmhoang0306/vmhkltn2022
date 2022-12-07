interface EmptyCardNoHeaderProps {
  isRadius?: boolean;
  isShadow?: boolean;
  children: JSX.Element;
  className?: string;
}

function EmptyCardNoHeader(props: EmptyCardNoHeaderProps) {
  const { isRadius, isShadow, children, className } = props;

  return (
    <div
      className={`${isShadow && 'card-float-shadow-sm'} ${
        isRadius ? 'card-empty' : 'card-noradius'
      } mb-1 p-2 ${className}`}
    >
      {children}
    </div>
  );
}

export default EmptyCardNoHeader;

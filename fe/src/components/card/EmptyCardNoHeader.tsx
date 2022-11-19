interface EmptyCardNoHeaderProps {
  isRadius?: boolean;
  isShadow?: boolean;
  children: JSX.Element;
}

function EmptyCardNoHeader(props: EmptyCardNoHeaderProps) {
  const { isRadius, isShadow, children } = props;

  return (
    <div
      className={`${isShadow && 'card-float-shadow-sm'} ${
        isRadius ? 'card-empty' : 'card-noradius'
      } mb-1 p-2`}
    >
      {children}
    </div>
  );
}

export default EmptyCardNoHeader;

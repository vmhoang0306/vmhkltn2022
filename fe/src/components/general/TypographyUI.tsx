import { Typography } from 'antd';

interface TitleUIProps {
  text: string | JSX.Element | undefined;
  level?: 1 | 2 | 3 | 4 | 5;
  className?: string;
  italic?: boolean;
  type?: 'default' | 'light' | 'danger' | 'secondary' | 'primary' | 'success' | 'warning';
  copyable?: boolean;
}

interface LinkUIProps {
  strong?: boolean;
  link: string;
  text?: string;
  target: '_blank' | '_self' | '_parent' | '_top';
  copyable?: boolean;
  style?: any;
}

interface TextUIProps {
  text: string;
  className?: string;
  italic?: boolean;
  strong?: boolean;
  underline?: boolean;
  style?: any;
  type?: 'default' | 'light' | 'danger' | 'secondary' | 'primary' | 'success' | 'warning';
  copyable?: boolean;
  onClick?: () => void;
  code?: boolean;
  keyboard?: boolean;
}

// Usage
// <TitleUI text="example" level={1}/>
export function TitleUI(props: TitleUIProps): JSX.Element {
  const {
    text,
    level = 5,
    className = '',
    italic = false,
    type = 'default',
    copyable = false,
  } = props;
  return (
    <Typography.Title
      level={level}
      className={`mb-0 ${className} txt-${type}`}
      italic={italic}
      copyable={copyable}
    >
      {text}
    </Typography.Title>
  );
}

// Usage
// <LinkUI
// link={`${newShortLink !== null ? newShortLink : ''}`}
// target="_blank"
// copyable
// />

export function LinkUI(props: LinkUIProps): JSX.Element {
  const { strong = false, text = '', link = '', target = '_blank', copyable = false, style } = props;
  return (
    <Typography.Link strong={strong} href={link} target={target} copyable={copyable} style={style}>
      {text.length > 0 ? text : link}
    </Typography.Link>
  );
}

// Usage
// <TextUI text="example" />

export function TextUI(props: TextUIProps): JSX.Element {
  const {
    text,
    className = '',
    italic = false,
    strong = false,
    underline = false,
    style,
    type = 'default',
    copyable = false,
    code = false,
    keyboard = false,
    onClick,
  } = props;
  return (
    <Typography.Text
      className={`${className} txt-${type}`}
      italic={italic}
      strong={strong}
      underline={underline}
      style={style}
      copyable={copyable}
      code={code}
      keyboard={keyboard}
      onClick={() => onClick && onClick()}
    >
      {text}
    </Typography.Text>
  );
}

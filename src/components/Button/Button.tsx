import classes from './Button.module.scss';
interface ButtonProps {
  icon?: string;
  onClick?: () => void;
}

const Button: React.FunctionComponent<ButtonProps> = (props) => {
  return (
    <button className={classes.button} onClick={props.onClick}>
      {props.children}
      {props.icon && <img src={props.icon} alt="Button icon" />}
    </button>
  );
};

export default Button;

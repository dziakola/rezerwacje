import styles from './ButtonTable.module.scss';
import Button from 'react-bootstrap/Button';

const ButtonTable = props => {
    return(
        <Button onClick={props.onClick} >
            {props.children}
        </Button>
    )
}

export default ButtonTable;
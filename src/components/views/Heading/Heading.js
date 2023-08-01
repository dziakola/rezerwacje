import styles from './Heading.module.scss';

const Heading = props => {
    return(
        <div className={styles.main}>
            {props.children}
        </div>
    )
}

export default Heading;
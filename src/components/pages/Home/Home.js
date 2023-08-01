import styles from './Home.module.scss';
import { Container, Row } from 'react-bootstrap';
import Heading from '../../views/Heading/Heading';
import TableList from '../../features/TableList/TableList';
import TableAdd from '../../features/TableAdd/TableAdd';

const Home = () => {
    return(
        <Container>
            <Row className="mb-3 mt-3 justify-content-md-center text-center" >
                <Heading>ALL TABLES</Heading>
            </Row>
            <Row className="justify-content-md-center" >
                <TableList />
            </Row>
            <Row className='mb-3 mt-3 justify-content-md-end'>
                <TableAdd>ADD TABLE</TableAdd>
            </Row>
        </Container>
    )
}

export default Home;
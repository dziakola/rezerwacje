import Header from '../../views/Header/Header'
import Heading from '../../views/Heading/Heading';
import styles from './Table.module.scss';
import { useParams } from 'react-router';
import TableForm from '../../features/TableForm/TableForm';
import { Col, Container, Row } from 'react-bootstrap';
import { getAllTables } from '../../../redux/tablesRedux';
import { useSelector } from 'react-redux';

const Table = () => {
    const { tableId } = useParams();
    const tables = useSelector(getAllTables);
    return(
        <Container>
            {tables.filter(table=>table.id==tableId).map(table=>
            <Row key={table.id} className='mb-3 mt-3'>
                <Heading>{`Table ${table.id}`}</Heading>
                <Col md={4}>
                    <TableForm 
                    tableId={table.id} 
                    status={table.status} 
                    peopleAmount={table.peopleAmount} 
                    maxPeopleAmount={table.maxPeopleAmount} 
                    bill={table.bill}/>    
                </Col>
            </Row>
            )}
        </Container>
    )
}

export default Table;
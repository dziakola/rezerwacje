import styles from './TableAdd.module.scss';
import ButtonTable from '../../common/ButtonTable/ButtonTable';
import { Row, Col } from 'react-bootstrap';
import { addTableRequest } from '../../../redux/tablesRedux';
import { useDispatch } from 'react-redux';
import { getAllTables } from '../../../redux/tablesRedux';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
const TableAdd = props => {
    const id = useSelector(getAllTables).map(table=>table.id);
    const newId = id[id.length-1] + 1;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = e => {
        e.preventDefault();
        dispatch(addTableRequest({id:newId, status: 'Free', peopleAmount: 0, maxPeopleAmount: 4, bill:0 }))
        navigate("/");
    }
    
    return(
        <Row className='justify-content-end'>
            <Col md={4} ><ButtonTable onClick={handleSubmit}>{props.children}</ButtonTable></Col>
        </Row>
    )
}

export default TableAdd;
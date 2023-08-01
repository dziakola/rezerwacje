import styles from './TableForm.module.scss';
import Form from 'react-bootstrap/Form';
import { getAllTables } from '../../../redux/tablesRedux';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ButtonTable from '../../common/ButtonTable/ButtonTable';
import { changeTableRequest } from '../../../redux/tablesRedux';
import { useState,useEffect } from 'react';

const TableForm =(props) => {
    const id = props.tableId;
    const dispatch = useDispatch();
    const [status, setStatus] = useState(props.status);
    const [peopleAmount, setPeople] = useState(props.peopleAmount);
    const [maxPeopleAmount, setmaxPeople] = useState(props.maxPeopleAmount);
    const [bill, setBill] = useState(props.bill);
    /* const tables = useSelector(getAllTables);
    const list = {id,status,peopleAmount,maxPeopleAmount,bill};
    console.log(list.id)
     */
    useEffect(() => {
    if (status !== 'Busy') {
      setBill(0);
    } else if (status === 'Reserved') {
      // setPeopleAmount(0);
      // setMaxPeopleAmount(10);
      setBill(0);
      setStatus(status);
    } else if (status === 'Free' || status === 'Cleaning') {
      setPeople(0);
    }
  }, [status, bill]);

  useEffect(() => {
    if (maxPeopleAmount > 10) {
      alert('Max People 10');
      setmaxPeople(10);
    } else if (peopleAmount > 10) {
      setPeople(10);
    } else if (maxPeopleAmount < 0) {
      setmaxPeople(0);
    } else if (peopleAmount < 0) {
      setPeople(0);
    } else if (peopleAmount > maxPeopleAmount) {
      alert('WARNING!!! People cannot be higher than MaxPeople ');
      setPeople(maxPeopleAmount);
    }
  }, [maxPeopleAmount, peopleAmount]);

    const handleSubmit = event =>{
      event.preventDefault();
      dispatch(changeTableRequest({id,status,peopleAmount,maxPeopleAmount,bill}))
    }
    return (
    <Container>
        <Form>
          <Form.Group>
            <p>
            Status:
            <Form.Select key={id} aria-label="Select status" value={status} name="status" onChange={e => setStatus(e.target.value)}>
              <option defaultValue={status}>{`${status}`}</option>
              <option value="Busy">Busy</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Reserved">Reserved</option>
            </Form.Select>
            </p>
            <p>
            People:
            <Form.Control className={styles.input} value={peopleAmount} onChange={e => setPeople(e.target.value)}></Form.Control> 
            / 
            <Form.Control value={maxPeopleAmount} onChange={e => setmaxPeople(e.target.value)}></Form.Control>
            </p>
            <p>
            Bill ($): 
            <Form.Control className={styles.input} value={bill} onChange={e => setBill(e.target.value)}></Form.Control>
            </p>
            <p>
            <ButtonTable onClick={handleSubmit}>SAVE</ButtonTable>
            </p>
          </Form.Group>
        </Form>
    </Container>
    );
}

export default TableForm;
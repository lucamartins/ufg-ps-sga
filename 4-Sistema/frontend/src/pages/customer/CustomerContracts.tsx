import React, { useEffect, useState } from 'react';
import { Card, ListGroup, ListGroupItem, Container, Row, Col } from 'react-bootstrap';
import { useAppContext } from '../../context';
import { IMembership } from '../../types';
import { v4 as uuidv4 } from 'uuid';

export const CustomerContracts = () => {
  const { plans, modalities, customerMemberships, userAuth, getModalities, getPlans, getCustomerMemberships } = useAppContext();
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    (async () => {
      userAuth && (await Promise.all([getPlans(), getModalities(), getCustomerMemberships(userAuth.id)]));
      setIsFetched(true);
    })();
  }, [userAuth]);

  // const checkCustomerHasPlan = (planId: string): boolean => !!customerMemberships.find((membership) => membership.planId === planId);

  const cardMembership = (membership: IMembership) => {
    // console.log(plans);
    // console.log(modalities);
    // console.log(membership);

    const plan = plans.find((plan) => plan._id === membership.planId);
    const modality = modalities.find((modality) => modality._id === plan.modality);

    // console.log(plan);

    // const modality = modalities.find((modality) => modality._id === plan.modality);

    // return null;

    return (
      <Card style={{ width: '30rem' }}>
        <Card.Body>
          <Card.Title style={{ fontSize: '1.75rem' }}>{plan.name}</Card.Title>
        </Card.Body>
        <ListGroup className='list-group-flush' style={{ backgroundColor: 'transparent' }}>
          <ListGroupItem>{modality.name}</ListGroupItem>
          <ListGroupItem>{plan.numberLessonsWeek} aulas semanais</ListGroupItem>
          <ListGroupItem style={{ color: '#bb86fc' }}>Data início: {new Date(membership.startDate).toLocaleDateString('pt-BR')}</ListGroupItem>
          <ListGroupItem style={{ color: '#29e7cd' }}>Data fim: {new Date(membership.endDate).toLocaleDateString('pt-BR')}</ListGroupItem>
          <ListGroupItem>Mensalidade: R${plan.monthPrice}</ListGroupItem>
        </ListGroup>
      </Card>
    );
  };

  if (!isFetched) return null;

  return (
    <Container className='d-flex flex-column gap-4'>
      {/* Title */}
      <Row>
        <div style={{ fontSize: '2.6rem' }}>Meus Contratos</div>
      </Row>

      {/* Cards */}
      <Row xl='3' className='g-5'>
        {customerMemberships.map((membership) => (
          <Col key={uuidv4()}>{cardMembership(membership)}</Col>
        ))}
      </Row>
    </Container>
  );
};

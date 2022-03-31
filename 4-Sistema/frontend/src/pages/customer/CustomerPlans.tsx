import React, { useEffect, useState } from 'react';
import { Card, ListGroup, ListGroupItem, Button, Container, Row, Col, Badge } from 'react-bootstrap';
import { useAppContext } from '../../context';
import { IPlan } from '../../types';
import { v4 as uuidv4 } from 'uuid';

export const CustomerPlans = () => {
  const { plans, getPlans, modalities, getModalities, getCustomerMemberships, customerMemberships, userAuth, createCustomerMembership } = useAppContext();
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    (async () => {
      userAuth && (await Promise.all([getPlans(), getModalities(), getCustomerMemberships(userAuth.id)]));
      setIsFetched(true);
    })();
  }, [userAuth]);

  const checkCustomerHasPlan = (planId: string): boolean => !!customerMemberships.find((membership) => membership.planId === planId);

  const cardPlan = (plan: IPlan) => (
    <Card style={{ width: '30rem' }}>
      {/* <Card.Img variant='top' src='holder.js/100px180?text=Image cap' /> */}
      <Card.Body>
        <Card.Title style={{ fontSize: '1.75rem' }}>{plan.name}</Card.Title>
      </Card.Body>
      <ListGroup className='list-group-flush' style={{ backgroundColor: 'transparent' }}>
        <ListGroupItem>{modalities.find((modality) => modality._id === plan.modality).name}</ListGroupItem>
        <ListGroupItem>{plan.numberLessonsWeek} aulas semanais</ListGroupItem>
        <ListGroupItem>
          Duração: {plan.monthDuration} {`${plan.monthDuration}` === '1' ? 'mês' : 'meses'}
        </ListGroupItem>
        <ListGroupItem>Mensalidade: R${plan.monthPrice}</ListGroupItem>
      </ListGroup>
      <Card.Body className='d-flex justify-content-between'>
        <div className='d-flex align-self-center'>
          {checkCustomerHasPlan(plan._id) ? (
            <Badge pill bg='success'>
              Possui ativo
            </Badge>
          ) : (
            <Badge pill bg='dark'>
              Não possui
            </Badge>
          )}
        </div>

        <Button size='lg' onClick={() => createCustomerMembership(userAuth.id, plan._id)}>
          Adquirir
        </Button>
      </Card.Body>
    </Card>
  );

  if (!isFetched) return null;

  return (
    <Container className='d-flex flex-column gap-4'>
      {/* Title */}
      <Row>
        <div style={{ fontSize: '2.6rem' }}>Planos</div>
      </Row>

      {/* Cards */}
      <Row xl='3' className='g-5'>
        {plans.map((plan) => (
          <Col key={uuidv4()}>{cardPlan(plan)}</Col>
        ))}
      </Row>
    </Container>
  );
};

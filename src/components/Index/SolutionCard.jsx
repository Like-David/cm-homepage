import React from 'react';
import { Card } from 'react-bootstrap';

function SolutionCard({ solution, inView, fref }) {
    return (
        <Card ref={fref} className={`h-100 shadow-sm solution-card ${inView ? 'animate-in' : ''}`}>
            <Card.Img variant="top" src={solution.image} alt={solution.name} className="solution-card-img" />
            <Card.Body className="d-flex flex-column">
                <Card.Title as="h5" className="fw-bold">{solution.name}</Card.Title>
                <Card.Text className="mt-auto">
                    <strong>용도:</strong> {solution.use}<br />
                    <strong>모델명:</strong> {solution.model}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default SolutionCard;

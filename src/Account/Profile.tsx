import { Button, Card, Col, Row, Tab, Tabs } from "react-bootstrap";

export default function Profile() {
    return (
        <div className="profile">
            <Row>
                <Col>
                    <h1>Hi, username!</h1>
                    <p>Bio</p>
                    <p>Personal Info LOL (only if they're logged in ofc ofc)</p>
                </Col>
                <Col>
                    <Tabs
                        defaultActiveKey="home"
                        transition={false}
                        className="mb-3"
                    >
                        <Tab eventKey="home" title="Following">
                            Insert list of usernames
                        </Tab>
                        <Tab eventKey="profile" title="Followers">
                            Insert list of usernames
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
            <Row>
                <h2>Saved Drinks:</h2>
                <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>Drink Name</Card.Title>
                    <Card.Text>
                        Drink Ingredients
                    </Card.Text>
                    <Button variant="primary">See Recipe</Button>
                </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>Drink Name</Card.Title>
                    <Card.Text>
                        Drink Ingredients
                    </Card.Text>
                    <Button variant="primary">See Recipe</Button>
                </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>Drink Name</Card.Title>
                    <Card.Text>
                        Drink Ingredients
                    </Card.Text>
                    <Button variant="primary">See Recipe</Button>
                </Card.Body>
            </Card>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>Drink Name</Card.Title>
                    <Card.Text>
                        Drink Ingredients
                    </Card.Text>
                    <Button variant="primary">See Recipe</Button>
                </Card.Body>
            </Card>
            </Row>
        </div>
    )
}
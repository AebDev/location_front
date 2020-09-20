import React, { useState, useEffect } from 'react'
import { Button, Form, Grid, Header, Segment, Accordion, Menu, Rail, Sticky, Ref } from "semantic-ui-react";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios'

const ColorForm = (
    <Form>
        <Form.Group grouped>
            <Form.Checkbox label='Red' name='color' value='red' />
            <Form.Checkbox label='Orange' name='color' value='orange' />
            <Form.Checkbox label='Green' name='color' value='green' />
            <Form.Checkbox label='Blue' name='color' value='blue' />
        </Form.Group>
    </Form>
)

const MarqueForm = (
    <Form>
        <Form.Group grouped>
            <Form.Checkbox label='renault' name='size' type='radio' value='small' />
            <Form.Checkbox label='pegeaut' name='size' type='radio' value='medium' />
            <Form.Checkbox label='volvo' name='size' type='radio' value='large' />
            <Form.Checkbox label='nessan' name='size' type='radio' value='x-large' />
        </Form.Group>
    </Form>
)

function FilterCars(props) {

    const [activeIndex, setActiveIndex] = useState(0);
    const [listCategory, setListCategory] = useState([]);
    
    const handleClick = (e, titleProps) => {
        const newIndex = activeIndex === titleProps.index ? -1 : titleProps.index
        setActiveIndex(newIndex);
    }

    useEffect(() => {
        async function fetchData() {
            const result = await axios.get("http://127.0.0.1:8000/api/categorie/");
            setListCategory(result.data.data);
        }
        fetchData();

    }, []);

    const onCheckHandle = (e,data) =>{
        
        props.filterCarHandle(data);
    }


    return (
        <Grid.Column width={4} >

            <Form >
                <Segment inverted color='teal'>
                    <Header as="h3" textAlign="center">
                        Categories
                    </Header>
                </Segment>
                <Segment textAlign="left" >
                    <Form.Group grouped>
                        {listCategory.map((categorie) => (
                            <Form.Checkbox label={`${categorie.nom_categorie}`} name='categorie' value={`${categorie.nom_categorie}`} onClick={onCheckHandle} />
                        ))}

                    </Form.Group>
                </Segment>
                <Segment inverted color='teal'>
                    <Header as="h3" textAlign="center">
                        Marque
                    </Header>
                </Segment>
                <Segment textAlign="left" >
                    <Form.Group grouped>
                        <Form.Group grouped>
                            <Form.Checkbox label='renault' name='marque' value='renault' onClick={onCheckHandle}/>
                            <Form.Checkbox label='pegeaut' name='marque' value='pegeaut' onClick={onCheckHandle}/>
                            <Form.Checkbox label='volvo' name='marque' value='volvo' onClick={onCheckHandle}/>
                            <Form.Checkbox label='nessan' name='marque' value='nessan' onClick={onCheckHandle}/>
                        </Form.Group>

                    </Form.Group>
                </Segment>
                {/* <Segment stacked textAlign="left" >
                    <Accordion as={Menu} vertical size="huge" style={{ width: "100vh"}}>
                        <Menu.Item>
                            <Accordion.Title
                                active
                                content={<Header color='teal'>Categorie</Header>}
                                index={0}
                                onClick={handleClick}
                            />
                            <Accordion.Content active={activeIndex === 0} content={
                                <Form>
                                <Form.Group grouped>
                                    {listCategory.map((categorie)=>(
                                        <Form.Checkbox label={`${categorie.nom_categorie}`} name='color' value={`${categorie.nom_categorie}`} />
                                    ))}
                                    
                                </Form.Group>
                            </Form>
                            } />
                        </Menu.Item>
                        <Menu.Item>
                            <Accordion.Title
                                active
                                content={<Header color='teal'>Marque</Header>}
                                index={1}
                                onClick={handleClick}
                            />
                            <Accordion.Content active={activeIndex === 1} content={MarqueForm}  />
                        </Menu.Item>
                        
                    </Accordion>
                </Segment> */}
            </Form>


        </Grid.Column>
    )
}

export default FilterCars

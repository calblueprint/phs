import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import supabase from '@/supabase/client';




function DisplayCard(props) {
    const {display} = props;
    
  const [editing, setEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [coordinates, setCoordinates] = useState<string>("");
  const [updated_at, setUpdated_at] = useState<string>("");
  const [created_at, setCreated_at] = useState<string>("");
  

	

  // async function updateDisplay() {
	 //  console.log("hello");
  //   try {
  //     const { data, error } = await supabase
  //       .from('bp-testing') 
  //       .update({
  //           title: name,
  //           description: description,
  //           coordinates: coordinates,
  //           updated: updated_at,
  //           created: created_at
  //       })
  //       .eq('id', display.id);
  
  //     if (error) {
  //       throw error;
  //     }
  //   } catch (error: any) {
  //     alert(error.message);
  //   }
  // }
	async function updateDisplay() {
  try {
    const { data, error } = await supabase
      .from('bp-testing')
      .update({
        title: name,
        description: description,
        coordinates: coordinates,
        updated: updated_at,
        created: created_at,
      })
      .eq('id', display.id);

    if (error) {
      throw error;
    }

    // Update the component's state with the new values received from the database
    setName(display.title);
    setDescription(display.description);
    setCoordinates(display.coordinates);
    setUpdated_at(display.updated);
    setCreated_at(display.created);

    // Exit editing mode
    setEditing(false);
  } catch (error: any) {
    alert(error.message);
  }
}


  async function deleteDisplay() {
    try {
      const { data, error } = await supabase
        .from('bp-testing') 
        .delete()
        .eq('id', display.id);
  
      if (error) {
        throw error;
      }
      window.location.reload();
    } catch (error: any) {
      alert(error.message);
    }
  }
  
  

  const switchGar = () => {
    console.log("is this working");
    setEditing(true);

  };
  console.log("bro")


  return (
    <Card style={{ width: '30rem' }}>
      <Card.Body>
        {!editing ? (
          <>
            <Card.Title>{display.title}</Card.Title>
            <Card.Title>{display.description}</Card.Title>
            <Card.Title>{display.coordinates}</Card.Title>
            <Card.Title>{display.updated_at}</Card.Title>
            <Card.Title>{display.created_at}</Card.Title>
            {/* <Button variant="danger">Delete Product</Button> */}
            {/* <Button variant="secondary" onClick={switchGar}> */}
            {/* <button onClick={()=> setEditing(true)}>editproduct</button> */}
            <Button variant="danger" onClick={() => deleteDisplay()}>Delete Product</Button>
            <Button variant="secondary" onClick={switchGar}>Edit Product</Button>
          </>
        ) : (
            <>
            <h4>Editing Product</h4>
            <Button size="sm" onClick={() => setEditing(false)}>Go Back</Button>
            <br />
            <Form.Label>Display Name</Form.Label>
            <Form.Control
            type="text"
            id="name"
            defaultValue={display.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            />
            <Form.Label>Display Description</Form.Label>
            <Form.Control
            type="text"
            id="description"
            defaultValue={display.description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDescription(e.target.value)}
            />
            <Form.Label>Display Coordinates</Form.Label>
            <Form.Control
            type="text"
            id="coordinates"
            defaultValue={display.coordinates}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCoordinates(e.target.value)}
            />
            <Form.Label>Display Updated</Form.Label>
            <Form.Control
            type="text"
            id="updates"
            defaultValue={display.updated_at}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUpdated_at(e.target.value)}
            />
            <Form.Label>Display Creation</Form.Label>
            <Form.Control
            type="text"
            id="creation"
            defaultValue={display.created_at}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCreated_at(e.target.value)}
            />
            
            <br />
            <Button onClick={() => updateDisplay()}>Update Display</Button>

            </>
        )}
      </Card.Body>
    </Card>
  );
}

export default DisplayCard;

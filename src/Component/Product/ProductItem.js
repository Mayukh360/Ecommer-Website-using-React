import React, { Fragment,useState } from "react";
import { Button, Col, Container, Row,Alert } from "react-bootstrap";
import axios from "axios";
import { json, useNavigate } from "react-router-dom";


const productsArr = [
  
  {
    title: "Shirt",
    price: 100,
    imageUrl:
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHNoaXJ0fGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    amount: 1,
  },
 

  {
    title: "Jacket",
    price: 100,
    imageUrl:
      "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1634645738-200964205-1-stone.jpg?crop=1.00xw:0.785xh;0,0.0443xh&resize=980:*",
    amount: 1,
  },
  
  
];

export default function ProductItem() {
  const [showAlert, setShowAlert] = useState(false);
   const [alertMessage, setAlertMessage] = useState("");
   const navigate=useNavigate()

  const enteredEmail = localStorage.getItem("email");
  const changedemail = enteredEmail.replace("@", "").replace(".", "");

  async function btnClickHandler(item) {

  //  await axios.post(
  //     `https://crudcrud.com/api/58289aeebc5542b9b67da0ff1ce0ab14/${changedemail}`,
  //     item
  //   );
    await fetch(`https://e-commerce-2-ad090-default-rtdb.firebaseio.com//user/${changedemail}.json`,{
      method:'POST',
      body: JSON.stringify(item),
      headers:{"Content-Type": "application/json"}
    }) /// complete the code using fire base
    //Custom alert "Item added to cart"
    
    setAlertMessage(`${item.title} added to cart`);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  }
  const navigateHandler=()=>{
    navigate('/womensclothing')
  }
  return (
    <Fragment>
      <Container style={{marginBottom:"1rem", marginTop:"1rem"}}>
      {showAlert && (
          <Alert variant="info" onClose={() => setShowAlert(false)} dismissible>
            {alertMessage}
          </Alert>
        )}
        <Row>
          {productsArr.map((item) => (
            <Col key={item.title} xs={12} md={6} lg={3}>
              <div>
                <h3>{item.title}</h3>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  style={{ height: "200px", width: "200px" }}
                />
                <div>
                  <p>
                    {" "}
                    Price: {item.price} Quantity: {item.amount}
                  </p>
                  <Button
                    onClick={() => btnClickHandler(item)}
                    variant="success"
                  >
                    Add To Cart
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
       <span>1</span> <button onClick={navigateHandler}>Next</button>
      
      </Container>
     
    </Fragment>
  );
}

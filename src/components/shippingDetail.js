import React from "react";
import { Button, Container, Row } from "reactstrap";
import styled from "styled-components";

const BorderContainer = styled(Container)`
  display: block;
  margin: 10px 0 20px 0;
  max-width: 500px;
  padding: 10px 14px;
  font-size: 1em;
  box-shadow: rgba(50, 50, 93, 0.14902) 0px 1px 3px,
    rgba(0, 0, 0, 0.0196078) 0px 1px 0px;
  border: 0;
  outline: 0;
  border-radius: 4px;
  background: white;
`;

const ShippingDetail = ({ userData, cartData, backToForm }) => {
  const { items } = cartData;
  return (
    <BorderContainer>
      <h3>Info</h3>
      <p>Name: {userData.fullName}</p>
      <p>Email: {userData.email}</p>
      <p>Telephone: {userData.telephone}</p>
      <p>address1: {userData.address1}</p>
      <p>address2: {userData.address2}</p>
      <p>post code: {userData.postcode}</p>
      <p>city: {userData.city}</p>
      <p>country: {userData.country}</p>
      <br />
      <h3>Items</h3>
      {items.map(item => (
        <p key={item.id}>
          {item.name} : {item.quantity} x ${item.price}/unit
        </p>
      ))}
      <p>total: {cartData.total}</p>
      <Button onClick={backToForm}>Back</Button>
    </BorderContainer>
  );
};

export default ShippingDetail;

import React from "react";
import StyledBtn from "./styled-components/styledBtn";
import BorderContainer from "./styled-components/borderContainer";

const ShippingDetail = ({ userData, cartData, backToForm, paying }) => {
  const { items } = cartData;
  return (
    <BorderContainer>
      <h2>Info</h2>
      <p>Name: {userData.fullName}</p>
      <p>Email: {userData.email}</p>
      <p>Telephone: {userData.telephone}</p>
      <p>address1: {userData.address1}</p>
      <p>address2: {userData.address2}</p>
      <p>post code: {userData.postcode}</p>
      <p>city: {userData.city}</p>
      <p>country: {userData.country}</p>
      <br />
      <h2>Items</h2>
      {items.map(item => (
        <p key={item.id}>
          {item.name} : {item.quantity} x ${item.price}/unit
        </p>
      ))}
      <br />
      <h2>Total: $ {cartData.total}</h2>
      {paying ? "" : <StyledBtn onClick={backToForm}>Back</StyledBtn>}
    </BorderContainer>
  );
};

export default ShippingDetail;

import { Spinner, Container } from "reactstrap";
import React, { Component } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe
} from "react-stripe-elements";
import apolloClient from "../utils/apolloClient";
import randomstring from "randomstring";
import gql from "graphql-tag";
import alertify from "alertifyjs";
import client from "../utils/apolloClient";
import { StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import styled from "styled-components";

alertify.defaults.transition = "slide";
alertify.defaults.theme.ok = "btn btn-primary";
alertify.defaults.theme.cancel = "btn btn-danger";
alertify.defaults.theme.input = "form-control";

const createOrder = gql`
  mutation createOrder(
    $tokenId: String!
    $orderId: String!
    $productIds: [String]!
    $fullName: String!
    $address1: String!
    $address2: String
    $city: String!
    $state: String!
    $postcode: String!
    $country: String!
    $email: String!
    $telephone: String!
  ) {
    createOrder(
      tokenId: $tokenId
      orderId: $orderId
      productIds: $productIds
      customerName: $fullName
      customerAddress1: $address1
      customerAddress2: $address2
      customerCity: $city
      customerState: $state
      customerPostcode: $postcode
      customerCountry: $country
      customerEmail: $email
      customerTelephone: $telephone
    ) {
      id
      orderId
    }
  }
`;

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

const createOptions = (fontSize, padding) => {
  return {
    style: {
      base: {
        fontSize,
        color: "#424770",
        letterSpacing: "0.025em",
        fontFamily: "Source Code Pro, monospace",
        "::placeholder": {
          color: "#aab7c4"
        },
        ...(padding ? { padding } : {})
      },
      invalid: {
        color: "#9e2146"
      }
    }
  };
};

class PaymentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false,
      error: false,
      errorMsg: "",
      loading: false
    };
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = change => {
    if (change.error !== undefined) {
      console.log("error ", change.error);
      this.setState({
        error: true,
        errorMsg: change.error.code
      });
    }
  };

  async submit(ev) {
    ev.preventDefault();
    const { userData, cartData } = this.props;
    const productIds = cartData.items.map(item => item.id);
    const orderId = randomstring.generate(6).toUpperCase();
    const user = userData !== null ? userData : {};

    let { token, error } = await this.props.stripe.createToken({
      name: user.fullName,
      address_city: user.city,
      address_country: user.country,
      address_line1: user.address1,
      address_line2: user.address2,
      address_state: user.state,
      address_zip: user.postcode
    });

    if (error === undefined && token) {
      this.props.handlePayBtn(true);
      this.setState({
        loading: true
      });
      apolloClient
        .mutate({
          mutation: createOrder,
          variables: {
            tokenId: token.id,
            orderId,
            productIds,
            ...user
          }
        })
        .then(result => {
          if (result.data.createOrder === null) {
            alertify.alert(
              "Payment Fail - Create Order Fail",
              "Please try again"
            );
            setTimeout(() => {
              this.setState({
                error: true,
                errorMsg: "payment failed - create order failed",
                loading: false
              });
              this.props.handlePayBtn(false);
            }, 500);
          } else {
            // clear local storage
            client.resetStore();
            setTimeout(() => this.props.handlePayment({ orderId }), 250);
          }
        })
        .catch(() => {
          alertify.alert("Payment Fail", "Please try again");
          setTimeout(() => {
            this.setState({
              error: true,
              errorMsg: "payment failed",
              loading: false
            });
            this.props.handlePayBtn(false);
          }, 500);
        });
    } else {
      console.log("error ", error);
    }
  }
  render() {
    if (this.state.loading) {
      return (
        <Container className="text-center">
          <Spinner
            className="mb-4"
            color="primary"
            style={{ width: "5rem", height: "5rem" }}
          />
          <p>processing</p>
          <p>please don't refresh or exit the page</p>
        </Container>
      );
    }
    return (
      <BorderContainer>
        <span>
          <h2>Payment Details</h2>
          <StaticQuery
            query={graphql`
              query {
                placeholderImage: file(
                  relativePath: { eq: "payment-strip.png" }
                ) {
                  childImageSharp {
                    fluid(maxWidth: 1440) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            `}
            render={data => (
              <Img
                fluid={data.placeholderImage.childImageSharp.fluid}
                style={{
                  width: "150px",
                  marginBottom: "0.75rem"
                }}
              />
            )}
          />
        </span>

        <form onSubmit={this.submit}>
          <label style={{ width: "100%" }}>
            Card number
            <CardNumberElement
              onChange={this.handleChange}
              {...createOptions(this.props.fontSize)}
            />
          </label>
          <label style={{ width: "100%" }}>
            Expiration date
            <CardExpiryElement
              onChange={this.handleChange}
              {...createOptions(this.props.fontSize)}
            />
          </label>
          <label style={{ width: "100%" }}>
            CVC
            <CardCVCElement
              onChange={this.handleChange}
              {...createOptions(this.props.fontSize)}
            />
          </label>
          <button className="StyledBtn">Pay</button>
          {this.state.errorMsg !== "" ? (
            <p style={{ color: "red" }}>{this.state.errorMsg}</p>
          ) : (
            ""
          )}
        </form>
      </BorderContainer>
    );
  }
}

export default injectStripe(PaymentForm);

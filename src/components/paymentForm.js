import { Button, Spinner } from "reactstrap";
// import CheckoutBtn from "./checkoutBtn";
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

const handleBlur = () => {
  console.log("[blur]");
};
const handleFocus = () => {
  console.log("[focus]");
};
const handleReady = () => {
  console.log("[ready]");
};
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
            // alertify.alert("Payment failed, please try again.");
            console.log("order result", result);
          } else {
            // clear local storage
            console.log("result else", result);
            client.resetStore();
            // localStorage.removeItem("apollo-cache-persist");
            // global.window.localStorage.removeItem("apollo-cache-persist");
            setTimeout(() => this.props.handlePayment({ orderId }), 250);
          }
        })
        .catch(() => {
          console.log("Payment failed, please try again. order result");
          // alertify.alert("Payment failed, please try again.");
        });
    } else {
      console.log("error ", error);
    }
  }
  render() {
    // if (this.state.complete && this.state.loading === false) return <h1>Purchase Complete</h1>;
    if (this.state.loading) {
      return (
        <>
          <Spinner color="primary" />
          <div>loading</div>
        </>
      );
    }
    return (
      <form onSubmit={this.submit}>
        <label style={{ width: "100%" }}>
          Card number
          <CardNumberElement
            onBlur={handleBlur}
            onChange={this.handleChange}
            onFocus={handleFocus}
            onReady={handleReady}
            {...createOptions(this.props.fontSize)}
          />
        </label>
        <label style={{ width: "100%" }}>
          Expiration date
          <CardExpiryElement
            onBlur={handleBlur}
            onChange={this.handleChange}
            onFocus={handleFocus}
            onReady={handleReady}
            {...createOptions(this.props.fontSize)}
          />
        </label>
        <label style={{ width: "100%" }}>
          CVC
          <CardCVCElement
            onBlur={handleBlur}
            onChange={this.handleChange}
            onFocus={handleFocus}
            onReady={handleReady}
            {...createOptions(this.props.fontSize)}
          />
        </label>
        <Button>Pay</Button>
        {this.state.errorMsg !== "" ? (
          <p style={{ color: "red" }}>{this.state.errorMsg}</p>
        ) : (
          ""
        )}
      </form>
    );
  }
}

export default injectStripe(PaymentForm);

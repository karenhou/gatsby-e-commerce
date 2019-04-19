import React, { Component } from "react";
import { Link } from "@reach/router";
import { Container, Row, Col, Button } from "reactstrap";
import { Elements, StripeProvider } from "react-stripe-elements";
import { animated } from "react-spring";
import { Spring } from "react-spring/renderprops";

import OrderForm from "../components/orderForm";
import SEO from "../components/seo";
import Layout from "../components/layout";
import CartItem from "../components/cartItem";
import PaymentForm from "../components/paymentForm";
import CheckoutProgress from "../components/checkoutProgress";
import ShippingDetail from "../components/shippingDetail";
import CartHeader from "../components/cartHeader";

const StripeKey = process.env.CONTENTFUL_PK_KEY;

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStep: 1,
      cartData: null,
      userData: "",
      paymentData: null,
      paying: false,
      checkingOut: false
    };
  }

  render() {
    const {
      activeStep,
      paymentData,
      userData,
      cartData,
      paying,
      checkingOut
    } = this.state;
    console.log("current cartdata ", cartData);
    return (
      <Layout>
        <SEO title="Checkout" />
        <Container className="mt-4">
          {checkingOut ? (
            <Container>
              <Spring
                native
                from={{ opacity: 0 }}
                to={{
                  opacity: activeStep !== 1 ? 1 : 0
                }}>
                {styles => (
                  <animated.div style={styles}>
                    <CheckoutProgress activeStep={activeStep} />
                  </animated.div>
                )}
              </Spring>

              {/* {activeStep === 1 && (
                <Spring
                  from={{ opacity: 0, transform: "translate3d(100%,0,0)" }}
                  to={{ opacity: 1, transform: "translate3d(0%,0,0)" }}>
                  {stylesProps => (
                    <animated.div style={stylesProps}>
                      <CartItem
                        readOnly={false}
                        showCheckoutBtn={activeStep === 1}
                        handlePayment={data =>
                          this.setState({ activeStep: 2, cartData: data })
                        }
                      />
                    </animated.div>
                  )}
                </Spring>
              )} */}
              <Row>
                {activeStep === 1 && (
                  <>
                    <Col xs={6}>
                      <CartItem
                        readOnly={true}
                        handlePayment={data =>
                          this.setState({ cartData: data })
                        }
                      />
                    </Col>
                    <Col xs={6}>
                      <OrderForm
                        cartData={cartData}
                        userData={userData}
                        handlePayment={data =>
                          this.setState({ activeStep: 2, userData: data })
                        }
                      />
                    </Col>
                  </>
                )}
                {activeStep === 2 && (
                  <>
                    <Col xs={6}>
                      <ShippingDetail
                        cartData={cartData}
                        userData={userData}
                        paying={paying}
                        backToForm={() => this.setState({ activeStep: 1 })}
                      />
                    </Col>
                    <Col xs={6}>
                      <StripeProvider apiKey={StripeKey}>
                        <Elements>
                          <PaymentForm
                            cartData={cartData}
                            userData={userData}
                            handlePayBtn={data =>
                              this.setState({ paying: data })
                            }
                            handlePayment={data =>
                              this.setState({
                                activeStep: 3,
                                paymentData: data,
                                paying: !paying
                              })
                            }
                          />
                        </Elements>
                      </StripeProvider>
                    </Col>
                  </>
                )}
                {activeStep === 3 && (
                  <Col style={{ textAlign: "center" }}>
                    <h1>payment complete</h1>
                    <h1>orderID: {paymentData.orderId}</h1>
                    <h3>Please check your email for your order</h3>
                    <Button style={{ background: "#84bec9", border: "none" }}>
                      <Link
                        to="/"
                        style={{
                          textDecoration: "none",
                          color: "white"
                        }}>
                        Home
                      </Link>
                    </Button>
                  </Col>
                )}
              </Row>
            </Container>
          ) : (
            <>
              <CartHeader
                checkoutClicked={() => this.setState({ checkingOut: true })}
              />
              <CartItem />
            </>
          )}
        </Container>
      </Layout>
    );
  }
}

export default Checkout;

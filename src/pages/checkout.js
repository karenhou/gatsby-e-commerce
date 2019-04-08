import React, { Component } from "react";
import SEO from "../components/seo";
import Layout from "../components/layout";
import CartItem from "../components/cartItem";
import { Container, Row, Col } from "reactstrap";
import CheckoutForm from "../components/checkoutForm";
import { Elements, StripeProvider } from "react-stripe-elements";
import OrderForm from "../components/orderForm";
import { animated } from "react-spring";
import { Spring } from "react-spring/renderprops";
import CheckoutProgress from "../components/checkoutProgress";

const StripeKey = process.env.CONTENTFUL_PK_KEY;

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStep: 1,
      cartData: null,
      userData: null,
      paymentData: null
    };
  }

  render() {
    const { activeStep, paymentData, userData, cartData } = this.state;
    return (
      <Layout>
        <SEO title="Checkout" />
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
          <Row>
            <Col>
              <Spring
                native
                from={{ marginLeft: "25%" }}
                to={{ marginLeft: activeStep === 1 ? "25%" : "0%" }}>
                {stylesProps => (
                  <animated.div style={stylesProps}>
                    <CartItem
                      showCheckoutBtn={activeStep === 1}
                      handlePayment={data =>
                        this.setState({ activeStep: 2, cartData: data })
                      }
                    />
                  </animated.div>
                )}
              </Spring>
            </Col>
            {activeStep === 2 && (
              <Col xs={6}>
                <OrderForm
                  handlePayment={data =>
                    this.setState({ activeStep: 3, userData: data })
                  }
                />
              </Col>
            )}
            {activeStep === 3 && (
              <Col xs={6}>
                <StripeProvider apiKey={StripeKey}>
                  <Elements>
                    <CheckoutForm
                      cartData={cartData}
                      userData={userData}
                      handlePayment={data =>
                        this.setState({ activeStep: 4, paymentData: data })
                      }
                    />
                  </Elements>
                </StripeProvider>
              </Col>
            )}
            {activeStep === 4 && (
              <Col xs={6}>
                <h1>payment complete</h1>
                <h1>orderID: {paymentData.orderId}</h1>
              </Col>
            )}
          </Row>
        </Container>
      </Layout>
    );
  }
}

export default Checkout;

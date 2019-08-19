/* global SmoothScroll, global */
import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { isUndefined } from "underscore";
import { withFormik } from "formik";
import * as Yup from "yup";

const ErrorP = styled.p`
  color: red;
`;

class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: false };
  }

  componentDidMount() {
    const isMobile = !isUndefined(global.window)
      ? global.window.innerWidth < 768
      : false;
    setTimeout(() => {
      this.setState({ isVisible: true });

      const scroll = new SmoothScroll();
      scroll.animateScroll(isMobile ? 1100 : 450);
    }, 200);
  }

  render() {
    // const { isVisible } = this.state;
    const {
      values,
      touched,
      errors,
      isSubmitting,
      handleSubmit,
      handleChange,
      handleBlur
    } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Full name</label>
          <div className="control">
            <input
              className="input"
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              autoFocus
            />
            {errors.fullName && touched.fullName && (
              <ErrorP>{errors.fullName}</ErrorP>
            )}
          </div>
        </div>
        <div className="field">
          <label className="label">Address 1</label>
          <div className="control">
            <input
              className="input"
              name="address1"
              value={values.address1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.address1 && touched.address1 && (
              <ErrorP>{errors.address1}</ErrorP>
            )}
          </div>
        </div>
        <div className="field">
          <label className="label">Address 2</label>
          <div className="control">
            <input
              className="input"
              name="address2"
              value={values.address2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.address2 && touched.address2 && (
              <ErrorP>{errors.address2}</ErrorP>
            )}
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-body">
            <div className="field">
              <label className="label">City</label>
              <div className="control">
                <input
                  className="input "
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.city && touched.city && <ErrorP>{errors.city}</ErrorP>}
              </div>
            </div>
            <div className="field">
              <label className="label">Postcode</label>
              <div className="control">
                <input
                  className="input"
                  name="postcode"
                  value={values.postcode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.postcode && touched.postcode && (
                  <ErrorP>{errors.postcode}</ErrorP>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-body">
            <div className="field">
              <label className="label">State</label>
              <div className="control">
                <input
                  className="input"
                  name="state"
                  value={values.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.state && touched.state && (
                  <ErrorP>{errors.state}</ErrorP>
                )}
              </div>
            </div>
            <div className="field">
              <label className="label">Country</label>
              <div className="control">
                <input
                  className="input"
                  name="country"
                  value={values.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.country && touched.country && (
                  <ErrorP>{errors.country}</ErrorP>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className="input"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email && <ErrorP>{errors.email}</ErrorP>}
          </div>
        </div>
        <div className="field">
          <label className="label">Telephone</label>
          <div className="control">
            <input
              className="input"
              name="telephone"
              value={values.telephone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.telephone && touched.telephone && (
              <ErrorP>{errors.telephone}</ErrorP>
            )}
          </div>
        </div>
        <button
          className="StyledBtn"
          type="submit"
          disabled={isSubmitting}
          style={{ width: "100%" }}>
          <span className="icon mr-2">
            <i className="far fa-credit-card" />
          </span>
          <span>Proceed to payment</span>
        </button>
      </form>
    );
  }
}

OrderForm.propTypes = {
  handlePayment: PropTypes.func.isRequired
};

export default withFormik({
  mapPropsToValues: props => ({
    fullName: props.userData.fullName || "",
    address1: props.userData.address1 || "",
    address2: props.userData.address2 || "",
    city: props.userData.city || "",
    postcode: props.userData.postcode || "",
    state: props.userData.state || "",
    country: props.userData.country || "",
    email: props.userData.email || "",
    telephone: props.userData.telephone || ""
  }),
  validationSchema: Yup.object().shape({
    fullName: Yup.string().required("Full name is required."),
    address1: Yup.string().required("Address 1 is required."),
    city: Yup.string().required("City is required."),
    postcode: Yup.string().required("Postcode is required."),
    state: Yup.string().required("State is required."),
    country: Yup.string().required("Country is required."),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required!"),
    telephone: Yup.string().required("Telephone is required!")
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    setSubmitting(false);
    setTimeout(() => props.handlePayment(values), 350);
  },
  displayName: "OrderForm" // helps with React DevTools
})(OrderForm);

import React, { Component } from "react";
import { Row, Col, Form } from "react-bootstrap";
import "../css/Reviews.css";
import BeautyStars from "beauty-stars";

class Reviews extends Component {
  state = {
    reviewDetails: {
      name: "",
      email: "",
      reviewText: "",
    },
    value: 1,
    reviews: [],
  };
  updateReview = (event) => {
    event.preventDefault();
    let reviewDetails = this.state.reviewDetails;
    let id = event.currentTarget.id;
    reviewDetails[id] = event.currentTarget.value;
    this.setState({
      reviewDetails,
    });
  };

  componentDidMount = async () => {
    const productId = this.props.id;
    const response = await fetch(`http://localhost:3001/reviews/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const reviews = await response.json();
    this.setState({
      reviews,
    });
  };

  getReviews = async () => {
    const productId = this.props.id;
    const response = await fetch(`http://localhost:3001/reviews/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const reviews = await response.json();
    this.setState({
      reviews,
    });
    console.log("", this.state.reviews);
  };

  postReview = async (event) => {
    event.preventDefault();
    const productId = this.props.id;
    let response = await fetch(
      `http://localhost:3001/reviews/new-review/${productId}`,
      {
        method: "POST",
        body: JSON.stringify({
          name: this.state.reviewDetails.name,
          email: this.state.reviewDetails.email,
          text: this.state.reviewDetails.reviewText,
          ratings: this.state.value,
        }),
        headers: {
          "Content-Type": "Application/json",
        },
      }
    );
    if (response.ok) {
      alert("Review Added");
      this.setState({
        reviewDetails: {
          name: "",
          email: "",
          reviewText: "",
        },
      });
      this.getReviews();
    }
  };

  render() {
    return (
      <div className="mt-5">
        <h3>Reviews</h3>
        <div id="product-information">
          {this.state.reviews.map((review) => {
            return (
              <div>
                <div className="d-flex justify-content-between">
                  <h5>{review.name}</h5>
                  <p>{review.time}</p>
                  <p>{review.date}</p>
                </div>
                <div>
                  <p>{review.text}</p>
                </div>
                <div>
                  <p>Rating : {review.ratings}</p>
                </div>
                <hr></hr>
              </div>
            );
          })}
          <div className="mt-3">
            <h5>Write Your Review</h5>
            <Form>
              <Form.Group style={{ marginTop: "1rem" }}>
                <Row>
                  <Col>
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control
                      htmlFor="name"
                      className="mb-3"
                      type="text"
                      id="name"
                      value={this.state.reviewDetails.name}
                      size="md"
                      onChange={(e) => this.updateReview(e)}
                    />
                  </Col>
                  <Col>
                    <Form.Label>Your Email</Form.Label>
                    <Form.Control
                      htmlFor="email"
                      className="mb-3"
                      type="email"
                      id="email"
                      value={this.state.reviewDetails.email}
                      size="md"
                      onChange={(e) => this.updateReview(e)}
                    />
                  </Col>
                </Row>
                <Form.Control
                  as="textarea"
                  rows={5}
                  htmlFor="reviewText"
                  className="mb-3"
                  id="reviewText"
                  value={this.state.reviewDetails.reviewText}
                  onChange={(e) => this.updateReview(e)}
                />
              </Form.Group>
              <div className="d-flex justify-content-between">
                <BeautyStars
                  value={this.state.value}
                  onChange={(value) => this.setState({ value })}
                  size={"20px"}
                  activeColor={"#fe980f"}
                />
                <button onClick={(e) => this.postReview(e)}>
                  Submit Review
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Reviews;

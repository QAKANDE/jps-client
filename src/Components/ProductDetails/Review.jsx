import React, { Component } from "react";
import { Row, Col, Form, Alert } from "react-bootstrap";
import "../../css/Reviews.css";
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
    alert: false,
    ratingsWidth: "",
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
    this.getReviews();
    // const productId = this.props.id;
    // const response = await fetch(`http://localhost:3001/reviews/${productId}`, {
    //   method: "GET",
    //   headers: {
    //     "content-Type": "application/json",
    //   },
    // });
    // const reviews = await response.json();
    // this.setState({
    //   reviews,
    // });
  };

  getReviews = async () => {
    const productId = this.props.id;
    const response = await fetch(`http://localhost:3003/reviews/${productId}`, {
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

  postReview = async (event) => {
    event.preventDefault();
    const widthArr = [];
    if (this.state.value === 1) {
      widthArr.push("10%");
    } else if (this.state.value === 2) {
      widthArr.push("20%");
    } else if (this.state.value === 3) {
      widthArr.push("40%");
    } else if (this.state.value === 4) {
      widthArr.push("60%");
    } else if (this.state.value === 5) {
      widthArr.push("80%");
    }
    const productId = this.props.id;
    let response = await fetch(`http://localhost:3003/reviews/new-review/`, {
      method: "POST",
      body: JSON.stringify({
        productId: productId,
        name: this.state.reviewDetails.name,
        email: this.state.reviewDetails.email,
        text: this.state.reviewDetails.reviewText,
        width: widthArr[0],
        ratings: this.state.value,
      }),
      headers: {
        "Content-Type": "Application/json",
      },
    });
    if (response.ok) {
      this.setState({
        alert: true,
        reviewDetails: {
          name: "",
          email: "",
          reviewText: "",
        },
        value: 1,
      });
      setTimeout(() => {
        this.setState({
          alert: false,
        });
      }, 1200);
      this.getReviews();
    } else {
      alert("s");
    }
  };

  render() {
    return (
      <div className="mt-5">
        <div className="text-center mb-5">
          <h3>Reviews</h3>
        </div>

        <div id="product-information">
          {this.state.reviews.length === 0 ? (
            <div className="text-center">
              <h5 className="mt-5">This product has no reviews.</h5>
            </div>
          ) : (
            <div>
              {this.state.reviews.slice(0, 3).map((review) => {
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
                      <div>
                        <p>Rating : {review.ratings}</p>
                      </div>
                      <div
                        style={{ width: "100%", backgroundColor: "#f0f0e9" }}
                      >
                        <div
                          style={{
                            width: review.width,
                            height: "30px",
                            backgroundColor: "#fe980f",
                          }}
                        ></div>
                      </div>
                    </div>
                    <hr></hr>
                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-5">
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
                <button onClick={(e) => this.postReview(e)} id="review-button">
                  Submit Review
                </button>
              </div>
            </Form>
          </div>
          {this.state.alert === true ? (
            <Alert id="alert" className="mt-2">
              <h5 className="text-center">Review Added</h5>
            </Alert>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  }
}

export default Reviews;

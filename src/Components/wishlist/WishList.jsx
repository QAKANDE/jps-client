import React, { Component } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../../css/Account.css'

class WishList extends Component {
  state = {
    noWishlist: {},
    wishList: [],
    noUserSignedIn: false,
  }

  componentDidMount = async () => {
    if (localStorage['userId']) {
      const response = await fetch(
        `http://localhost:3003/wishlist/${localStorage['userId']}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      const wishList = await response.json()
      if (wishList.hasOwnProperty('message')) {
        this.setState({
          noWishlist: wishList,
        })
      } else {
        this.setState({
          wishList: wishList.products,
        })
      }
      console.log(this.state.noWishlist)
      console.log(this.state.wishList)
    } else if (localStorage['guestToken']) {
      this.setState({
        noUserSignedIn: true,
      })
    }
  }
  render() {
    return (
      <>
        <Container className="pt-5">
          {this.state.noUserSignedIn === true ? (
            <div
              className="text-center"
              style={{ marginTop: '9rem', marginBottom: '9rem' }}
            >
              <h3>
                You Are Not Logged In, Please Login Or Signup {''}
                <Link to="/login" id="login-link">
                  here
                </Link>{' '}
                to add items to wishlist.
              </h3>
            </div>
          ) : (
            <div>
              {' '}
              {this.state.noWishlist.hasOwnProperty('message') ? (
                <div
                  className="text-center"
                  style={{ marginTop: '10rem', marginBottom: '5rem' }}
                >
                  <h3>Wishlist is empty, please add items</h3>
                </div>
              ) : (
                <div>
                  {this.state.wishList.map((item, key) => {
                    return (
                      <Row
                        className="gutters-sm"
                        style={{ marginBottom: '2rem' }}
                      >
                        <Col md={4} className="mb-3">
                          <Card>
                            <Card.Body>
                              <div className="d-flex flex-column align-items-center text-center">
                                <img
                                  src={item.image}
                                  alt="user-picture"
                                  width="250"
                                ></img>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                        <Col md={8}>
                          <Card>
                            <Card.Body>
                              <Row style={{ marginTop: '1rem' }}>
                                <Col sm={3}></Col>
                                <Col sm={9}>
                                  <h5>{item.name}</h5>
                                </Col>
                              </Row>

                              <Row style={{ marginTop: '1rem' }}>
                                <Col sm={3}>
                                  <h6 class="mb-0">Price</h6>
                                </Col>
                                <Col sm={9}>£ {item.price}</Col>
                              </Row>
                            </Card.Body>
                            {/* <div
                          className="text-center"
                          style={{
                            marginBottom: "2rem",
                            marginTop: "1rem",
                            width: "20%",
                          }}
                        >
                          <button
                            onClick={() =>
                              this.reOrderItem(
                                product._id,
                                product.image,
                                product.name,
                                product.size,
                                product.color,
                                product.price
                              )
                            }
                          >
                            Reorder
                          </button>
                        </div> */}
                          </Card>
                        </Col>
                      </Row>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </Container>
      </>
    )
  }
}

export default WishList

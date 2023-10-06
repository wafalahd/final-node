import React, { Component, Fragment } from 'react';
import AppNavbar from './AppNavbar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getOrders } from '../actions/orderActions';
import { Card, CardText, CardBody, CardTitle, CardSubtitle, Button, Alert, Container } from 'reactstrap';

class Orders extends Component {
  state = {
    loaded: false,
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
    getOrders: PropTypes.func.isRequired
  }

  async componentDidMount() {
    const { isAuthenticated, order, user } = this.props;
    if (isAuthenticated && !order.loading && !this.state.loaded) {
      await this.props.getOrders(user._id);
      this.setState({ loaded: true });
    }
  }

  render() {
    const { isAuthenticated, order } = this.props;

    return (
      <div>
        <AppNavbar />
        {isAuthenticated ? (
          <Fragment>
            {order.orders.length === 0 ? (
              <Alert color="info" className="text-center">You have no orders!</Alert>
            ) : null}
          </Fragment>
        ) : (
          <Alert color="danger" className="text-center">Login to View!</Alert>
        )}

        {isAuthenticated && !order.loading && this.state.loaded && order.orders.length ? (
          <Container>
            <div className="row">
              {order.orders.map((orderItem) => (
                <div className="col-md-12" key={orderItem._id}>
                  <Card>
                    <CardBody>
                      <CardTitle tag="h4">{orderItem.items.length} items - Total cost: Rs. {orderItem.bill}</CardTitle>
                      <div className="row">
                        {orderItem.items.map((item, index) => (
                          <div className="col-md-4" key={index}>
                            <Card className="mb-2">
                              <CardBody>
                                <CardTitle tag="h5">{item.name} ({item.quantity} pieces)</CardTitle>
                                <CardSubtitle tag="h6">Rs. {item.price}/piece</CardSubtitle>
                              </CardBody>
                            </Card>
                          </div>
                        ))}
                      </div>
                    </CardBody>
                  </Card>
                  <br />
                </div>
              ))}
            </div>
          </Container>
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  order: state.order,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
})

export default connect(mapStateToProps, { getOrders })(Orders);

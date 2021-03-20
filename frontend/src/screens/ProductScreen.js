import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap'
import Rating from '../Components/Rating'
import{useDispatch,useSelector} from 'react-redux'
import {listProductDetails} from '../actions/productActions.js'
import Loader from '../Components/loader';
import Message from '../Components/message';
const ProductScreen = ({match,history}) => {

    const [qty,setQty]=useState(0)

  const dispatch=useDispatch()

  useEffect(()=>{
     dispatch(listProductDetails(match.params.id))
  },[match,dispatch])

  const addToCartHandler=()=>{
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }
  const productDetails=useSelector(state => state.productDetails)
  const {loading,error,product}=productDetails
    return (
        <div>
            <Link className='btn btn-dark my-3' to='/'>Go Back</Link>
            {loading?<Loader/>:error?<Message variant='danger'/>:(
                <Row>
                <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Price: ${product.price}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Description: {product.description}
                    </ListGroup.Item>
                </ListGroup>
                </Col>
                <Col md={3}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                                <Row>
                                    <Col><span>Price:</span></Col>
                                    <Col><b>${product.price}</b> </Col>
                                </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                        <Row>
                                <Col><span>Status</span></Col>
                                <Col><strong>{product.countInStock >0 ? "IN STOCK":"OUT OF STOCK"}</strong></Col>
                        </Row>
                        </ListGroup.Item>
                        {product.countInStock && (<ListGroup.Item>
                        <Row>
                                <Col><span>QTY</span></Col>
                                <Col><Form.Control as='select' value={qty} onChange={(e)=>setQty(e.target.value)}>
                                    {[...Array(product.countInStock).keys()].map(x => (
                                        <option key={x+1} value={x+1}>{x+1}</option>
                                    ))} 
                                </Form.Control>
                                </Col>
                        </Row>
                        </ListGroup.Item>)}
                        <ListGroup.Item>
                        
                            <Button className=" btn-block" onClick={addToCartHandler} disabled={!product.countInStock}>ADD TO CART</Button>
    
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
                </Col>
            </Row>
            )}
                    </div>
    )
}

export default ProductScreen

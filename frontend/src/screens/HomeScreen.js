import React, {useEffect} from 'react'
import {Row,Col} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Product from '../Components/Product'
import {listProducts} from '../actions/productActions.js'
import Loader from '../Components/loader.js';
import Message from '../Components/message';

const HomeScreen = () => {

    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(listProducts())       
    },[dispatch])

    const productList=useSelector(state=>state.productlist)
    const{loading,error,products}=productList
    return (
        <>
            <h1>Latest Products</h1>
            {loading?<Loader />:error?(<Message variant='danger'>{error}</Message>):
        <Row>
        {products.map(product => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product}/>
            </Col>
        ))}
    </Row>}
            
        </>
    )
}

export default HomeScreen

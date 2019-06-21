import React,{Component} from 'react'
import Nav from '../view/nav'
import Bot from '../view/bot'
import IndexRouter from '../../router/IndexRouter'
import Router from '../../router/index'
import './index.css'

class Index extends Component {
constructor(props){
super()
}
render() {
return(
<div className='Index'>
    <div className='IndexTop'>
    <Nav></Nav>
    </div>
    <div className='IndexBot'>
    <Bot></Bot>
    </div>
    <Router routes={IndexRouter}/>
</div>
)
}
}

export default Index
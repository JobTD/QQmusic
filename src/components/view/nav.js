import React,{Component} from 'react'
import {NavLink} from 'react-router-dom'
import './nav.css'

class Nav extends Component {
constructor(props){
super()
}
render() {
return(
<div className='box'>
    <div className='Top'>
        <img src="//y.gtimg.cn/mediastyle/mod/mobile/img/logo_ch.svg?max_age=2592000" alt=""/>
        <div className='btn'>下载APP</div>
    </div>
<div className='Nav'>
    <NavLink className='NavLef' activeClassName='select' to='/index/tuijian'>推荐</NavLink>
    <NavLink className='NavCen' activeClassName='select' to='/index/paihang'>排行榜</NavLink>
    <NavLink className='NavRig' activeClassName='select' to='/index/search'>搜索</NavLink>
</div>
</div>
)
}
}

export default Nav
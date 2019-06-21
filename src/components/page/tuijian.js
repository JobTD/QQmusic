import React, { Component } from 'react'
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
import API from '../../comment/API'
import {Icon} from 'antd'
import './tuijian.css'


class Tuijian extends Component {
    constructor(props) {
        super()
        this.state = {
            banner: [],
            radioList:[]
        }
    }
    componentDidMount(){

        this.$http({
            url: API.tuijian,
            method: 'get',
        }).then(d => {
            console.log(d);
            this.setState({
                banner:d.data.data.slider,
                radioList:d.data.data.radioList
            })
            new Swiper('.swiper-container', {
                loop: true,//这里是自动轮播
                autoplay: {
                    delay: 2000,
                    disableOnInteraction: false
                },
                pagination: {
                    el: '.swiper-pagination',//这里是分页器设置
                }
            });
        }).catch(err => {
            console.log(err)
        })
        

    }
    render() {
        var al=this.state.radioList.map(item1=>{
            return <li key={item1.id}>
            <img src={item1.picUrl} alt="" />
            <Icon type="play-circle" className='TJIcon'/>
            <p>{item1.title}</p>
        </li> 
        })
        var bl = this.state.banner.map(item => {
            return <div key={item}
            className="swiper-slide">
            <img src={item} alt="" />
            </div>
        })
        console.log(bl)
        return (

            <div className='tuijian'>
                <div className="swiper-container">
                    <div className="swiper-wrapper" >

                        {bl}
                    </div>
                    
                    <div className='swiper-pagination'></div>
                </div>
                <div className='list'>
                    <h2>电台</h2>
                    <ul className='listUl'>
                       {al}
                        {/* <li>
                            <img src="http://img5.imgtn.bdimg.com/it/u=1675225930,3882737045&fm=26&gp=0.jpg" alt="" />
                            <p>一人一首招牌歌</p>
                        </li> */}
                    </ul>
                </div>
                <div className='bottom'>
                    <h5>查看电脑版网页</h5>
                    <img src="//y.gtimg.cn/mediastyle/mod/mobile/img/logo_ch.svg?max_age=2592000" alt="" />
                    <p>Copyright &copy 1998 - 2019  Tencent. All Rights Reserved.</p>
                    <p>联系电话：0755-86013388 QQ群：55209235</p>
                </div>
            </div>

        );
    }
}


export default Tuijian
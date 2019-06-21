import React,{Component} from 'react'
import './paihang.css'
import API from'../../comment/API'
import {Icon} from 'antd'

class Paihang extends Component {
constructor(props){
super()
this.state = {
   bangList: [],
   bangSong:[],
   startY:0,
   endY:0,
}
}
componentDidMount(){
    this.$http({
        url:API.paihang,
        method:'get'
    }).then(d=>{
        console.log(d);
        this.setState({
            bangList:d.data.data
        }) 
    })
}
startList(e){  
    this.setState({
        startY:e.touches[0].clientY,
        endY:0
    })
}
moveList(e){
    this.setState({
        endY:e.touches[0].clientY,
    })
;
    
}
endList(a){
    if(this.state.endY===0){
    this.props.history.push("/list/"+a)
    }
}
render() {
    const num=number=>{
        if(number>=10000){
            var str='万'
            var number1=0
            var number2=0
            number1=number/10000
            number2=number1.toFixed(1)
            return number2+str
        }else{
            return number
        }
    }
    var al=this.state.bangList.map(item=>{
        var bl=item.songList.map(item1=>{
        return <p key={item1.number}>{item1.number}<span>{item1.songName}</span>-{item1.singerName}</p>
        })
        return <div className='paihangCard' key={item.id} onTouchStart={(e)=>{this.startList(e)}} onTouchMove={(e)=>{this.moveList(e)}} onTouchEnd={()=>{this.endList(item.id)}}>
        <div className='paihangImg'>
            <img src={item.picUrl} alt=""/>
            <div className='PHI'><Icon type="customer-service" className='PHIcon'/>{num(item.listenCount)}</div>
        </div>
        <div className='paihangList'>
            <h6>{item.title}</h6>
            {bl}
        </div>
    </div> 
    })
return(
<div className='paihang'>
{al}
</div>
)
}
}

export default Paihang
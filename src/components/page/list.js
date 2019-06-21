import React,{Component} from 'react'
import './list.css'
import {Icon} from 'antd'
import API from'../../comment/API'

class List extends Component {
constructor(props){
super()
this.state={
    list:[],
    time:'',
    info:[],
    num:0,
    idx:0,
    startY:0,
    endY:0,
    startX:0,
    endX:0,
}
}
componentDidMount(){
    console.log(this.props.match.params.id);
    // this.setState({
    //     idx:this.props.match.params.id
    // })
    //songList
    //topInfo
    //updateTime
    //totalSongNum
    //
    var id=this.props.match.params.id
    this.$http({
        url:API.list+id,
        method:'get'
    }).then(d=>{
        console.log(d);
        
        this.setState({
            list:d.data.data.songList,
            time:d.data.data.updateTime,
            info:d.data.data.topInfo,
            num:d.data.data.totalSongNum,
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
endList(a,b,c,d,e,f){
    if(this.state.endY===0){
    this.props.history.push("/play/"+a+"/"+b+"/"+c+"/"+d+"/"+e+"/"+f)
    }
}
startList1(e){  
    this.setState({
        startX:e.touches[0].clientX,
        endX:0,
    })
}
moveList1(e){
    this.setState({
        endX:e.touches[0].clientX,
    })
;
    
}
endList1(){ 
    if(this.state.endX!==0){
        if(this.state.startX>=this.state.endX+150){
            this.props.history.go(-1)
            }
    }
}
liststart(e){
    this.setState({
        startX:e.touches[0].clientX,
        endX:0,
    })
}
listmove(e){
    this.setState({
        endX:e.touches[0].clientX,
    })
}
listend(){ 
    if(this.state.endX===0){
        var a=this.state.list[0].songMid
        var b=this.state.list[0].singer[0].singerName
        var c=this.state.list[0].songName
        var d=this.state.list[0].songId
        var e=this.state.list[0].albumMid
        var f=this.state.list[0].singer[0].singerMid
        this.props.history.push("/play/"+a+"/"+b+"/"+c+"/"+d+"/"+e+"/"+f)
    }
}
render() {
    var al=this.state.list.map((item,index)=>{
        return <dd key={item.songId} onTouchStart={(e)=>{this.startList(e)}} onTouchMove={(e)=>{this.moveList(e)}} onTouchEnd={()=>{this.endList(item.songMid,item.singer[0].singerName,item.songName,item.songId,item.albumMid,item.singer[0].singerMid)}}>
        <div className='listIndex'>
            <h5>{index+1}</h5>
            <p><Icon type="rise" className='listSs' /><span>169%</span></p>
        </div>
        <div className='listTit'>
            <h2>{item.songName}</h2>
            <h3>{item.singer[0].singerName}</h3>
        </div>
        <div className='listDown'><Icon type="vertical-align-bottom" className='Down'/></div>
    </dd>
    })
return(
<div className='list' onTouchStart={(e)=>{this.startList1(e)}} onTouchMove={(e)=>{this.moveList1(e)}} onTouchEnd={()=>{this.endList1()}}>
    <div className='listTop'><img src="https://y.gtimg.cn/music/common/upload/t_playsong_ad/1207759.png?max_age=2592000" alt=""/><p>更多音乐排行榜</p><span className='listBtn'>戳我查看</span>
    </div>
    <div className='listImg'>
        <div className='listImgBig'>
            <img src={this.state.info.picAlbum} alt=""/>
        </div>
        </div>
        <div className='listTit'>
            <h6>{this.state.info.listName}</h6>
            <h5>{this.state.info.listName}第170天</h5>
            <p>更新时间：{this.state.time}</p>
        </div>
        <div className='listB' onTouchStart={(e)=>{this.liststart(e)}} onTouchMove={(e)=>{this.listmove(e)}} onTouchEnd={()=>{this.listend()}}>
        <Icon type="caret-right" className='listBBtn'/>
        </div>
        <dl className='listDl'>
            <dt>排行榜 共{this.state.num}首</dt>
            {/* <dd>
                <div className='listIndex'>
                    <h5>1</h5>
                    <p><Icon type="rise" className='listSs' /><span>169%</span></p>
                </div>
                <div className='listTit'>
                    <h2>You Need To Calm Dowm</h2>
                    <h3>Taylor Swift</h3>
                </div>
                <div className='listDown'><Icon type="vertical-align-bottom" className='Down'/></div>
            </dd> */}
            {al}
        </dl>
</div>
)
}
}

export default List
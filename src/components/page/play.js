import React,{Component} from 'react'
import API from '../../comment/API'
import {Icon} from 'antd'
import $ from 'jquery';
import './play.css'

class Play extends Component {
constructor(props){
super()
this.state={
    video:'',
    songn:'',
    singn:'',
    img:'',
    tou:'',
    startX:0,
    endX:0,
    gechi:'',
    number:true,
    offOn:true,
    gc:[],
    num:0,
    time:''
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
    var singn=this.props.match.params.singn
    var songn=this.props.match.params.songn
    var songid=this.props.match.params.songid
    var albumMid=this.props.match.params.albumMid
    var singerMid=this.props.match.params.singerMid
    this.setState({
        songn,
        singn,
    })
    this.$http({
        url:API.play+id,
        method:'get'
    }).then(d=>{
        console.log(d);
        this.setState({
            video:d.data.data[0]
        })
        console.log(this.state.video);   
    })
    console.log(id+'1');
    console.log(songid+'2');
    console.log(albumMid+'3');
    console.log(singerMid+'4');
    
    this.$http({
        url:API.lrc+songid,
        method:'get'
    }).then(a=>{
        console.log(a);
        this.setState({
            gechi:a.data.data.lyric
        })
        // console.log(a.data.data.lyric);
        var b=this.state.gechi.split('[换行]')
        var Arr=[]
        for(var i=0;i<b.length;i++){
            var arr=b[i].split(']')
            var key=arr[0].substr(1);
            var value=arr[1];
            // if(value===''){
            //     value=key
            //     key='00:00'
            // }
            key=key.substr(0,5)
            var json={
                key,
                value
            }
            Arr.push(json)
        }
       this.setState({
           gc:Arr
       }) 
    })
    this.$http({
        url:API.img+albumMid+'/'+singerMid,
        method:'get'
    }).then(b=>{
        console.log('-----');
        console.log(b);
        console.log('-----');
         this.setState({
            img:b.data.data.albumImgUrl,
            tou:b.data.data.singerAvatarUrl,
         })
    })
}
startPlay(e){  
    this.setState({
        startX:e.touches[0].clientX,
        endX:0
    })
}
movePlay(e){
    this.setState({
        endX:e.touches[0].clientX,
    })
;
    
}
endPlay(a){
    if(this.state.endX!==0){
        if(this.state.startX>=this.state.endX+150){
            this.props.history.go(-1)
            }
    }
    
}
songstart(e){
    this.setState({
        startX:e.touches[0].clientX,
        endX:0
    })
}
songmove(e){
    this.setState({
        endX:e.touches[0].clientX,
    });  
}
songend(a){
    if(this.state.endX===0){
    var music=document.getElementById("music");
        if(this.state.number===false){
            this.setState({
            number:true
            })
           document.getElementById("tb1").style.display="inline-block";
           document.getElementById("tb2").style.display="none";
           music.pause();
            
       }else{
           document.getElementById("tb1").style.display="none";
           document.getElementById("tb2").style.display="inline-block";
           this.setState({
            number:false
            })
           music.play();
       }
    }
    
}
chistart(e){
    this.setState({
        startX:e.touches[0].clientX,
        endX:0
    })
}
chimove(e){
    this.setState({
        endX:e.touches[0].clientX,
    });  
}
chiend(){
    if(this.state.endX===0){
        if(this.state.offOn===false){
            $('#touimg1').show()
            $('#gechi').hide()
            this.setState({
            offOn:true
            })
            
       }else{          
        $('#touimg1').hide()
        $('#gechi').show()
        this.setState({
        offOn:false
            })
       }
    }
    
}
somgTime(){
    var gc=document.getElementById('ul')
    var currentTime=this.refs.video.currentTime;
    var min=Math.floor(currentTime/60)<10?'0'+Math.floor(currentTime/60):Math.floor(currentTime/60);
    var sec=Math.floor(currentTime%60)<10?'0'+Math.floor(currentTime%60):Math.floor(currentTime%60);
    var time=min+':'+sec;
    for(var i=0;i<this.state.gc.length;i++){
        if(this.state.gc[i].key===time){
            this.setState({
                num:i,
                time:time
            })
            break;
        }
    }
    gc.style.top=-(this.state.num-3)*0.8+"rem"
}
render() {
    var al=this.state.gc.map((item,index)=>{
        return <li key={index} time={item.key} className={this.state.time===item.key?'select':''}>{item.value}</li>
    })
return(
<div className='Play' onTouchStart={(e)=>{this.startPlay(e)}} onTouchMove={(e)=>{this.movePlay(e)}} onTouchEnd={()=>{this.endPlay()}}>

    <div className='playTop'><img src="https://y.gtimg.cn/music/common/upload/t_playsong_ad/1207759.png?max_age=2592000" alt=""/><p>千万正版音乐  海量无损曲库</p><span className='playBtn'>立即使用</span>
    </div>
    <img src={this.state.img} alt="" />
    <div className='playgechi' id='gechi' onTouchStart={(e)=>{this.chistart(e)}} onTouchMove={(e)=>{this.chimove(e)}} onTouchEnd={()=>{this.chiend()}}>
    <ul className='playgc' id='ul'>
        {/* <li>暂无歌词</li> */}
        {al}
    </ul>
    </div>
    <div className='playgechizhe'></div>
    <div className='playZhe'></div>
    <div className='playInfo'>
        <div className='playName'>
            <h4>{this.state.songn}</h4>
            <p>{this.state.singn}</p>
        </div>
        <div className='playImg' onTouchStart={(e)=>{this.chistart(e)}} onTouchMove={(e)=>{this.chimove(e)}} onTouchEnd={()=>{this.chiend()}}>
            <img src={this.state.img} alt="" id='touimg1'/>
        </div>
        <div className='playAudio'>
        <video src={this.state.video}  loop preload="auto" id="music" ref='video' onTimeUpdate={()=>{
            this.somgTime()
        }}></video>
        <span>MV</span>
        <Icon type="play-circle"  className="tubiao1I" id="tb1"  onTouchStart={(e)=>{this.songstart(e)}} onTouchMove={(e)=>{this.songmove(e)}} onTouchEnd={()=>{this.songend()}}/>
        <Icon type="pause-circle"  className="tubiao2I" id="tb2" onTouchStart={(e)=>{this.songstart(e)}} onTouchMove={(e)=>{this.songmove(e)}} onTouchEnd={()=>{this.songend()}}/>
        <Icon type="heart"className="tubiao3I" />

    </div>
    <div className='playBtn'>下载歌曲
    </div>
    </div>
    <div className='playBBtn'>更多精彩内容 尽在QQ音乐</div>
</div>
)
}
}

export default Play
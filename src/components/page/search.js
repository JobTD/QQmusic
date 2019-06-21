import React,{Component} from 'react'
import './search.css'
import { SearchBar, WhiteSpace} from 'antd-mobile';
import { Icon } from 'antd'
// import $ from 'jquery'
import API from '../../comment/API'

class Search extends Component {
  constructor(props){
    super()
    this.state = {
      label: ["周笔畅 新歌","华语原创十大金曲","陪你到世界之巅","父亲写的散文诗","假如你是陌生人","想你的每个夜晚"],
      startX:0,
      endX:0,
      val:'',
      songList:[]
    }
    }
  componentDidMount(){

  }
  focus(){
      var box=document.getElementsByClassName('biaoqian')[0]
      box.style.display='none'
      
  }
  blur(){
   
    if(this.state.val===''){
      var box=document.getElementsByClassName('biaoqian')[0]
      box.style.display='block'
    }
  }
  enter(e){
    }
    xzstart(e){
      console.log(123456);
      
      this.setState({
        startX:e.touches[0].clientX,
        endX:0,   
    })
    console.log('---------------');
      console.log(this.state.val);
    }
    xzmove(e){
      this.setState({
        endX:e.touches[0].clientX,
    })
    console.log('1111111');
    
    }
    
    xzend(a){
      if(this.state.endX===0){
        this.setState({
          val:a,
      })
      var box=document.getElementsByClassName('biaoqian')[0]
      box.style.display='none'
      this.$http({
        url: API.search + a
    }).then(d => {
      console.log(d);
      this.setState({
        songList:d.data.data.songList
    })
    })
      }
    }
    clearV(e){
      this.setState({
        val:e,
        songList:[]    
    })
      console.log(1);
      
      var box=document.getElementsByClassName('biaoqian')[0]
      box.style.display='block'

    }
    startsearch(e){
      var id =e
      var box=document.getElementsByClassName('biaoqian')[0]
      box.style.display='none'
      if(id!==''){
        this.$http({
          url:API.search+id
      }).then(d=>{
        console.log(d);
        this.setState({
          songList:d.data.data.songList
      })
      })
      }
     
    }
startSearch(e){  
    this.setState({
     startX:e.touches[0].clientY,
    endX:0
  })
  }
  moveSearch(e){
    this.setState({
      endX:e.touches[0].clientX,
      })
  }
  endSearch(a,b,c,d,e,f){
      if(this.state.endX===0){
      this.props.history.push("/play/"+a+"/"+b+"/"+c+"/"+d+"/"+e+"/"+f)
      }
  }
  render() {
    var al=this.state.label.map((item,index)=>{
      return <span onTouchStart={(e)=>{this.xzstart(e)}} onTouchMove={(e)=>{this.xzmove(e)}} onTouchEnd={()=>{this.xzend(item)}} key={index}>{item}</span>
    })
    if(this.state.val!==''){
      var bl=this.state.songList.map((item,index)=>{
        return         <li key={index}  onTouchStart={(e)=>{this.startSearch(e)}} onTouchMove={(e)=>{this.moveSearch(e)}} onTouchEnd={()=>{this.endSearch(item.songMid,item.singer[0].singerName,item.songName,item.songId,item.albumMid,item.singer[0].singerMid)}}>
        <div className="fontdiv">
        <Icon className="font" type="customer-service" />
        </div>
      <div className='searchName'>
        <h4>{item.songName}</h4>
        <p>{item.singer[0].singerName}</p>
      </div>
      </li>
      })
    }

    return (
    <div className='search'>
      <SearchBar value={this.state.val} placeholder="搜索歌曲、歌单、专辑"  ref={ref => this.autoFocusInst = ref} 
      onChange={(e) =>{this.clearV(e)}}
      onFocus={()=>{this.focus()}} onBlur={()=>{this.blur()}}
       onSubmit={(e) => { this.startsearch(e) }}className='SearchBar'/>
      <WhiteSpace />
      {/* <input type="text" onkeypress="myFunction()"></input> */}
      <div className='biaoqian'>
          <h4>热门搜索</h4>
          {al}
      </div>
      <ul className='searchUl' ref='ul'>
        {bl}
      </ul>
    </div>
    );
  }
}

// ReactDOM.render(<SearchBarExample />, mountNode);

export default Search
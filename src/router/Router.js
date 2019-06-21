import Login from '../components/page/login'
import Index from '../components/page/index'
import List from '../components/page/list'
import Play from '../components/page/play'
const routes=[{
    path:'/index',
    component:Index
},{
    path:'/login',
    component:Login
},{
    path:'/list/:id',
    component:List
},
{
    path:'/play/:id/:singn/:songn/:songid/:albumMid/:singerMid',
    component:Play
},{
    path:'*',
    redirect:'/index'
}]
export default routes;

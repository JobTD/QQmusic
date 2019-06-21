import Paihang from '../components/page/paihang'
import Search from '../components/page/search'
import Tuijian from '../components/page/tuijian'
const routes=[{
    path:'/index/paihang',
    component:Paihang
},{
    path:'/index/search',
    component:Search
},{
    path:'/index/tuijian',
    component:Tuijian
},{
    path:'*',
    redirect:'/index/tuijian'
}]
export default routes;
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import './rem'
import './reset.css'
import 'antd/dist/antd.css';
import 'antd-mobile/dist/antd-mobile.css'
import {BrowserRouter} from 'react-router-dom'
import axios from 'axios'
Component.prototype.$http=axios;

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));

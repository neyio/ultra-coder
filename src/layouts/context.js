import { createContext } from 'react';
import Global from '../config/global';
const CONTEXT = {
  ...Global, // 传入一个测试 key
}; // 默认值为 CONTEXT
export default createContext(CONTEXT); // 传入全局配置

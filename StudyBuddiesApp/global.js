import { Platform } from 'react-native'
//global.url = 'https://xh2vosyg2d.execute-api.us-east-2.amazonaws.com/beta/'
global.url = Platform.OS === 'ios' ? 'http://127.0.0.1:5000/' : 'http://10.0.2.2:5000/'
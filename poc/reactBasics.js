// default exports. Here both yolo and obj are same as both are same as obj is exported as default

import obj from "./temp"
import yolo  from "./temp"

//named exports-> The variable used should be same as it is in export wala file. We can use as and then use other name.
import {key as haathi} from "./strings"
import { exportedObj } from "./strings"

//import all the files like obj from strings
import * as bundled from "./strings"

bundled.key;
bundled.exportedObj;

//bundled={
//     const key="SHA-20231"

// const exportedObj={
//     name:"Sumit",
//     age:23
// }
// }
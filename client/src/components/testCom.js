import React from "react";
// import VGS_User from '../models/VGS_User'

const testCom = (props) => {
    //console.log(props);
    return (
     <div>
      {/* <div>
        <span>Email</span>
        <input defaultValue={props.obj.email} onChange={props.Changed} />
        <span>{props.ass}</span>
      </div> */}
      
      <span>Email</span>
      <br/>
      <input type='text' defaultValue={props.user.email} onChange={props.Changed}/>
      <br/>
      <span>User Type</span>
      <br/>
      <input type='text'/>
      <br/>
      <span>Committee</span>
      <br/>
      <input type='text'/>
      <br/>
      <span>Hobbies</span>
      <br/>
      <input type='text'/>
      <br/>
      <span>VGS Year</span>
      <br/>
      <input type='text'/>
      <br/>
      <span>Applied Position</span>
      <br/>
      <input type='text'/>

      <button onClick={()=>{props.addObject(props.user)}}>click me</button>
    </div>
    //   {/* <p>
    //     I'm a {props.obj.name} component and I'm {props.obj.age}
    //   </p>
    //   <p>
    //     I'm a {props.obj.name} component and I'm {props.obj.age}
    //   </p>
    //   <p>
    //     I'm a {props.obj.name} component and I'm {props.obj.age}
    //   </p> */}
  );
};

export default testCom;

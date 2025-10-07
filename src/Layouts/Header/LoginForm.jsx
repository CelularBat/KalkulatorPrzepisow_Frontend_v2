import c from "./LoginForm.module.scss";
// import "./LoginForm.css";
import React from "react";



class LoginForm extends React.Component{
 
constructor(props) {
    super(props);
    this.state = {
        userLogin: '',
        userPassword: '',
        shrinked: false
    };

    this.inputLog_handleChange = this.inputLog_handleChange.bind(this);
    this.inputPass_handleChange = this.inputPass_handleChange.bind(this);
    this.register_handleclick = this.register_handleclick.bind(this);
    this.login_handleclick = this.login_handleclick.bind(this);

    this.containerRef = React.createRef();
}

inputLog_handleChange(event){
    this.setState({
        userLogin: event.target.value
    })
}


inputPass_handleChange(event){
    this.setState({
        userPassword: event.target.value
    })
}

// API functions here:
register_handleclick(){
  this.props.handleRegister(this.state.userLogin , this.state.userPassword );
}

login_handleclick(){
  this.props.handleLogin(this.state.userLogin , this.state.userPassword );
}


// Shrink login window when clicked outside
componentDidMount() {
  document.addEventListener('click', this.handleClickOutside);
}

componentWillUnmount() {
  document.removeEventListener('click', this.handleClickOutside);
}

handleClickOutside = (event)=>{
  
  if ( this.containerRef.current.contains(event.target)){
    this.setState({shrinked: false});
  } else {
    this.setState({shrinked: true});
  }
};

render(){  
return(

<div 
  ref={this.containerRef} 
  className={
    c.container + (this.state.shrinked ? ' '+c.shrinked : '')
  } 
  id="login-container"
>
  <input type="radio" name="tab" id="signin" defaultChecked/>
  <input type="radio" name="tab" id="register"/>

  <div className={c.tabs} id="tabs">
    <label className={c.tab} htmlFor="signin">
      <div className={c.text}>Zaloguj</div>
    </label>
    <label className={c.tab} htmlFor="register">
      <div className={c.text}>Zarejestruj</div>
    </label>
  </div>
  <div className={c.pages} id="pages">
    <div className={c.page}>
      <div className={c.input}>
        <div className={c.title}>
          <i className="material-icons"></i>
           NAZWA UŻYTKOWNIKA
        </div>
        <input className={c.text} type="text" placeholder="" onChange={this.inputLog_handleChange}/>
      </div>
      <div className={c.input}>
        <div className={c.title}>
          <i className="material-icons"></i> 
          HASŁO
        </div>
        <input className={c.text} type="password" placeholder="" onChange={this.inputPass_handleChange} />
      </div>
      <div className={c.input}>
        <input type="submit" value="WEJDŹ" id="login_submit" onClick={this.login_handleclick}/>
        <div className={c.title} id="status_log"></div>
      </div>
    </div>
    <div className={`${c.page} ${c.signup}`}>
      <div className={c.input}>
        <div className={c.title}>
          <i className="material-icons"></i>
           NAZWA UŻYTKOWNIKA
        </div>
        <input className={c.text} type="text" placeholder="" onChange={this.inputLog_handleChange}/>
      </div>
      <div className={c.input}>
        <div className={c.title}>
          <i className="material-icons"></i>
           HASŁO
        </div>
        <input className={c.text} type="password" placeholder="" onChange={this.inputPass_handleChange}/>
      </div>
      <div className={c.input}>
        <input type="submit" value="ZAREJESTRUJ!" id="register_submit" onClick={this.register_handleclick}/>
        <div className={c.title} id="status_reg"></div>
       
      </div>
    </div>
  </div>

</div>





);}
};




export default LoginForm;
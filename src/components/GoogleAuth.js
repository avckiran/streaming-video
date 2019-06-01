import React from 'react';
import { connect } from "react-redux";
import {signIn, signOut } from '../actions';



class GoogleAuth extends React.Component{
    state={isSignedIn: null};

    componentDidMount(){
        window.gapi.load('client:auth2', () =>{
            window.gapi.client.init({
                clientId: '861184302853-4ijjns2bcgvgfc2art6csbi6jj19ncdr.apps.googleusercontent.com',
                scope: 'email'
            }).then(()=>{ 
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({isSignedIn: this.auth.isSignedIn.get()});
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = isSignedIn => {
        // this.setState({ isSignedIn: this.auth.isSignedIn.get()});
        if(isSignedIn){
            this.props.signIn();
        }else{
            this.props.signOut();
        }
    }

    onSignInClick = () =>{
        this.auth.signIn();
    }

    onSignOutClick = () =>{
        this.auth.signOut();
    }

    renderAuthButton(){
        if(this.state.isSignedIn === null){
            return null;
        }else if (this.state.isSignedIn){
            return ( <button onClick = {this.onSignOutClick} className="ui red google button" >
                <i className="google icon" />
                Signout
            </button> )
        }else {
            return (
                <button onClick = {this.onSignInClick} className="ui red google button">
                    <i className="google icon" />
                    Sign in with Google
                </button>
            )
        }
    }

    render(){
        return(
            <div>{this.renderAuthButton()}</div>
        );
    }
}

export default connect(null, {signIn, signOut})(GoogleAuth);
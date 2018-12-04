import React, { Component } from 'react'
import Header from "../Common/Header"
import {connect} from "react-redux";
import "./message.css";
import axios from "axios";
import { api , printError, printMessage} from '../../services/';
import {BASE_URL} from "../../constants/routes"
import io from "socket.io-client";
import $ from "jquery";
import * as moment from 'moment';
 

class Message extends Component {
	constructor(props) {
		super(props);
		console.log(window.socket); 

		this.state = {
			messagelist : [],
			user_message : '',
			currentRoom : '',
			currentChat : ''
		}

		let outerstate = this;
		
		this.user_message = this.user_message.bind(this);
		this.handleNewMessage =  this.handleNewMessage.bind(this);
		this.printMessage = this.printMessage.bind(this);
		this.reFormatMessage = this.reFormatMessage.bind(this);

		this.socket = io('http://localhost:3003/');
		console.log(this.socket);
		this.socket.on('connect', function(){console.log("asd1")});
		this.socket.on('news', function(data){
			console.log("news");
			console.log(data);
		});
		this.socket.emit('client_caller',{'data': 'cleitn caller44'});
		this.socket.on('disconnect', function(){console.log("asd2")});
		this.socket.on('message_posted', function(data){
			console.log("asdps");
			console.log(data);
			outerstate.printMessage(data);
		});

		this.getMessages();
	}	


	 componentDidMount()
	 {
			
			console.log(io);
	 }

	 async getMessages()
	 {
		try 
		{
			let ret = await api('GET','/message/findByUser');
			console.log(ret);
			if(ret.status>=200 && ret.status<300)
			{
				//this.props.history.push('/message');
				this.setState({
					messagelist : ret['data']['payLoad'],
				})
			}

		} 
		catch (error) 
		{
			console.log(error); 
			printError(error);
		}
	 }


	 async fetchCurrentMessages(g)
	 {
		 console.log(g['thread']._id);
		 this.setState({
			 currentRoom : g['thread']._id,
			 currentChat : (g['receiver']['name']['first'] + ' ' +g['receiver']['name']['last'] )
		 });
		 this.reFormatMessage(g);
		 this.socket.emit('create_room',{'data' : g['thread']._id});
	 }

	 user_message(e)
	 {
		 this.setState({
			 [e.target.id] : e.target.value
		 })
	 }
	

	 handleNewMessage()
	 {
		 if(this.state.currentRoom=="")
		 {
			printMessage("Please select a chat to send message");
			return false; 
		 }
		 if(this.state.user_message == "")
		 {
			printMessage("Please enter a value to send");
			return false; 
		 }
		 console.log(this.state);
		 let sentAt = new Date().getTime();
		 $(".scroll-chat").append('<div class="main-message-box ta-right"><div class="message-dt"><div class="message-inner-dt"><p>'+this.state.user_message+'</p></div><span>'+(moment(sentAt).fromNow())+'</span></div><div class="messg-usr-img"><img src="http://via.placeholder.com/50x50" alt=""></div></div>');
		 var element = document.querySelector(".scroll-chat");
		 element.scrollTop = element.scrollHeight;
		 this.socket.emit('private_chat_handler',{'payload': this.state.user_message,'thread': this.state.currentRoom,'sentAt':sentAt , 'senderID' : sessionStorage.getItem('user_id')});
		 this.setState({user_message : ''});
	 }


	 printMessage(t)
	 {
		console.log(t);
		$(".scroll-chat").append('<div class="main-message-box st3"><div class="message-dt st3"><div class="message-inner-dt"><p>'+t['payload']+'</p></div><span>'+(moment(t['sentAt']).fromNow())+'</span></div><div class="messg-usr-img"><img src="http://via.placeholder.com/50x50" alt=""></div></div>');
		var element = document.querySelector(".scroll-chat");
		element.scrollTop = element.scrollHeight;
		
	 }



	 reFormatMessage(data)
	 {
		//console.log(data);		
		try
		{
			console.log(data);
			let myid = sessionStorage.getItem('user_id');
			let chats = data['thread']['history'];
			console.log(chats);
			if(myid)
			{
				$(".scroll-chat").html('');
				for(var i = 0 ; i < chats.length ; i++)
				{
					if(chats[i]['sender']==myid)
					{
						$(".scroll-chat").append('<div class="main-message-box ta-right"><div class="message-dt"><div class="message-inner-dt"><p>'+chats[i]['body']+'</p></div><span>'+(moment(chats[i]['sentAt']).fromNow())+'</span></div><div class="messg-usr-img"><img src="http://via.placeholder.com/50x50" alt=""></div></div>');
					}
					else 
					{
						$(".scroll-chat").append('<div class="main-message-box st3"><div class="message-dt st3"><div class="message-inner-dt"><p>'+chats[i]['body']+'</p></div><span>'+(moment(chats[i]['sentAt']).fromNow())+'</span></div><div class="messg-usr-img"><img src="http://via.placeholder.com/50x50" alt=""></div></div>');
					}
				}
				var element = document.querySelector(".scroll-chat");
				element.scrollTop = element.scrollHeight;
			}
		}
		catch(e)
		{
			console.log(e);
		}
	 }


	 handleKeyPress = (event) => {
		if(event.key == 'Enter'){
		  this.handleNewMessage();
		}
	  }

  render() {
    return (    
    <div>  
    <Header />
	<div className="wrapper">
		
		<section className="messages-page p30">
			<div className="container">
				<div className="messages-sec msg-sec-border">
					<div className="row">
						<div className="col-lg-4 col-md-12 no-pdd ">
							<div className="msgs-list ">
								<div className="msg-title msg-title-pad">
									<h3>Messaging</h3>
										<img className="newmessage" src = {require("../Files/Images/newmessage.svg")} />	     								
								</div>
                                
                                <div className="filter-message-box btm-bdr">
                                    <i className="fa fa-search"> </i>
                                    <input placeholder="Search Messages" className="filter-message-input" type="text" />
                                </div>
                
								<div className="messages-list scroll">
									<ul>

									{
										/*
											Change name and image here after change in Fetch Chats API
										*/
										this.state.messagelist.map((val)=>{
											return (
												<li onClick={()=>this.fetchCurrentMessages(val)}>
														{/* <li className="active"> */}
														<div className="usr-msg-details">
															<div className="usr-ms-img">
																<img src="http://via.placeholder.com/50x50" alt="" /> 
																{/* <span className="msg-status"></span> */}
															</div>
															<div className="usr-mg-info">
																<h3>{val.receiver['name']['first'] +' ' + val.receiver['name']['last']}</h3>
																<p>Hello <img src="images/smley.png" alt="" /></p>
															</div>
															<span className="posted_time">{moment(val['updatedAt']).format('LT') }</span>
															{/* <span className="msg-notifc">1</span> */}
														</div>
													</li>
											)
										})
									}



									</ul>
								</div>
							</div>
						</div>


						<div className="col-lg-8 col-md-12 pd-right-none pd-left-none">
							<div className="main-conversation-box">
								<div className="message-bar-head zindex0 p0">
									<div className="usr-msg-details p15">
										<div className="usr-mg-info">
											<h3>{this.state.currentChat}</h3>
										</div>
									</div>
								</div>

								<div className="messages-line margint10 scroll-chat" >
									
									



                                    									

									{/* <div className="main-message-box st3">
										<div className="message-dt st3">
											<div className="message-inner-dt">
												<p>Lorem ipsum dolor sit amet</p>
											</div>
											<span>2 minutes ago</span>
										</div>
										<div className="messg-usr-img">
											<img src="http://via.placeholder.com/50x50" alt="" />
										</div>
									</div>

                                    									<div className="main-message-box ta-right">
										<div className="message-dt">
											<div className="message-inner-dt">
												<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum congue leo eget malesuada. Vivamus suscipit tortor eget felis porttitor.</p>
											</div>
											<span>Sat, Aug 23, 1:08 PM</span>
										</div>
										<div className="messg-usr-img">
											<img src="http://via.placeholder.com/50x50" alt="" />
										</div>
									</div> */}

									
							    </div>
                                    <div className="message-send-area msg-reply-box-bottom">
                                       
                                            <div className="mf-field">
                                                <input type="text" name="user_message" id="user_message" onChange={this.user_message} value={this.state.user_message} placeholder="Type a message here" autoComplete="off" onKeyPress={this.handleKeyPress} />
                                                <button type="button" onClick={this.handleNewMessage}>Send</button>
                                            </div>
                                            
                                        
                                    </div>
						</div>
					</div>
				</div>
			</div>
		</div>
		</section>
        </div>
	</div>


    )
  }
}

export default Message;
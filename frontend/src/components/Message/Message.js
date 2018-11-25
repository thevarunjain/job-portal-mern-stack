import React, { Component } from 'react'
import Header from "../Common/Header"
import {connect} from "react-redux";
import "./message.css";
import axios from "axios";
import { api } from "../../services/Axios";
import {BASE_URL} from "../../constants/routes"

class Message extends Component {
	constructor(props) {
		super(props);

		this.state = ({
			
		})	
	}

	// componentWillMount(){
	// 	var headers = new Headers();
    //     const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YmVlN2VkMmM0YmYxNzRkMWNkYTc4NzkiLCJyb2xlIjoiYXBwbGljYW50IiwiaWF0IjoxNTQyNTc2Mzc4fQ.BHLiKXbJJ5KxwxwhvFty5e0VFHhdZ_QPZcjKwE_Xjjg"
	// 	const config = {
	// 		headers: 
	// 		{ 
	// 			'Authorization': 'Bearer ' + token
	// 		}
	// 	};
	// 	axios.defaults.withCredentials = true;
	// 	sessionStorage.setItem("user_token",'Bearer '+ token);
	// 	//var res = api("get", "/message/findByUser" ,{})
	// 	console.log(res);

	// 	axios.get(`http://localhost:3001/api/message/findByUser` , config).
	// 	then(response => {
    //             console.log("Status Code  is : ",response.status);
    //             console.log(response.data);
    //             if(response.status === 200){
    //                 this.setState({
    //                     status : 200
    //                 })
    //                     console.log('Changed saved successfully');
    //             }else{
    //                 console.log('Changed failed !!! ');
    //             }
    //         });
	// }
	

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
                                    <li>
										{/* <li className="active"> */}
											<div className="usr-msg-details">
												<div className="usr-ms-img">
													<img src="http://via.placeholder.com/50x50" alt="" /> 
													{/* <span className="msg-status"></span> */}
												</div>
												<div className="usr-mg-info">
													<h3>Varun Jain</h3>
													<p>Hello <img src="images/smley.png" alt="" /></p>
												</div>
												<span className="posted_time">1:55 PM</span>
												{/* <span className="msg-notifc">1</span> */}
											</div>
										</li>
                                        <li>
											<div className="usr-msg-details">
												<div className="usr-ms-img">
													<img src="http://via.placeholder.com/50x50" alt="" />
												</div>
												<div className="usr-mg-info">
													<h3>Shubham</h3>
													<p>Hi, I am dummy data</p>
												</div>
												<span className="posted_time">1:55 PM</span>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</div>


						<div className="col-lg-8 col-md-12 pd-right-none pd-left-none">
							<div className="main-conversation-box">
								<div className="message-bar-head zindex0 p0">
									<div className="usr-msg-details p15">
										<div className="usr-mg-info">
											<h3>Varun Jain</h3>
										</div>
									</div>
								</div>

								<div className="messages-line margint10 scroll-chat" >
									
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
									</div>

									<div className="main-message-box st3">
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
									</div>

									<div className="main-message-box st3">
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
									</div>

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

									<div className="main-message-box st3">
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
							    </div>
                                    <div className="message-send-area msg-reply-box-bottom">
                                        <form>
                                            <div className="mf-field">
                                                <input type="text" name="message" placeholder="Type a message here" />
                                                <button type="submit">Send</button>
                                            </div>
                                            <ul>
                                                <li><a href="#" title=""><i className="fa fa-smile-o"></i></a></li>
                                                <li><a href="#" title=""><i className="fa fa-camera"></i></a></li>
                                                <li><a href="#" title=""><i className="fa fa-paperclip"></i></a></li>
                                            </ul>
                                        </form>
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
import React, { Component } from 'react'
import Header from "../Common/Header"
import {connect} from "react-redux";
import "./message.css";


class Message extends Component {
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
													<p>Hello Friends Chai Pee Lo <img src="images/smley.png" alt="" /></p>
												</div>
												<span className="posted_time">1:55 PM</span>
												{/* <span className="msg-notifc">1</span> */}
											</div>
										</li>
                                        <li>
											<div class="usr-msg-details">
												<div class="usr-ms-img">
													<img src="http://via.placeholder.com/50x50" alt="" />
												</div>
												<div class="usr-mg-info">
													<h3>Shubham</h3>
													<p>Muh Mai lelo</p>
												</div>
												<span class="posted_time">1:55 PM</span>
											</div>
										</li>
                                        <li>
											<div class="usr-msg-details">
												<div class="usr-ms-img">
													<img src="http://via.placeholder.com/50x50" alt="" />
												</div>
												<div class="usr-mg-info">
													<h3>Shubham</h3>
													<p>Muh Mai lelo</p>
												</div>
												<span class="posted_time">1:55 PM</span>
											</div>
										</li>
                                        <li>
											<div class="usr-msg-details">
												<div class="usr-ms-img">
													<img src="http://via.placeholder.com/50x50" alt="" />
												</div>
												<div class="usr-mg-info">
													<h3>Shubham</h3>
													<p>Muh Mai lelo</p>
												</div>
												<span class="posted_time">1:55 PM</span>
											</div>
										</li>
                                        <li>
											<div class="usr-msg-details">
												<div class="usr-ms-img">
													<img src="http://via.placeholder.com/50x50" alt="" />
												</div>
												<div class="usr-mg-info">
													<h3>Shubham</h3>
													<p>Muh Mai lelo</p>
												</div>
												<span class="posted_time">1:55 PM</span>
											</div>
										</li>
                                        <li>
											<div class="usr-msg-details">
												<div class="usr-ms-img">
													<img src="http://via.placeholder.com/50x50" alt="" />
												</div>
												<div class="usr-mg-info">
													<h3>Shubham</h3>
													<p>Muh Mai lelo</p>
												</div>
												<span class="posted_time">1:55 PM</span>
											</div>
										</li>
                                        <li>
											<div class="usr-msg-details">
												<div class="usr-ms-img">
													<img src="http://via.placeholder.com/50x50" alt="" />
												</div>
												<div class="usr-mg-info">
													<h3>Shubham</h3>
													<p>Muh Mai lelo</p>
												</div>
												<span class="posted_time">1:55 PM</span>
											</div>
										</li>
                                        <li>
											<div class="usr-msg-details">
												<div class="usr-ms-img">
													<img src="http://via.placeholder.com/50x50" alt="" />
												</div>
												<div class="usr-mg-info">
													<h3>Shubham</h3>
													<p>Muh Mai lelo</p>
												</div>
												<span class="posted_time">1:55 PM</span>
											</div>
										</li>
                                        <li>
											<div class="usr-msg-details">
												<div class="usr-ms-img">
													<img src="http://via.placeholder.com/50x50" alt="" />
												</div>
												<div class="usr-mg-info">
													<h3>Shubham</h3>
													<p>Muh Mai lelo</p>
												</div>
												<span class="posted_time">1:55 PM</span>
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
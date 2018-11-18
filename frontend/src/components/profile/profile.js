import React, { Component } from 'react';
import Header from '../Common/Header';
import { IMAGE_PATHS } from '../../constants/routes';
import bannerlogo from '../Files/Images/profile-banner.svg';
import profileplaceholder from '../Files/Images/profile-placeholder.png'
import './profile.css';
import $ from 'jquery'; 


class profile extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            'banner' : bannerlogo,
            'userimage' : profileplaceholder
        }

        this.openModal.bind = this.openModal.bind(this);
    }


    openModal(d)
    {  
        console.log($("body").text());
        if(d=='EXPERIENCE')
        {   
            $("#educationModal").modal('hide');
            $("#skillsModal").modal('hide');
            $("#expModal").modal('show');  
        }
        else if(d=='SKILLS')
        {
            $("#educationModal").modal('hide');
            $("#expModal").modal('hide');
            $("#skillsModal").modal('show');
        }
        else if(d=='EDUCATION')
        {
            $("#skillsModal").modal('hide');
            $("#expModal").modal('hide');
            $("#educationModal").modal('show');
        }

    }

    render() {
        
        return (
            <div>
                <Header />
                <div className="container">
                    <div className="row block-row">
                        <div className="wrapper col-lg-9">
                            


                            <main>
                                <div className="main-section">
                                    <div>
                                        <div className="main-section-data">
                                            <div className="row ">
                                                <div className="col-lg-12 no-padding">
                                                    <div className="main-left-sidebar">
                                                        <div className="user_profile custom-wrapper">
                                                            <section className="cover-sec">
                                                                <img src={this.state.banner} alt="LinkedIn" />
                                                            </section>
                                                            <div className="user-pro-img">
                                                                <img src={this.state.userimage} alt="LinkedIn" className="user-image profile-user-image" />
                                                            </div>{ /* <!--user-pro-img end--> */}
                                                            <div className="user_pro_status">
                                                                <h3 className="profile-user-name">John Doe</h3>
                                                                <h5 className="profile-user-subname">M.S Software Engineering | Actively seeking Summer Internships - 2019</h5>
                                                                <p className="location-text">
                                                                    San Francisco Bay Area
                                                                </p>

                                                                <div className="dropdown">
                                                                    <button id="profile-section" type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Add Profile Section</button>
                                                                    <div className="dropdown-menu" aria-labelledby="profile-section">
                                                                        <button className="dropdown-item" data-toggle="modal" data-target="#expModal">Work Experience</button>
                                                                        <button className="dropdown-item" data-toggle="modal" data-target="#educationModal">Education</button>
                                                                        <button className="dropdown-item" data-toggle="modal" data-target="#skillsModal">Skills</button>
                                                                    </div>
                                                                </div>

                                                                <hr/>

                                                                <div className="user-description">
                                                                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.


                                                                </div>

                                                            </div> 
                                                        
                                                        </div> 



                                                        <div className=" custom-wrapper suggestions full-width">
                                                            <div className="sd-title">
                                                            <h5 className="profile-user-heading">
                                                                Experience                                     
                                                                
                                                              {/*  <i className="fa fa-pen custom-edit-buttons" aria-hidden="true"></i>*/}
                                                                <i className="fa fa-plus custom-edit-buttons" aria-hidden="true" onClick={()=>this.openModal('EXPERIENCE')}></i>

                                                            </h5>
                                                                <i className="la la-ellipsis-v"></i>
                                                            </div> 
                                                            <div className="suggestions-list">
                                                                <div className="suggestion-usd">
                                                                    <img src="http://via.placeholder.com/35x35" alt="" />
                                                                    <div className="sgt-text">
                                                                        <h4>Jessica William</h4>
                                                                        <span>Graphic Designer</span>
                                                                    </div>
                                                                    <span><i className="la la-plus"></i></span>
                                                                </div>
                                                                
                                                            </div> 
                                                        </div> 


                                                        <div className=" custom-wrapper suggestions full-width">
                                                            <div className="sd-title">
                                                            <h5 className="profile-user-heading">
                                                                Education                                     
                                                                
                                                              {/*  <i className="fa fa-pen custom-edit-buttons" aria-hidden="true"></i>*/}
                                                                <i className="fa fa-plus custom-edit-buttons" aria-hidden="true" onClick={()=>this.openModal('EDUCATION')}></i>

                                                            </h5>
                                                                <i className="la la-ellipsis-v"></i>
                                                            </div> 
                                                            <div className="suggestions-list">
                                                                <div className="suggestion-usd">
                                                                    <img src="http://via.placeholder.com/35x35" alt="" />
                                                                    <div className="sgt-text">
                                                                        <h4>Jessica William</h4>
                                                                        <span>Graphic Designer</span>
                                                                    </div>
                                                                    <span><i className="la la-plus"></i></span>
                                                                </div>
                                                                
                                                            </div> 
                                                        </div> 


                                                        <div className=" custom-wrapper suggestions full-width">
                                                            <div className="sd-title">
                                                            <h5 className="profile-user-heading">
                                                                Skills                                     
                                                                
                                                              {/*  <i className="fa fa-pen custom-edit-buttons" aria-hidden="true"></i>*/}
                                                                <i className="fa fa-plus custom-edit-buttons" aria-hidden="true" onClick={()=>this.openModal('SKILLS')}></i>

                                                            </h5>
                                                                <i className="la la-ellipsis-v"></i>
                                                            </div> 
                                                            <div className="suggestions-list">
                                                                <div className="suggestion-usd">
                                                                    <img src="http://via.placeholder.com/35x35" alt="" />
                                                                    <div className="sgt-text">
                                                                        <h4>Jessica William</h4>
                                                                        <span>Graphic Designer</span>
                                                                    </div>
                                                                    <span><i className="la la-plus"></i></span>
                                                                </div>
                                                                
                                                            </div> 
                                                        </div> 





                                                    </div>
                                                </div>
                                                
                                                <div className="col-lg-3">
                                                    <div className="right-sidebar">
                                                        <div className="message-btn">
                                                            <a href="#" title=""><i className="fa fa-envelope"></i> Message</a>
                                                        </div>
                                                        <div className="widget widget-portfolio">
                                                            <div className="wd-heady">
                                                                <h3>Portfolio</h3>
                                                                <img src="images/photo-icon.png" alt="" />
                                                            </div>
                                                            <div className="pf-gallery">
                                                                <ul>
                                                                    <li><a href="#" title=""><img src="http://via.placeholder.com/70x70" alt="" /></a></li>
                                                                    <li><a href="#" title=""><img src="http://via.placeholder.com/70x70" alt="" /></a></li>
                                                                    <li><a href="#" title=""><img src="http://via.placeholder.com/70x70" alt="" /></a></li>
                                                                    <li><a href="#" title=""><img src="http://via.placeholder.com/70x70" alt="" /></a></li>
                                                                    <li><a href="#" title=""><img src="http://via.placeholder.com/70x70" alt="" /></a></li>
                                                                    <li><a href="#" title=""><img src="http://via.placeholder.com/70x70" alt="" /></a></li>
                                                                    <li><a href="#" title=""><img src="http://via.placeholder.com/70x70" alt="" /></a></li>
                                                                    <li><a href="#" title=""><img src="http://via.placeholder.com/70x70" alt="" /></a></li>
                                                                    <li><a href="#" title=""><img src="http://via.placeholder.com/70x70" alt="" /></a></li>
                                                                    <li><a href="#" title=""><img src="http://via.placeholder.com/70x70" alt="" /></a></li>
                                                                    <li><a href="#" title=""><img src="http://via.placeholder.com/70x70" alt="" /></a></li>
                                                                    <li><a href="#" title=""><img src="http://via.placeholder.com/70x70" alt="" /></a></li>
                                                                </ul>
                                                            </div>{ /* <!--pf-gallery end--> */}
                                                        </div>{ /* <!--widget-portfolio end--> */}
                                                    </div>{ /* <!--right-sidebar end--> */}
                                                </div>
                                            </div>
                                        </div>{ /* <!-- main-section-data end--> */}
                                    </div>
                                </div>
                            </main>


                            
                            <div className="overview-box" id="create-portfolio">
                                <div className="overview-edit">
                                    <h3>Create Portfolio</h3>
                                    <form>
                                        <input type="text" name="pf-name" placeholder="Portfolio Name" />
                                        <div className="file-submit">
                                            <input type="file" name="file" />
                                        </div>
                                        <div className="pf-img">
                                            <img src="http://via.placeholder.com/60x60" alt="" />
                                        </div>
                                        <input type="text" name="website-url" placeholder="htp://www.example.com" />
                                        <button type="submit" className="save">Save</button>
                                        <button type="submit" className="cancel">Cancel</button>
                                    </form>
                                    <a href="#" title="" className="close-box"><i className="la la-close"></i></a>
                                </div>
                            </div>

                        </div>
                        
                    </div>{ /* <!--theme-layout end--> */}
                    <footer>
                                <div className="footy-sec mn no-margin">
                                    <div className="container">
                                        <ul>
                                            <li><a href="#" title="">Help Center</a></li>
                                            <li><a href="#" title="">Privacy Policy</a></li>
                                            <li><a href="#" title="">Community Guidelines</a></li>
                                            <li><a href="#" title="">Cookies Policy</a></li>
                                            <li><a href="#" title="">Career</a></li>
                                            <li><a href="#" title="">Forum</a></li>
                                            <li><a href="#" title="">Language</a></li>
                                            <li><a href="#" title="">Copyright Policy</a></li>
                                        </ul>
                                        <p><img src="images/copy-icon2.png" alt="" />Copyright 2018</p>
                                        <img className="fl-rgt" src="images/logo2.png" alt="" />
                                    </div>
                                </div>
                            </footer>
                </div>




                {
                    /*******ALL MODALS INSERTED HERE FOR THE EDIT OPTIONS ***********/
                }       
                                                <div className="modal fade" id="expModal" tabindex="-1" role="dialog" aria-labelledby="expModalLabel" aria-hidden="true">
                                                    <div className="modal-dialog" role="document">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title" id="expModalLabel">Work Experience</h5>
                                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <form>
                                                                    <label id="work-exp-form"> Title *</label><input type="text" className="form-control" placeholder="Ex.Manager"></input><br />
                                                                    <label id="work-exp-form"> Company *</label><input type="text" className="form-control" placeholder="Ex.Microsoft"></input><br />
                                                                    <table cellSpacing="10%">
                                                                        <tr>
                                                                            <td>
                                                                                <label id="work-exp-form"> From *</label><input type="date" className="form-control" placeholder="From"></input>

                                                                            </td>
                                                                            <td>
                                                                                <label id="work-exp-form"> To *</label><input type="date" className="form-control" placeholder="To"></input>

                                                                            </td>
                                                                        </tr>
                                                                    </table><br />

                                                                    <label id="work-exp-form"> HeadLine *</label><input type="text" className="form-control"></input><br />
                                                                    <label id="work-exp-form"> Location </label><input type="text" className="form-control"></input><br />
                                                                    <label id="work-exp-form"> Description </label><input type="textarea" className="form-control"></input><br />


                                                                </form>
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                                <button type="button" className="btn btn-primary">Add Experience</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                
                                                 {/*  Education Modal Dialog*/}
                                                 <div className="modal fade" id="educationModal" tabindex="-1" role="dialog" aria-labelledby="educationModalLabel" aria-hidden="true">
                                                    <div className="modal-dialog" role="document">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title" id="educationModalLabel">Education</h5>
                                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <form>
                                                                    <label id="work-exp-form"> School*</label><input type="text" className="form-control" placeholder="Ex.Boston"></input><br />
                                                                    <label id="work-exp-form"> Degree</label><input type="text" className="form-control" placeholder="Ex.Bachelor's"></input><br />
                                                                    <label id="work-exp-form"> Field of Study</label><input type="text" className="form-control" placeholder="Ex.Business"></input><br />
                                                                    <label id="work-exp-form"> Grade</label><input type="text" className="form-control" placeholder="Grade"></input><br />

                                                                    <table cellSpacing="10%">
                                                                        <tr>
                                                                            <td>
                                                                                <label id="work-exp-form"> From year*</label><input type="date" className="form-control" placeholder="From"></input>

                                                                            </td>
                                                                            <td>
                                                                                <label id="work-exp-form"> To year *</label><input type="date" className="form-control" placeholder="To"></input>

                                                                            </td>
                                                                        </tr>
                                                                    </table><br />


                                                                    <label id="work-exp-form"> Description </label><input type="textarea" className="form-control"></input><br />


                                                                </form>
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                                <button type="button" className="btn btn-primary">Add Education</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>



                                                {/*  Skills Modal Dialog*/}
                                                <div className="modal fade" id="skillsModal" tabindex="-1" role="dialog" aria-labelledby="skillsModalLabel" aria-hidden="true">
                                                    <div className="modal-dialog" role="document">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title" id="skillsModalLabel">Education</h5>
                                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <form>
                                                                    <label id="work-exp-form"> Skills</label><input type="text" className="form-control" placeholder="Ex. Java"></input><br />


                                                                </form>
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                                <button type="button" className="btn btn-primary">Add Skill</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>



            </div>
        );
    }
}

export default profile;
import React, { Component } from 'react'
import Header from '../Common/Header';
import { IMAGE_PATHS } from '../../constants/routes';
import bannerlogo from '../Files/Images/profile-banner.svg';
import profileplaceholder from '../Files/Images/profile-placeholder.png'
import '../profile/profile.css';
//import $ from 'jquery'; 
import JobDetailedView from "./JobDetailedView";




class CompanyPage extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            'banner' : bannerlogo,
            'userimage' : profileplaceholder
        }

        // this.openModal.bind = this.openModal.bind(this);
    }
    render() {
    

    return (
      <div>
         <Header />
                <section class="cover-sec">
                        <img src={this.state.banner} alt=""/>
                </section>
                    
<div className="container">
            <div className="row block-row">
                <div className="wrapper col-lg-9">
                            
    <main>
        <div className="main-section">
            <div>
                <div className="main-section-data">
                    <div className="row ">
                        <div className="col-lg-12 no-padding mrg-top14">
                            <div className="main-left-sidebar">
                                <div className="user_profile custom-wrapper">
                                    <div className="row">
                                    <div className="col-md-3">
                                        <div>
                                            <img className="user-pro-img comp-profile-logo" src={require("../Files/Images/profile-placeholder.png")} />
                                        </div>
                                    </div>            
                                    <div className="col-md-9 comp-profile-details">
                                    <div className="user_pro_status no-border">
                                        <h3 className="profile-user-name">Varun Jain</h3>
                                        <h5 className="profile-user-subname">M.S Software Engineering  Actively seeking Summer Internships - 2019</h5>
                                        <p className="location-text">
                                            San Francisco Bay Area
                                        </p>
                                        <div className="company-save-apply">
                                        <div class='child inline-block-child' style={{paddingRight:"20px"}}><button type="button" class="btn btn-outline-primary btn-save" style={{fontWeight:"bold"}}>Save</button></div>
                                        <div class='child inline-block-child'><button type="button" className="btn easy-apply">Easy Apply</button></div>
                                        </div> 
                                    </div>
                                    </div>
                                    </div>
                                    <hr/>

                                    <div className="user-description desc">
                                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                                </div>
                                </div> 

                                <div className=" custom-wrapper suggestions full-width">
                                    <div className="sd-title">
                                    <h5 className="profile-user-heading">  
                                        <JobDetailedView />                                  
                                        

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
                            </div>{ /* <!--pf-gallery end--> */}
                        </div>{ /* <!--widget-portfolio end--> */}
                    </div>{ /* <!--right-sidebar end--> */}
                </div>
            </div>
        </div>{ /* <!-- main-section-data end--> */}
    </main>

  

</div>

</div>{ /* <!--theme-layout end--> */}
</div>

{
    /* See more Code
     <button type="button" class="btn btn-info" data-toggle="collapse" data-target="#demo">Simple collapsible</button>
  <div id="demo" class="collapse">  
  </div>
   */
}

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
    )
  }
}

export default CompanyPage;
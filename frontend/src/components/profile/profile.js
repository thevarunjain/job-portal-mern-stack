import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Cover from '../Files/Images/LinkedInCover.svg';
import Pencil from '../Files/Images/Pencil.svg';

import "./profile.css";

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstname: "Shubham",
            lastname: "Sand",
            headline: "Recent College Graduate Seeking Entry Level Programming Position",
            location: "San Francisco Bay Area"
        }


    }


    render() {
        return (
            <div className="profile">
                <label>ddd</label>





                <div className="row">
                    <div className="col-md-0 ">

                    </div>
                    <div className="col-md-8" style={{ paddingLeft: "10%", paddingTop: "4%" }}>


                        <div className="card">
                            <img id="cover-image" src={Cover} alt=""></img>
                            <img id="target" src={""} className="avatar img-circle img-thumbnail" alt="" />


                            {/*  Edit Profile Modal Dialog*/}
                            <div className="modal fade" id="editProfileModal" tabindex="-1" role="dialog" aria-labelledby="editProfileModalLabel" aria-hidden="true">
                                <div className="modal-dialog profileModal" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="editProfileModalLabel">Edit Intro</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <div>

                                                <img src={Cover} style={{ width: "100%" }} />
                                                <img id="target1" src={""} className="avatar img-circle img-thumbnail" alt="" />

                                                <form>


                                                    <table align="center" width="100%" cellpadding="2" cellspacing="2" border="0" >
                                                        <tr>

                                                            <td><input name="first_name" className="form-control" type="text" placeholder="Enter firstname" /></td>
                                                            &nbsp;
                                                            <td>
                                                                <input name="last_name" className="form-control" type="text" placeholder="Enter lastname" /></td>
                                                        </tr>

                                                    </table><br/>


                                                    <table align="center" width="100%" cellpadding="2" cellspacing="2" border="0" >
                                                        <tr>

                                                            <td><input name="address" className="form-control" type="text" placeholder="Enter address" /></td>
                                                            &nbsp;
                                                            <td>
                                                                <input name="city" className="form-control" type="text" placeholder="Enter city" /></td>
                                                        </tr>

                                                    </table><br/>

                                                    <table align="center" width="100%" cellpadding="2" cellspacing="2" border="0" >
                                                        <tr>

                                                            <td><input name="state" className="form-control" type="text" placeholder="Enter State" /></td>
                                                            &nbsp;
                                                            <td>
                                                                <input name="zipcode" className="form-control" type="text" placeholder="Enter zipcode "/></td>
                                                        </tr>

                                                    </table><br/>



                                                    <label id="work-exp-form"> HeadLine *</label><input type="textarea" cols="6" className="form-control" placeholder="Enter Headline"></input><br />

                                                    <label id="work-exp-form"> Summary</label><input type="textarea" cols="6" className="form-control" placeholder="Enter Summary"></input><br />

                                                    

                                                </form>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-primary">Save</button>
                                        </div>
                                    </div>
                                </div>
                            </div>




                            <div className="card-body">

                                <div className="row">
                                    <div className="col-md-6">

                                        <div className="row">
                                            <div className="col-md-18">
                                                <label id="fname" >{this.state.firstname}</label>
                                                <label id="lname" >{this.state.lastname}</label><br />
                                                <label id="headline" >{this.state.headline}</label><br /><br />
                                                <label id="location" >{this.state.location}</label><br />


                                                <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                    <div className="modal-dialog" role="document">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title" id="exampleModalLabel">Work Experience</h5>
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






                                                <div className="dropdown">
                                                    <button id="profile-section" type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Add Profile Section</button>
                                                    <div className="dropdown-menu" aria-labelledby="profile-section">
                                                        <button className="dropdown-item" data-toggle="modal" data-target="#exampleModal">Work Experience</button>
                                                        <button className="dropdown-item" data-toggle="modal" data-target="#educationModal">Education</button>
                                                        <button className="dropdown-item" data-toggle="modal" data-target="#skillsModal">Skills</button>
                                                    </div>
                                                </div>
                                                <button><img src={Pencil} style={{ width: "40px" }} alt="" data-toggle="modal" data-target="#editProfileModal"></img></button>



                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-2">
                                        <form encType="multipart/form-data">




                                            {/*  Edit Profile Modal Dialog*/}

                                        </form>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">

                        <div className="card">
                            <div className="card-body">

                                <div className="panel panel-default">
                                    <div id="verifications" className="panel-heading"><h3>Verifications</h3></div>
                                    <div className="panel-body">


                                        <br />
                                        <hr />



                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>










            </div>

        )
    }
}
export default Profile;
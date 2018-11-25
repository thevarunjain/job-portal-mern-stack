import React, { Component } from 'react';
import Header from '../Common/Header';
import { IMAGE_PATHS, S3_URL } from '../../constants/routes';
import bannerlogo from '../Files/Images/profile-banner.svg';
import profileplaceholder from '../Files/Images/profile-placeholder.png'
import './profile.css';
import PlacesAutocomplete, {geocodeByAddress,getLatLng,} from 'react-places-autocomplete'
import $ from 'jquery'; 
import { connect } from "react-redux";
import { api , printError, printMessage} from '../../services/';
import fetchProfile from '../../actions/profile';
import * as moment from 'moment';
import PLACES from '../Common/Places';



class PublicProfile extends Component {

        constructor(props)
        {
            super(props);
            this.state = {
                'banner' : bannerlogo,
                'userimage' : profileplaceholder,
                'firstname' : '',
                'lastname' : '',
                'street' : '',
                'city' : '',
                'state' : '',
                'country' : '',
                'zipcode' : '',
                'latitude' : '-1',
                'longitude' : '-1',
                'address' : '',
                'profile' : '',
                'education' : [],
                'experience' : [],
                'resume' : '', 
                'skills' : [],
                'summary': '',
                'createdAt': '', 
                'updatedAt' : '',
            }
    
            this.getDetails =  this.getDetails.bind(this);
            this.getDiffBetweenDates = this.getDiffBetweenDates.bind(this);
        }


        componentDidMount()
        {
            this.getDetails();
        }

        async getDetails()
        {
            console.log("test");
            console.log(this.props);
            try 
            {
                let paramsid = this.props.match.params.id;
                console.log(paramsid);
                let ret = await api('GET','/users/'+paramsid);
                console.log(ret);
                if(ret.status>=200 && ret.status<300)
                {
                    let userdata = ret['data']['payLoad']['user'];
                    if(userdata)
                    {
                        
                        console.log(moment(userdata['createdAt']));
                        console.log(userdata);
                        if(userdata['banner_image']=='')
                        {
                            userdata['banner_image'] = bannerlogo;
                        }
                        if(userdata['userimage']=='')
                        {
                            userdata['userimage'] = profileplaceholder;
                        }
                        this.setState({
                            firstname : userdata['name']['first'],
                            lastname : userdata['name']['last'],
                            address : userdata['address'],
                            city : userdata['address']['city'],
                            street : userdata['address']['street'],
                            country : userdata['address']['country'],
                            zipcode : userdata['address']['zipcode'],
                            banner : userdata['banner_image'],
                            userimage : userdata['profile_image'],
                            education : userdata['education'],
                            experience : userdata['experience'],
                            resume : userdata['resume'],
                            skills : userdata['skills'],
                            summary : userdata['summary'],
                            createdAt : userdata['createdAt'],
                            updatedAt : userdata['updatedAt']
                        });
                         
                    }
            
                }
            } 
            catch (error) 
            {
                console.log(error); 
                printError(error);
            }
        }


    getDiffBetweenDates(d1 , d2)
    {

        var a = moment(d2);
        var b = moment(d1);

        var years = a.diff(b, 'year');
        b.add(years, 'years');
        //console.log(b);

        var months = a.diff(b, 'months');
        b.add(months, 'months');
        console.log(years + ' years ' + months + ' months ');
        if(years > 0)
        {
                return (years + ' years ' + months + ' months ');
        }
        else if(years==0)
        {
            return (months + ' months');
        }
    }
        
        
    render()
    {
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
                                                            <img src={this.state.banner} alt="LinkedIn"   />
                                                        </section>
                                                        <div className="user-pro-img">
                                                            <img src={this.state.userimage} alt="LinkedIn" className="user-image profile-user-image"    />
                                                        </div>{ /* <!--user-pro-img end--> */}
                                                        <div className="user_pro_status">
                                                            <h3 className="profile-user-name">{this.state.firstname} {this.state.lastname}</h3>
                                                            <h5 className="profile-user-subname">M.S Software Engineering | Actively seeking Summer Internships - 2019</h5>
                                                            <p className="location-text">
                                                                {this.state.city}
                                                            </p>

                                                             

                                                            <hr/>

                                                            <div className="user-description">
                                                            {this.state.summary}

                                                            </div>
                                                            {
                                                                this.state.resume && (<div className="user-resume"  onClick={this.viewPDF}>
                                                                    <i class="fa fa-file-pdf resume-icon"></i> View Resume
                                                                </div>)
                                                            }
                                                        </div> 
                                                    
                                                    </div> 



                                                    <div className=" custom-wrapper suggestions full-width">
                                                        <div className="sd-title">
                                                            <h5 className="profile-user-heading">
                                                                Experience                                     
                                                                
                                                            {/*  <i className="fa fa-pen custom-edit-buttons" aria-hidden="true"></i>*/}
                                                                

                                                            </h5>
                                                            <i className="la la-ellipsis-v"></i>
                                                        </div> 
                                                        <div className="suggestions-list">
                                                            
                                                                      {  
                                                                          
                                                                          this.state.experience.map((a,ind1)=>{
                                                                            return (
                                                                                <div className="">
                                                                                <div className="suggestion-usd detail-boxes ">
                                                                                    <img src="http://via.placeholder.com/35x35" alt="" />
                                                                                    <div className="sgt-text">
                                                                                        <h4>
                                                                                    <div className="exp-title"> 
                                                                                        {a.title}           
                                                                                    </div>
                                                                                    <div className="exp-company"> 
                                                                                        {a.company}           
                                                                                    </div>

                                                                                    <div className="exp-dates">
                                                                                    {
                                                                                
                                                                                                                                                                                    moment(a['date']['startdate']).format("MMM YYYY") + "-" + moment(a['date']['enddate']).format("MMM YYYY")
                                                                                                                                                                      }  &#x25CB;                                                                                { this.getDiffBetweenDates(a['date']['startdate'],a['date']['enddate'])
                                                                                    }</div>
                                                                                    <div className="exp-location">
                                                                                    {
                                                                                        a.location
                                                                                    }</div>
                                                                                    <div className="exp-desc">
                                                                                    {
                                                                                        a.description
                                                                                    }</div>
                                                                                    
                                                                                    </h4>
                                                                                
                                                                                        </div>
                                                                                        
                                                                                    </div>
                                                                                </div>  
                                                                            )
                                                                          })
                                                                     }
                                                                        
                                                                    

                                                            
                                                        </div> 
                                                    </div> 


                                                    <div className=" custom-wrapper suggestions full-width">
                                                        <div className="sd-title">
                                                        <h5 className="profile-user-heading">
                                                            Education                                     
                                                            
                                                          {/*  <i className="fa fa-pen custom-edit-buttons" aria-hidden="true"></i>*/}
                                                            
                                                        </h5>
                                                            <i className="la la-ellipsis-v"></i>
                                                        </div> 
                                                        <div className="suggestions-list">
                                                             
                                                        {  
                                                                          
                                                                          this.state.education.map((a,ind1)=>{
                                                                            return (
                                                                                <div className="">
                                                                                <div className="suggestion-usd detail-boxes ">
                                                                                    <img src="http://via.placeholder.com/35x35" alt="" />
                                                                                    <div className="sgt-text">
                                                                                        <h4>
                                                                                    <div className="exp-title"> 
                                                                                        {a.school}           
                                                                                    </div>
                                                                                    <div className="exp-company"> 
                                                                                        {a.degree} {a.field}           
                                                                                    </div>

                                                                                    <div className="exp-dates">
                                                                                    {
                                                                                
                                                                                                                                                                                    moment(a['date']['startdate']).format("MMM YYYY") + "-" + moment(a['date']['enddate']).format("MMM YYYY")
                                                                                                                                                                      }  &#x25CB;                                                                                { this.getDiffBetweenDates(a['date']['startdate'],a['date']['enddate'])
                                                                                    }</div>
                                                                                
                                                                                    <div className="exp-desc">
                                                                                    {
                                                                                        a.description
                                                                                    }</div>
                                                                                    
                                                                                    </h4>
                                                                                
                                                                                        </div>
                                                                                        
                                                                                    </div>
                                                                                </div>  
                                                                            )
                                                                          })
                                                                     }
                                                                        
                                                                    
                                                            
                                                        </div> 
                                                    </div> 


                                                    <div className=" custom-wrapper suggestions full-width">
                                                        <div className="sd-title">
                                                            <h5 className="profile-user-heading">
                                                                Skills                                     
                                                                
                                                            {/*  <i className="fa fa-pen custom-edit-buttons" aria-hidden="true"></i>*/}
                                                                
                                                                
                                                            </h5>
                                                            <i className="la la-ellipsis-v"></i>
                                                        </div> 
                                                        <div className="suggestions-list">
                                                        {  
                                                                          
                                                                          this.state.skills.map((a,ind1)=>{
                                                                            return (
                                                            <div className="suggestion-usd detail-boxes skill-sug col-lg-6">
                                                                
                                                                <div className="sgt-text">
                                                                    <h4>
                                                                        {
                                                                            a
                                                                        }
                                                                       
                                                                    </h4>
                                                                   
                                                                </div>
                                                                
                                                            </div>
                                                                          )})
                                                                     }
                                                            
                                                        </div> 
                                                    </div> 

                                                    <div className=" custom-wrapper suggestions full-width">
                                                        <div className="sd-title">
                                                            <h5 className="profile-user-heading">
                                                                Personal Info                                     
                                                                
                                                            {/*  <i className="fa fa-pen custom-edit-buttons" aria-hidden="true"></i>*/}
                                                                

                                                            </h5>
                                                            <i className="la la-ellipsis-v"></i>
                                                        </div> 
                                                        <div className="suggestions-list">
                                                            <div className="suggestion-usd detail-boxes ">
                                                                
                                                                
                                                                <img src="http://via.placeholder.com/35x35" alt="" />
                                                                <div className="sgt-text">
                                                                     <div className="exp-company">
                                                                        {this.state.firstname} {this.state.lastname}

                                                                     </div>
                                                                     <div className="exp-company">
                                                                        {this.state.address.street} <br/>{this.state.city}<br/>
                                                                        {this.state.country}<br/>
                                                                        {this.state.zipcode}
                                                                     </div>
                                                                    
                                                                </div>
                                                                
                                                            </div>
                                                            
                                                        </div> 
                                                    </div> 





                                                </div>
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
                                <a href="javascript:void(0)" title="" className="close-box"><i className="la la-close"></i></a>
                            </div>
                        </div>

                    </div>
                    
                                                <div className="col-lg-3 right-sidebar">
                                                    
                                                    <div className="widget widget-portfolio">
                                                        <div className="wd-heady">
                                                            <h3>Portfolio</h3>
                                                            <img src="images/photo-icon.png" alt="" />
                                                        </div>
                                                        <div className="pf-gallery">
                                                            <ul>
                                                                <li><a href="javascript:void(0)" title=""><img src="http://via.placeholder.com/70x70" alt="" /></a></li>
                                                                <li><a href="javascript:void(0)" title=""><img src="http://via.placeholder.com/70x70" alt="" /></a></li>
                                                                <li><a href="javascript:void(0)" title=""><img src="http://via.placeholder.com/70x70" alt="" /></a></li>
                                                                <li><a href="javascript:void(0)" title=""><img src="http://via.placeholder.com/70x70" alt="" /></a></li>
                                                                <li><a href="javascript:void(0)" title=""><img src="http://via.placeholder.com/70x70" alt="" /></a></li>
                                                                <li><a href="javascript:void(0)" title=""><img src="http://via.placeholder.com/70x70" alt="" /></a></li>
                                                                <li><a href="javascript:void(0)" title=""><img src="http://via.placeholder.com/70x70" alt="" /></a></li>
                                                                <li><a href="javascript:void(0)" title=""><img src="http://via.placeholder.com/70x70" alt="" /></a></li>
                                                                <li><a href="javascript:void(0)" title=""><img src="http://via.placeholder.com/70x70" alt="" /></a></li>
                                                                <li><a href="javascript:void(0)" title=""><img src="http://via.placeholder.com/70x70" alt="" /></a></li>
                                                                <li><a href="javascript:void(0)" title=""><img src="http://via.placeholder.com/70x70" alt="" /></a></li>
                                                                <li><a href="javascript:void(0)" title=""><img src="http://via.placeholder.com/70x70" alt="" /></a></li>
                                                            </ul>
                                                        </div>{ /* <!--pf-gallery end--> */}
                                                    </div>{ /* <!--widget-portfolio end--> */}
                                                </div>{ /* <!--right-sidebar end--> */}
                                            
                    
                </div>{ /* <!--theme-layout end--> */}
                <footer>
                            <div className="footy-sec mn no-margin">
                                <div className="container">
                                    <ul>
                                        <li><a href="javascript:void(0)" title="">Help Center</a></li>
                                        <li><a href="javascript:void(0)" title="">Privacy Policy</a></li>
                                        <li><a href="javascript:void(0)" title="">Community Guidelines</a></li>
                                        <li><a href="javascript:void(0)" title="">Cookies Policy</a></li>
                                        <li><a href="javascript:void(0)" title="">Career</a></li>
                                        <li><a href="javascript:void(0)" title="">Forum</a></li>
                                        <li><a href="javascript:void(0)" title="">Language</a></li>
                                        <li><a href="javascript:void(0)" title="">Copyright Policy</a></li>
                                    </ul>
                                    <p><img src="images/copy-icon2.png" alt="" />Copyright 2018</p>
                                    <img className="fl-rgt" src="images/logo2.png" alt="" />
                                </div>
                            </div>
                        </footer>
            </div>

        </div>
        )
}
}

export default PublicProfile;
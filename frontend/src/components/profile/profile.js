import React, { Component } from 'react';
import Header from '../Common/Header';
import { IMAGE_PATHS } from '../../constants/routes';
import bannerlogo from '../Files/Images/profile-banner.svg';
import profileplaceholder from '../Files/Images/profile-placeholder.png'
import './profile.css';
import PlacesAutocomplete, {geocodeByAddress,getLatLng,} from 'react-places-autocomplete'
import $ from 'jquery'; 
import { connect } from "react-redux";
import { api , printError, printMessage} from '../../services/';
import fetchProfile from '../../actions/profile';
import * as moment from 'moment';


class profile extends Component {

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
            'latitude' : '',
            'longitude' : '',
            'address' : '',
            'profile' : '',
            'education' : [],
            'experience' : [],
            'resume' : '', 
            'skills' : [],
            'summary': '',
            'createdAt': '', 
            'updatedAt' : ''
        }


        this.openModal.bind = this.openModal.bind(this);
        this.detailModal.bind = this.detailModal.bind(this);
        this.handleChange.bind = this.handleChange.bind(this);
        this.handleSelect.bind = this.handleSelect.bind(this);
        this.handleText = this.handleText.bind(this);
        this.addExperience = this.addExperience.bind(this);
        this.deleteExp = this.deleteExp.bind(this);
        this.addEducation = this.addEducation.bind(this);
        this.deleteEducation = this.deleteEducation.bind(this);
    }

    componentDidMount()
    {
        console.log("profile loded");
        console.log(this.props);
        this.props.dispatch(fetchProfile());
    }

    componentWillReceiveProps(nextProps)
    {
        console.log(this.props);
        console.log(nextProps);
        let u = this;
        try
        {
            if(this.props.user_profile)
            {
                let usertype = this.props.user_profile.user_profile.role;
                let userdata = this.props.user_profile.user_profile.user;
                console.log(moment(userdata['createdAt']));
                console.log(userdata);
                u.setState({
                    firstname : userdata['name']['first'],
                    lastname : userdata['name']['last'],
                    address : userdata['address'],
                    city : userdata['address']['city'],
                    street : userdata['address']['street'],
                    country : userdata['address']['country'],
                    zipcode : userdata['address']['zipcode'],
                    banner : userdata['banner_image'],
                    profile : userdata['profile_image'],
                    education : userdata['education'],
                    experience : userdata['experience'],
                    resume : userdata['resume'],
                    skills : userdata['skills'],
                    summary : userdata['summary'],
                    createdAt : userdata['createdAt'],
                    updatedAt : userdata['updatedAt']
                });
                setTimeout(()=>{
                    console.log(u.state);
                },50);
                
            }
        }
        catch(e)
        {
            console.log(e);
        }
    }


    openModal(d,ex1,ex2)
    {  
        if(d=='EXPERIENCE')
        {   
            $("#educationModal").modal('hide');
            $("#skillsModal").modal('hide');
            $('#personalModal').modal('hide');

            console.log(ex1,ex2);

            //****existing pre fetched values if data exists ****/
            if(ex1>=0)
            {
                let copyval = this.state.experience[ex1];
                console.log(copyval);
                $("#expModal").find("input").eq(2).val(moment(copyval['date']['startdate']).format('YYYY-MM-DD'));
                $("#expModal").find("input").eq(3).val(moment(copyval['date']['enddate']).format('YYYY-MM-DD'));
                $("#expModal").find("input").eq(0).val(copyval['title']);
                $("#expModal").find("input").eq(1).val(copyval['company']);
                $("#expModal").find("input").eq(4).val(copyval['headline']);
                $("#expModal").find("input").eq(5).val(copyval['location']);
                $("#expModal").find("input").eq(6).val(copyval['description']);

                //add edit attributes to the submit values
                $("#expModal").attr("data-ind",ex1);
                $("#expModal").attr("data-id",ex2);
            }
            else 
            {
                $("#expModal").removeAttr("data-id");
                $("#expModal").removeAttr("data-ind");
                $("#expModal").find("input").eq(2).val('');
                $("#expModal").find("input").eq(3).val('');
                $("#expModal").find("input").eq(0).val('');
                $("#expModal").find("input").eq(1).val('');
                $("#expModal").find("input").eq(4).val('');
                $("#expModal").find("input").eq(5).val('');
                $("#expModal").find("input").eq(6).val('');
            }

            $("#expModal").modal('show');

        }
        else if(d=='SKILLS')
        {
            $("#educationModal").modal('hide');
            $("#expModal").modal('hide');
            $('#personalModal').modal('hide');
            $("#skillsModal").modal('show');
        }
        else if(d=='EDUCATION')
        {
            $("#skillsModal").modal('hide');
            $("#expModal").modal('hide');
            $('#personalModal').modal('hide');
            $("#educationModal").modal('show');
        }
        else if(d=='PERSONAL')
        {
            $("#skillsModal").modal('hide');
            $("#expModal").modal('hide');
            $("#educationModal").modal('hide');
            $('#personalModal').modal('show');
        }

    }

    detailModal(i,id,type)
    {
        //alert("Index "+i);
        console.log(i,id,type);
        //Set state from here for all the fields
        this.openModal(type,i,id);

    }

    handleChange = street => 
    {
        this.setState({ street  });
    };

    handleText(e)
    {
            this.setState({
                [e.target.id] : e.target.value
            });
    }
    
    handleSelect = address => 
    {
        geocodeByAddress(address)
          .then(results => {
              console.log(results);///formatted_address
              this.setState({
                country : '',
                state : '',
                city : '',
                zipcode : ''
            });
              let tempdata = {}
              let _t = results[0]['address_components'];
              for(var t = 0; t < _t.length; t++)
              {
                    if(_t[t]['types'].indexOf('country')!=-1)
                    {
                        tempdata['country'] = _t[t]['long_name'];
                    }
                    if(_t[t]['types'].indexOf('administrative_area_level_1')!=-1)
                    {
                        tempdata['state'] = _t[t]['long_name'];
                    }
                    if(_t[t]['types'].indexOf('locality')!=-1)
                    {
                        tempdata['city'] = _t[t]['short_name'];
                    }
                    if(_t[t]['types'].indexOf('postal_code')!=-1)
                    {
                        tempdata['zipcode'] = _t[t]['long_name'];
                    }
              }
              //tempdata['latitude'] = coord
              console.log(tempdata);
              this.setState({
                  country : tempdata.country,
                  state : tempdata.state,
                  city : tempdata.city,
                  zipcode : tempdata.zipcode,
                  street : results[0]['formatted_address']
              });
              //return getLatLng(results[0])
          })
          .catch(error => {
              console.error('Error', error)
          });
    };


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


    async addExperience()
    { 
        let ref1 = $("#expModal").attr("data-id");
        let ref2 = $("#expModal").attr("data-ind");
        console.log(ref1,ref2);
        let sendData,outerthis = this;
        if(ref1 && ref2)
        {
            //*****
            //*** Editing existing entry to the experiece array ***
            //****/
            let temp  = this.state.experience;
            sendData = [];
            for( let g = 0 ; g < temp.length ; g++)
            {
                if((g == ref2) && (temp[g]["_id"]==ref1))
                {
                    console.log("EDIT");
                    let dataToPush = {
                        title : $("#expModal").find("input").eq(0).val(),
                        company : $("#expModal").find("input").eq(1).val(),
                        date : {
                            startdate : (new Date($("#expModal").find("input").eq(2).val()).toString()), 
                            enddate : (new Date($("#expModal").find("input").eq(3).val()).toString()),
                        },
                        headline : $("#expModal").find("input").eq(4).val(),
                        location : $("#expModal").find("input").eq(5).val(),
                        description : $("#expModal").find("input").eq(6).val()
                    }

                    if(dataToPush['title'] == '' || dataToPush['company'] == '' || dataToPush['date']['startdate'] == '' || dataToPush['date']['enddate'] == '' || dataToPush['headline'] == '' || dataToPush['location'] == '' || dataToPush['description'] == '') 
                    {
                        printMessage("Please enter all fields to save");
                        return false;
                    }

                    sendData.push(dataToPush);
                }
                else 
                {
                    sendData.push({
                        'date' : {
                            'startdate' : temp[g].date.startdate,
                            'enddate' : temp[g].date.enddate,
                        },
                        'title' : temp[g].title,
                        'company' : temp[g].company,
                        'headline' : temp[g].headline,
                        'location' : temp[g].location,
                        'description' : temp[g].description
                    });
                }
            }
            console.log(sendData);
        }
        else 
        {
            //*****
            //*** Adding new entry to the experiece array ***
            //****/
            console.log(this.props);
            let dataToPush = {
                title : $("#expModal").find("input").eq(0).val(),
                company : $("#expModal").find("input").eq(1).val(),
                date : {
                    startdate : (new Date($("#expModal").find("input").eq(2).val()).toString()), 
                    enddate : (new Date($("#expModal").find("input").eq(3).val()).toString()),
                },
                headline : $("#expModal").find("input").eq(4).val(),
                location : $("#expModal").find("input").eq(5).val(),
                description : $("#expModal").find("input").eq(6).val()
            };

            if(dataToPush['title'] == '' || dataToPush['company'] == '' || dataToPush['date']['startdate'] == '' || dataToPush['date']['enddate'] == '' || dataToPush['headline'] == '' || dataToPush['location'] == '' || dataToPush['description'] == '') 
            {
                printMessage("Please enter all fields to save");
                return false;
            }

            let temp  = this.state.experience;
            sendData = [];
            for( let g = 0 ; g < temp.length ; g++)
            {
                sendData.push({
                    'date' : {
                        'startdate' : temp[g].date.startdate,
                        'enddate' : temp[g].date.enddate,
                    },
                    'title' : temp[g].title,
                    'company' : temp[g].company,
                    'headline' : temp[g].headline,
                    'location' : temp[g].location,
                    'description' : temp[g].description
                });
            }
        
            sendData.push(dataToPush);
            console.log(sendData);
        }
        
        let data = {
            'experience' : sendData
        }
        console.log(data);
        //return false;
        try {
            let ret = await api('PUT',('/users/'+this.props.LoginReducer.user_id),data);
            console.log(ret);
            if(ret.status>=200 && ret.status<300)
            {
                outerthis.setState((prevState)=>({
                    experience : sendData
                }));
                $("#expModal").modal('hide');
                $("#expModal").removeAttr("data-id");
                $("#expModal").removeAttr("data-ind");
                printMessage("Profile Updated Successfully.");
            }
        } catch (error) {
            console.log(Object.keys(error), error.response);
            printError(error);   //Pass Full response object to the printError method.
        }
    }

    async deleteExp()
    {
        
        let delIndex  = $("#expModal").attr("data-ind");
        console.log(delIndex);
        if(delIndex===undefined)
        {
            $("#expModal").modal('hide');
            return false;
        }
            
        let rem = this.state.experience;
        rem.splice(delIndex,1);
        let data = 
        {
            'experience' : rem
        }
        console.log(data);
        try {
            let ret = await api('PUT',('/users/'+this.props.LoginReducer.user_id),data);
            console.log(ret);
            if(ret.status>=200 && ret.status<300)
            {
                this.setState((prevState)=>({
                        experience : rem
                }));
                $("#expModal").modal('hide');
                printMessage("Enrtry Deleted Successfully.");
            }
        } catch (error) {
            console.log(Object.keys(error), error.response);
            printError(error);   //Pass Full response object to the printError method.
        }
       
    }

    async addEducation()
    { 
        let ref1 = $("#educationModal").attr("data-id");
        let ref2 = $("#educationModal").attr("data-ind");
        console.log(ref1,ref2);
        let sendData,outerthis = this;
        if(ref1 && ref2)
        {
            //*****
            //*** Editing existing entry to the experiece array ***
            //****/
            let temp  = this.state.experience;
            sendData = [];
            for( let g = 0 ; g < temp.length ; g++)
            {
                if((g == ref2) && (temp[g]["_id"]==ref1))
                {
                    console.log("EDIT");
                    let dataToPush = {
                        title : $("#educationModal").find("input").eq(0).val(),
                        company : $("#expModal").find("input").eq(1).val(),
                        date : {
                            startdate : (new Date($("#educationModal").find("input").eq(2).val()).toString()), 
                            enddate : (new Date($("#educationModal").find("input").eq(3).val()).toString()),
                        },
                        headline : $("#educationModal").find("input").eq(4).val(),
                        location : $("#educationModal").find("input").eq(5).val(),
                        description : $("#educationModal").find("input").eq(6).val()
                    }

                    if(dataToPush['title'] == '' || dataToPush['company'] == '' || dataToPush['date']['startdate'] == '' || dataToPush['date']['enddate'] == '' || dataToPush['headline'] == '' || dataToPush['location'] == '' || dataToPush['description'] == '') 
                    {
                        printMessage("Please enter all fields to save");
                        return false;
                    }

                    sendData.push(dataToPush);
                }
                else 
                {
                    sendData.push({
                        'date' : {
                            'startdate' : temp[g].date.startdate,
                            'enddate' : temp[g].date.enddate,
                        },
                        'title' : temp[g].title,
                        'company' : temp[g].company,
                        'headline' : temp[g].headline,
                        'location' : temp[g].location,
                        'description' : temp[g].description
                    });
                }
            }
            console.log(sendData);
        }
        else 
        {
            //*****
            //*** Adding new entry to the experiece array ***
            //****/
            console.log(this.props);
            let dataToPush = {
                title : $("#educationModal").find("input").eq(0).val(),
                company : $("#educationModal").find("input").eq(1).val(),
                date : {
                    startdate : (new Date($("#educationModal").find("input").eq(2).val()).toString()), 
                    enddate : (new Date($("#educationModal").find("input").eq(3).val()).toString()),
                },
                headline : $("#educationModal").find("input").eq(4).val(),
                location : $("#educationModal").find("input").eq(5).val(),
                description : $("#educationModal").find("input").eq(6).val()
            };

            if(dataToPush['title'] == '' || dataToPush['company'] == '' || dataToPush['date']['startdate'] == '' || dataToPush['date']['enddate'] == '' || dataToPush['headline'] == '' || dataToPush['location'] == '' || dataToPush['description'] == '') 
            {
                printMessage("Please enter all fields to save");
                return false;
            }

            let temp  = this.state.experience;
            sendData = [];
            for( let g = 0 ; g < temp.length ; g++)
            {
                sendData.push({
                    'date' : {
                        'startdate' : temp[g].date.startdate,
                        'enddate' : temp[g].date.enddate,
                    },
                    'title' : temp[g].title,
                    'company' : temp[g].company,
                    'headline' : temp[g].headline,
                    'location' : temp[g].location,
                    'description' : temp[g].description
                });
            }
        
            sendData.push(dataToPush);
            console.log(sendData);
        }
        
        let data = {
            'experience' : sendData
        }
        console.log(data);
        //return false;
        try {
            let ret = await api('PUT',('/users/'+this.props.LoginReducer.user_id),data);
            console.log(ret);
            if(ret.status>=200 && ret.status<300)
            {
                outerthis.setState((prevState)=>({
                    experience : sendData
                }));
                $("#educationModal").modal('hide');
                $("#educationModal").removeAttr("data-id");
                $("#educationModal").removeAttr("data-ind");
                printMessage("Profile Updated Successfully.");
            }
        } catch (error) {
            console.log(Object.keys(error), error.response);
            printError(error);   //Pass Full response object to the printError method.
        }
    }


    async deleteEducation()
    {
        
        let delIndex  = $("#educationModal").attr("data-ind");
        console.log(delIndex);
        if(delIndex===undefined)
        {
            $("#educationModal").modal('hide');
            return false;
        }
            
        let rem = this.state.experience;
        rem.splice(delIndex,1);
        let data = 
        {
            'experience' : rem
        }
        console.log(data);
        try {
            let ret = await api('PUT',('/users/'+this.props.LoginReducer.user_id),data);
            console.log(ret);
            if(ret.status>=200 && ret.status<300)
            {
                this.setState((prevState)=>({
                        experience : rem
                }));
                $("#educationModal").modal('hide');
                printMessage("Enrtry Deleted Successfully.");
            }
        } catch (error) {
            console.log(Object.keys(error), error.response);
            printError(error);   //Pass Full response object to the printError method.
        }
       
    }

    render() {
        
        console.log(this.state);
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
                                                                <h3 className="profile-user-name">{this.state.firstname} {this.state.lastname}</h3>
                                                                <h5 className="profile-user-subname">M.S Software Engineering | Actively seeking Summer Internships - 2019</h5>
                                                                <p className="location-text">
                                                                    {this.state.city}
                                                                </p>

                                                                <div className="dropdown">
                                                                    <button id="profile-section" type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Add Profile Section</button>
                                                                    <div className="dropdown-menu exts" aria-labelledby="profile-section">
                                                                        <button className="dropdown-item" data-toggle="modal" data-target="#expModal">Work Experience</button>
                                                                        <button className="dropdown-item" data-toggle="modal" data-target="#educationModal">Education</button>
                                                                        <button className="dropdown-item" data-toggle="modal" data-target="#skillsModal">Skills</button>
                                                                    </div>
                                                                </div>

                                                                <hr/>

                                                                <div className="user-description">
                                                                {this.state.summary}

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
                                                                                        <i className="fa fa-pen custom-edit-buttons" aria-hidden="true" onClick={()=> this.detailModal(ind1,a._id,'EXPERIENCE')}></i>
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
                                                                <i className="fa fa-plus custom-edit-buttons" aria-hidden="true" onClick={()=>this.openModal('EDUCATION')}></i>

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
                                                                                        <i className="fa fa-pen custom-edit-buttons" aria-hidden="true" onClick={()=> this.detailModal(ind1,a._id,'EDUCATION')}></i>
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
                                                                    <i className="fa fa-plus custom-edit-buttons" aria-hidden="true" onClick={()=>this.openModal('SKILLS')}></i>

                                                                    <i className="fa fa-pen custom-edit-buttons onlyskillsbt" aria-hidden="true" onClick={()=> this.detailModal('','','SKILLS')}></i>

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
                                                                    <i className="fa fa-pen custom-edit-buttons" aria-hidden="true" onClick={()=>this.openModal('PERSONAL')}></i>

                                                                </h5>
                                                                <i className="la la-ellipsis-v"></i>
                                                            </div> 
                                                            <div className="suggestions-list">
                                                                <div className="suggestion-usd detail-boxes ">
                                                                    
                                                                    
                                                                    <img src="http://via.placeholder.com/35x35" alt="" />
                                                                    <div className="sgt-text">
                                                                        <h4>
                                                                            Jessica William
                                                                           
                                                                        </h4>
                                                                        <span>Graphic Designer</span>
                                                                    </div>
                                                                    
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
                                                                    <label id="work-exp-form"> Title</label><input type="text" className="form-control" placeholder="Ex.Manager"></input><br />
                                                                    <label id="work-exp-form"> Company</label><input type="text" className="form-control" placeholder="Ex.Microsoft"></input><br />
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

                                                                    <label id="work-exp-form"> HeadLine</label><input type="text" className="form-control"></input><br />
                                                                    <label id="work-exp-form"> Location </label><input type="text" className="form-control"></input><br />
                                                                    <label id="work-exp-form"> Description </label><input type="textarea" className="form-control"></input><br />


                                                                </form>
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn  delete-button  mr-auto" onClick={this.deleteExp} >Delete Experience</button>
                                                                <button type="button" onClick={this.addExperience} className="btn save-button">Add Experience</button>
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
                                                                    <label id="work-exp-form"> School</label><input type="text" className="form-control" placeholder="Ex.Boston"></input><br />
                                                                    <label id="work-exp-form"> Degree</label><input type="text" className="form-control" placeholder="Ex.Bachelor's"></input><br />
                                                                    <label id="work-exp-form"> Field of Study</label><input type="text" className="form-control" placeholder="Ex.Business"></input><br />
                                                                    <label id="work-exp-form"> Grade</label><input type="text" className="form-control" placeholder="Grade"></input><br />

                                                                    <table cellSpacing="10%">
                                                                        <tr>
                                                                            <td>
                                                                                <label id="work-exp-form"> From year</label><input type="date" className="form-control" placeholder="From"></input>

                                                                            </td>
                                                                            <td>
                                                                                <label id="work-exp-form"> To year </label><input type="date" className="form-control" placeholder="To"></input>

                                                                            </td>
                                                                        </tr>
                                                                    </table><br />


                                                                    <label id="work-exp-form"> Description </label><input type="textarea" className="form-control"></input><br />


                                                                </form>
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn  delete-button  mr-auto" onClick={this.deleteEducation} >Delete Education</button>
                                                                <button type="button" onClick={this.addEducation} className="btn save-button">Add Education</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>



                                                {/*  Skills Modal Dialog*/}
                                                <div className="modal fade" id="skillsModal" tabindex="-1" role="dialog" aria-labelledby="skillsModalLabel" aria-hidden="true">
                                                    <div className="modal-dialog" role="document">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title" id="skillsModalLabel">Skills</h5>
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


                                                {/*  Personal Modal Dialog*/}
                                                <div className="modal fade" id="personalModal" tabindex="-1" role="dialog" aria-labelledby="skillsModalLabel" aria-hidden="true">
                                                    <div className="modal-dialog" role="document">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title" id="personalModalLabel">Personal Details</h5>
                                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div className="modal-body">
                                                                <form>
                                                                    <div class="form-row">
                                                                        <div class="form-group col-md-6">
                                                                            <label for="inputEmail4">First Name</label>
                                                                            <input type="email" class="form-control" id="inputEmail4" placeholder="Email" />
                                                                        </div>
                                                                        <div class="form-group col-md-6">
                                                                            <label for="inputPassword4">Last Name</label>
                                                                            <input type="password" class="form-control" id="inputPassword4" placeholder="Password" />
                                                                        </div>
                                                                    </div>
                                                                    <div class="form-group">
                                                                        <label for="inputAddress">Address</label>
                                                                        
                                                                        <PlacesAutocomplete
                                                                                        value={this.state.street}
                                                                                        onChange={this.handleChange}
                                                                                        onSelect={this.handleSelect}
                                                                                    >
                                                                                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                                                                        <div>
                                                                                            <input
                                                                                            {...getInputProps({
                                                                                                placeholder: 'Search Places ...',
                                                                                                className: 'location-search-input form-control',
                                                                                            })}
                                                                                            />
                                                                                            <div className="autocomplete-dropdown-container">
                                                                                            {loading && <div>Loading...</div>}
                                                                                            {suggestions.map(suggestion => {
                                                                                                const className = suggestion.active
                                                                                                ? 'suggestion-item--active'
                                                                                                : 'suggestion-item';
                                                                                                // inline style for demonstration purpose
                                                                                                const style = suggestion.active
                                                                                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                                                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                                                                return (
                                                                                                <div
                                                                                                    {...getSuggestionItemProps(suggestion, {
                                                                                                    className,
                                                                                                    style,
                                                                                                    })}
                                                                                                >
                                                                                                    <span>{suggestion.description}</span>
                                                                                                </div>
                                                                                                );
                                                                                            })}
                                                                                            </div>
                                                                                        </div>
                                                                                        )}
                                                                                    </PlacesAutocomplete>
                                                                    </div>
                                                                    <div class="form-row">
                                                                        <div class="form-group col-md-4">
                                                                            <label for="inputEmail4">City</label>
                                                                            <input type="text" class="form-control" id="city"  placeholder="" value={this.state.city} onChange={this.handleText} />
                                                                        </div>
                                                                        <div class="form-group col-md-4">
                                                                            <label for="inputPassword4">State</label>
                                                                            <input type="text" class="form-control" id="state" placeholder="" value={this.state.state} 
                                                                            onChange={this.handleText} />
                                                                        </div>
                                                                        <div class="form-group col-md-4">
                                                                            <label for="inputPassword4">Zip Code</label>
                                                                            <input type="text" class="form-control" id="zipcode" placeholder="" value={this.state.zipcode} onChange={this.handleText} />
                                                                        </div>
                                                                    </div>
                                                                    <div class="form-group">
                                                                        <label for="inputAddress">Address</label>
                                                                        <textarea class="form-control"   ></textarea>
                                                                    </div>


                                                                </form>
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                                <button type="button" className="btn btn-primary">Save</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>



            </div>
        );
    }
}

//export default profile;


//export default HomePage;

function mapStateToProps(state) {
    console.log("in map state details profileVIEW",state);
    return state;
  //  return { property_detail: state.fetch_details_view.property_detail,
  //  };
  }
  
  export default connect(
    mapStateToProps
  )(profile);
  
  
/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

(function(document) {
  //'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  //var indexApp = document.querySelector('#indexApp');
  //console.log("index.id:"+indexApp.id);

  // Notice: use content to select an element inside a template
  // http://stackoverflow.com/questions/26016160/cant-find-element-inside-template-with-queryselector-polymer
  //var app = indexApp.content.querySelector('#myApp');
  //console.log("app.id:" + app.id);


  var app = document.querySelector('#app'); // # means use id as a CSS selector
  console.log("app.id:" + app.id);
  app.baseHref = "http://localhost:8080/template";

  //app.baseUrl = '/template/';
  if (window.location.port === '') {  // if production
    // Uncomment app.baseURL below and
    // set app.baseURL to '/your-pathname/' if running from folder in production
    // app.baseUrl = '/';
  }

  /**
  * Whether the user is logged in to the GitHub.
  *
  * @type {boolean}
  */
  app.isAuthorized = false;
  //app.access_token = null;
  app.access_token = "undefined";
  app.hresponse = null;
  app.currentUser = null;
  app.compResponse = null;
  app.isMobile = false; //initiate as false
  app.loading = false;
  app.selectedFilter = "active";
  app.list = true;
  app.header = null; // for access backend service
  app.accessGitHubHeader = null; // for access GitHub directly
  app.currentGitHubUser = null;
  // app.accessOpenIdHeader = null; // for access learning layer open id
  // app.oidcAccessToken = null;
  // app.oidcAuthorized;
  // app.currentUserAgent = null;
  app.gitHubOrg = "Co-Design-Platform";
  app.ajaxParamsGitHubOrg = {org: app.gitHubOrg};
  app.showFileUploadForm = false;
  app.currentProject = "";

  app.displayInstalledToast = function() {
    // Check to make sure caching is actually enabled—it won't be in the dev environment.
    if (!document.querySelector('platinum-sw-cache').disabled) {
      document.querySelector('#caching-complete').show();
    }
  };

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('dom-change', function() {
    // device detection
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {

      this.isMobile = true;
    }
  });

  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', function() {
    // imports are loaded and elements have been registered
    //this.i18n = document.querySelector('i18n-msg');
    app.loaded = true;
    console.log("app.js WebComponentsReady");
  });

  document.addEventListener('HTMLImportsLoaded', function() {
    console.log("app.js HTMLImportsLoaded");
    var lang = null;
    if (document.cookie != ''){
      var cookies = document.cookie.split(';');
      for(var i = 0; i <cookies.length; i++) {
        var c = cookies[i];
        while (c.charAt(0)==' ') {
          c = c.substring(1);
        }
        if (c.indexOf("lang=") == 0) {
          lang = c.substring("lang=".length, c.length);
        }
      }
    }
  });


  document.addEventListener("file-reject", function(data){
    app.$.superToast.text = "" + data.detail.file.name + ". " + data.detail.error;
    app.$.superToast.open();
  });

  app._handleSigninSuccessApp = function(e) {
    this._handleOidcSigninSuccess(e);

    var getAgentRequest = document.querySelector('#getCurrentUserAgent');
    getAgentRequest.headers = this.oidcAuthHeader;
    getAgentRequest.generateRequest();

  },

  app._handleOidcSigninSuccess = function(e) {
    this.oidcAuthorized = true;
    this.oidcAuthHeader = {authorization: "Bearer " + e.detail.access_token};
    this.oidcAccessToken = e.detail.access_token;
    console.log("oidc header: "+this.oidcAuthHeader);

  };

  app._handleOidcSignedOut = function(e) {
    this.oidcAuthorized = false;
    this.oidcAuthHeader = null;
    this.currentUserAgent = null;
  };



  document.addEventListener('github-signin-aware-success', function(e){

        this.access_token = e.detail.access_token;
        console.log("handleSigninSuccess this.access_token:"+this.access_token);
        app.access_token = this.access_token;

        // set header send to backend service
        app.header = {token: this.access_token};

        // set header for directly access GitHub api through frontend
        app.accessGitHubHeader = {Authorization: 'token '+this.access_token};

        // get GitHub user information
        var request = document.querySelector('#getCurrentGitHubUser');
        request.headers = app.header;
        request.generateRequest();
        // redirect to projects page
        if (app.route === "home"){
          page("/projects");
        }
        window.setTimeout(sayHi,500);
      });

  app._handleCurrentGitHubUserResponse = function(event){
      var user = event.detail.response;
      this.currentGitHubUser = user;


      // get user agent info
      var getAgentRequest = document.querySelector('#getCurrentUserAgent');
      //Authorization: Basic BASE64([id or login name]:[passphrase])
      var authUser = this.currentGitHubUser.login + ":"+ this.currentGitHubUser.login
      // var getAgentRequestheader = {Authorization: "Basic " + btoa(authUser)};
      // getAgentRequest.headers = getAgentRequestheader
      // getAgentRequest.generateRequest();

  };

  app._handleCurrentUserAgentResponse = function(event){
    console.log("_handleCurrentUserAgentResponse:" + event.detail.response);
    this.currentUserAgent = event.detail.response;
    this.currentOidcUser = event.detail.response;
    //this.fire('iron-signal', {name: 'current-oidc-user-changed', data: this.currentUserAgent});
  };

  app._handleCurrentUserAgentError = function(event,detail){

    // how to get error status code see https://github.com/PolymerElements/iron-ajax/issues/65
    console.log(detail.error); //the error object
    console.log(detail.request.status); //the status code
    console.log(detail.request.statusText);  //the error status text

    document.getElementById('openidconnectSignin').signOut();

    // if the agent does not exist, then create it
    // backend service will create this agent
    // its passphrase = this.currentGitHubUser.login
    // its LoginName = this.currentGitHubUser.login
    // its Email = this.currentGitHubUser.email
    /*if(detail.request.status == 401)
    {
      console.log("create new agent"); //the error object
      var parameters = {
        name: this.currentGitHubUser.login,
        email:this.currentGitHubUser.email
      };
      this.$.creaetUserAgent.params = parameters;
      this.$.creaetUserAgent.generateRequest();
    }
    */
  };


  app._handleCreateUserAgentError = function(event, detail){
    console.log(detail.error); //the error object
    console.log(detail.request.status); //the status code
    console.log(detail.request.statusText);  //the error status text

  };

  app._handleCreateUserAgentResponse = function(event){
    var response = event.target.lastResponse
    console.log("_handleCreateUserAgentResponse :" + response);
  }

  app.errorHandler = function (e, detail){
    console.log("request error:" + detail.error.message);
    this.$.superToast.text = detail.error.message;
    this.$.superToast.open();
  };

  /**
  * Returns the URL from where to get information about a specific project.
  *
  * @param projectId the id of the project to query.
  * @returns {string} the URL of the resource to query.
  */
  app.getProjectURL = function(projectId) {
    //return this.baseHref + '/projects/' + projectId;
  };

  /**
  * Returns the URL from where to get information about a specific component.
  *
  * @param componentId the id of the component to query.
  * @returns {string} the URL of the resource to query.
  */
  app.getComponentURL = function(componentId) {
    return this.baseHref + '/components/' + componentId;
  };

  /**
  * Loads the project info page and the components in the master branch
  *
  * @param projectName the name of the project to load.
  */
  app.loadProjectInfo = function(projectName) {
    this.$.projectDetail.load(projectName);
  };



  app.loadProjectsList = function(){
    this.$.projectsList.load();
  };

  //load a single component
  app.loadComponent = function(params){

    console.log(params); //projectName, branchName, componentName
    this.$.componentDetail.orgName = app.gitHubOrg;
    this.$.componentDetail.projectName = params.projectName;
    this.$.componentDetail.branchName = params.branchName;
    this.$.componentDetail.componentName = params.componentName;
    this.$.componentDetail.load();
    /*

    var selectedComponent = this.$.componentsList.selectedComponent;
    if(selectedComponent.name){ // if the selectedComponent is from previous componentsList page
      this.$.componentDetail.componentModel = selectedComponent;
      this.$.componentDetail.load();
    }else{ // if refresh the componentDetail page
      //https://api.github.com/repos/Co-Design-Platform/panda/contents/Sad_panda.svg?ref=master
      this.$.componentDetail.componentModel.name = params.componentName
    }
    */



  };

  // finding locating dynamically-created nodes
  // https://www.polymer-project.org/1.0/docs/devguide/local-dom#node-finding
  //var el = Polymer.dom(this.root).querySelector('#fileUploadWidget');

  // for debug
  app.sentRequest = function(e,detail){
    console.log("make a request detail.request.url:"+detail.request.url);
  };


  app.onCreateProjectTap = function(e) {
    var createDialog = document.getElementById('createProject');
    createDialog.open();
  };

    app.handleSigninSuccess = function(e){
      console.log(e);
    };

    function sayHi() {
      if (app.currentGitHubUser != null) {
        var tst = document.getElementById('superToast');
        //tst.text = i18n.getMsg('welcome') + app.currentUser.firstName;
        tst.text = "Welcome " + app.currentGitHubUser.login;
        tst.open();
      }
    }

  })(document);

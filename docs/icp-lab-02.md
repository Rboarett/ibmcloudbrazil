---
id: icp-lab-02
title: "LAB2: Microservice Builder"
sidebar_label: Lab02 - Microservice Builder 
---

## Getting Started with Microservice Builder

**THE COMPLETE VERSION OF THIS LAB IS ONLY AVALIABLE AS PDF**

**DOWNLOAD the file here:**
[LAB 2 PDF FILE](https://ibm.box.com/v/msb)

### Introduction

This lab exercise shows how to develop a microservice application using IBM Microservice Builder (MSB) Framework, IBM Cloud private community edition (ICP) and GitHub. In this lab exercise, you learn how to leverage the MSB pipeline application in the ICP and GitHub to set up the DevOps continuous integration and continuous delivery (CI/CD) pipeline for your microservice application and how to create, test and deploy your microservice application to a Kubernetes cluster in ICP environment.

### Business scenario

ABC retail store wants to enhance their customer user experiences by modernizing their online shopping application.  They redesigned the application as a microservice based application which is containerized and running in a Kubernetes cluster environment. ABC development team is looking into the tools and framework to help them create, test and deploy the microservice applications through a DevOps CICD pipeline quickly and easily. 

As a tech lead in the ABC development team, you are going to have a test run to use IBM Microservice Builder framework to develop and deploy your microservice application and the target Kubernetes Cluster deployment environment you selected is the IBM Cloud private community edition.
The enterprise has operational considerations that require collection of logging data and metrics from the runtime environments for visualization and analysis of runtime errors. ABC intends to leverage the integrated ELK stack and Fabric from the IBM Microservice Builder to achieve this requirement.  

### Objectives
The objectives of this series of lab exercises are as follows:
* Learn about the capability of IBM Cloud Private (ICP) and its Microservice Builder pipeline and Fabric applications.
* Learn how to setup and configure ICP Microservice Builder pipeline application with GitHub source code control repository.
* Learn how to develop a microservice application using the IBM Microservice Builder framework.
* Learn how to deploy the microservice application to ICP Kubernetes cluster using the CI/CD pipeline you configured.

### Lab overview
In this lab, you are going to create, test and deploy a simple microservice application to the Kubernetes cluster in ICP environment using IBM Microservice Builder Framework and tools.  Here are the activities involved in this process:
* Configure your GitHub account.
* Create your first microservice project with IBM Microservice Builder Starter kit.
* Check your project code into GitHub repository.
* Configure the IBM Microservice Builder pipeline.
* Activate the Microservice Builder pipeline flow.
* Test and verify your application deployment in Kubernetes cluster in ICP environment.

### Prerequisites 
The lab exercises require that you have a GitHub account.  If you do not have your GitHub account, you can go to GitHub web site (http://github.com) to create one free of charge.
This lab also requires you have internet access.

### What is already complete
An Ubuntu 16.04.3 Linux VM is provided for this lab.  
On the VM, these lab components are ready for use:
* Docker engine
* IBM Cloud Private EE
* IBM Microservice pipeline application
* Bluemix CLI
* Bluemix CLI Developer plug-in
* Eclipse IDE


The login credentials for the lab VM are as follows:
* User ID: **ibmdemo**
* Password: **passw0rd**


------------------------

### Lab tasks
To achieve the objectives of the lab exercises, complete these tasks:

Lesson 1
* Launch ICP and configure GitHub:
  * Launch the lab VM.
  * Log in with the lab VM credentials.
  * View the dashboard of the IBM Cloud Private.
  * Create GitHub account, set up an organization, create a project repository and generate account credentials.

Lesson 2
* Create and deploy your first simple microservice application:
  * Create the microservice application package using IBM Microservice Builder Starter kit.
  * Modify the java application code
  * Test your microservice locally

Lesson 3
* Deploy the microservice application to ICP using the integrated Jenkins build pipeline:
  * Check the java application code into GitHub.
  * Configure the ICP Microservice Builder pipeline application using your GitHub info.
  * Activate ICP Microservice Builder pipeline CI/CD process to deploy your first microservice application to the Kubernetes cluster in ICP.
  * View and test your microservice application.

------------------------

## Lesson 1 Preparation Prerequisites

### 1.0 Launching the lab VM
	
1.	Start the lab VM.
2.	Login to the lab VM with the login credentials:

>User ID: **ibmdemo** \\
Password: **passw0rd**

### 1.1	View the VM environment

1. Once logged in, open a Firefox web browser  and you can see four web bookmarks in the Bookmarks Toolbar.
   1. Microservice Builder – IBM MSB starter kit
   1. IBM Cloud Private – ICP
   1. GitHub – GitHub application
   1. Pipeline – IBM MSB pipeline application

   These are the tools you are going to use to build, deploy and test your microservice application later.
   >**Please read: Do not click the pipeline bookmark at this time!**

1. Click the IBM Cloud private bookmark to launch the IBM Cloud Private console.
1. If you see the message “Your connection is not secure”, do the following:
1. Click Advanced
1. Click Add Exception…
1. Click Confirm Security Exception
1. Accept the default User ID/Password as: **admin** / **admin** and click Login.
	


>**Please Read: ICP will takes a few minutes to start.** \\
When complete, you will see the Dashboard 100% Healthy applications.

### 1.2	Configure GitHub account
In order to integrate the IBM Microservice Builder with GitHub, you will need to do a few configurations in your GitHub account.  If you do not have a GitHub account, you can create one as shown below.

1. From the Firefox web browser window, go to GitHub URL as described below
   1. Open a new browser tab
   1. click GitHub book mark to launch the GitHub.
1. If you already have a GitHub account, you can sign in.  Otherwise, you can sign up a free new account.
1. After signed in, you need to make several configurations changes to your GitHub account.
   1. Create an organization.
	> Note: IBM Microservice Builder requires a GitHub organization. If you already have an existing organization, you can use it and skip this step. If you do not have one, you need to create a new organization in your account as follows:
   1. Click your account icon on the top right corner, and select Settings from the drown menu.  	
   1. In the Settings page, select Organizations.
   1. Click New organization.
   1. Enter the Organization name, Billing email (valid email format required), choose Free plan and click Create organization.
   1. Click Submit and your organization will be created. **Take note of your GitHub Organization Name**
1. Create a project repository under the organization you created/selected.
	> Note: The IBM Microservice Builder needs a GitHub repository under your organization to store your microservice application code.  In general, the name of this repository should be as same as your local microservice project name.  
In this lab, your local microservice project name is demo (do not change this name). You are going to create the repository in the steps shown below:
	
1. Click the organization you just created or you selected.
1. In the Repositories Tab, click Create a new repository.
1. Enter the name of the new repository as: demo, make it a public repository by setting the Public option, and click Create repository.
> Your repository is now created.
1. Copy and paste your GitHub HTTPS URL and the git commands to the Cheatsheet on the Ubuntu desktop. You are going to use them later in the lab. 
> Example GitHub HTTPS URL as illustrated below: https://github.com/<your org>/demo.git
1. Creating personal access token
__a.	Click the User icon  in the upper right corner of the GitHub page. Then click on Settings from the menu
	
	
__b.	From the GitHub Settings navigation pane, click Developer settings

__c.	From the Developer Settings page, click Personal access tokens. Then click Generate new token.
	
__d.	Add a token description to the field; it can be any name you like.

__e.	Select the scopes shown below, by clicking the check boxes next to them. 
♣	repo:status
♣	public_repo
♣	admin:repo_hook
♣	admin:org_hook
__f.	Click the Generate token button
	
	
	The token is now generated.
	
__g.	Copy and paste the personal access token to the Cheatsheet and save it, you need to use it later.
		GitHub Personal Access Token: ________________________________
	

Please Read!
In GitHub, you can only access this token number once right after you created it.  If you cannot remember the token number, you have to regenerate it.
	
__6.	Next, add the GitHub OAuth integration so that you can log in to Jenkins using GitHub for authentication.
__a.	In GitHub page, go to Settings > Developer settings > OAuth Apps
	
__b.	Click Register a new application.
	
	
__c.	Enter your application name as:  Jenkins
	
__d.	Enter the homepage url as: 
   http://192.168.168.168:31000/

__e.	Enter authorization callback url as: 
   http://192.168.168.168:31000/securityRealm/finishLogin

__f.	Click the Register application button



__g.	After registration, your OAuth application has the following two hex strings: 

TIP: Scroll to the top of the page to view the Client ID and Client Secret information. 

♣	Client ID
♣	Client Secret

Record these values in the Cheatsheet as shown below. 


GitHub Client ID: ________________________________________
GitHub Client Secret: ________________________________________

=== You are done when GitHub configuration ===

------------------------
## Lesson 2 Create a simple microservice

> LESSON 1 is required to be completed before moving to the next parts of the lab. 

This part focuses on creating a simple microservice application using the IBM Microservice Builder framework.  
1.1	Creating a simple microservice application 
The very first microservice application you are going to create is a simple “Hello world” type of Java REST service application. You are going to use the IBM Microservice Builder start kit of the Microservice Builder framework to create it. 

1.1.1	Viewing the Microservice Builder Starter kit
__1. 	Launch the Firefox web browser from the Ubuntu Desktop. 
__2. 	Open a new Browser tab
__3. 	Click the Microservice Builder book mark  in the Bookmarks Toolbar.
__4. 	You are now navigated to the IBM Microservice Builder page, click Get Started Now.
	
	You will see the detail procedure describes about how to create your microservice project in 3 steps.
	
	Note: The step 1 (Download and Install) task has been implemented for you on this lab VM, what you need to do next is to complete the steps 2 and 3.
	
1.1.2	Creating your first microservice project
__1. 	To create your first microservice project, open a new terminal window in the lab VM and issue a command as shown in step 2 above as:
bx dev create

__2. 	Since in this lab you are not going to use any IBM Bluemix service, enter ‘y’ to continue work without logging in to Bluemix.


__3. 	The IBM Microservice Builder is capable of working with different program patterns. You want to use the microservice pattern in this Lab, so enter 4 to select the Microservice pattern and press Enter.

__4. 	Enter 1 to use the Basic starter and press Enter.


__5. 	Enter 1 to create a Java microservice with MicroProfile/Java EE and press Enter.
 

__6. 	Enter the project name as: demo and press Enter 
NOTE: You MUST specify the name as demo in order to match the GitHub project you created earlier in the lab. 

Your project is now created and it is located at /home/ibmdemo/demo directory.


__7. 	Enter command ls -l to confirm the location of your project.


1.1.3	Modifying your microservice application code
You will use the Eclipse Integrated developer environment to import the microservice project as a Maven-based project. Then you will add code to the project using the Java editor in Eclipse. The Eclipse version used in this lab has been installed for you. 

__1.	Launch Eclipse 
__a.	Click on the Eclipse icon  located on the Ubuntu Desktop 
The Eclipse splash screen will appear and the Workspace Launcher dialog will appear displaying a default workspace of /home/ibmdemo/Student/workspace 
__2.	Accept the default workspace of /home/ibmdemo/Student/workspace

__a.	Click OK.
__b.	If the Welcome page appears, close it by clicking the closing icon.


You will now import your demo microservice Maven project into Eclipse. 

__3.	Import the Maven based demo project into Eclipse
The demo microservice project consists of a Maven based project. Maven will be used to build the application and produce the application artifacts for deployment. 

__a.	From Eclipse, Select File > Import > Maven > Existing Maven Projects and click Next.

__b.	Select the Maven project to import
i.	In the “Root Directory” field, browse to /home/ibmdemo/demo directory and click OK.

ii.	Click on the Refresh button
iii.	Uncheck the Add project(s) to working set box, if it is checked
iv.	Click the Finish button to import the project


Wait until the status bar (on the lower right corner of the screen) says that the import process is finished:



The Eclipse Project Explorer view will include your demo project




__4.	Expand the demo project to see the project structure. 
The MSB Starter kit generated a template project for you. The project includes the standard Maven structure for application and tests. The starting point for the service is Example.java. The java file simply includes the structure for a Restful service. 
In the Project Explorer view, you can see your microservice project file structure created by the MSB Starter kit.
The microservice project files generated by the MSB Starter kit including maven pom.xml file, Dockerfile for docker container, Jenkinsfile for Jenkins pipeline job, and Kubernetes deployment file which is located in the manifest folder.

Next, you are going to modify some code in the project using the integrated Eclipse Java editor.
You will add our own version of “Hello World” to the Example.java file. 
__5.	Modify the Example.java file in the demo project in Eclipse.
__a.	From the Eclipse Project Explorer view, navigate to Java Resources > src/main/java > application.rest.v1


__b.	Double-Click on Example.java to open it in the Java editor

__c.	Modify the Java code in the Example.java file and update the code
Change From: 

Change To: 
Note: Copy / paste the code snippet below into the Example.java, replacing the original code starting from @Path

@Path("hello")
public class Example {
 @GET
 public String greet() throws Exception {
   return "Hello from " + java.net.InetAddress.getLocalHost().getHostName();
 }	
}

Your Example.java file should now look like the code illustration below

__d.	Click Save  icon to save the changes, 
__e.	Verify that there are no compilation errors in the code. 
Note: Compilation errors are denoted with RED X  next to the line number containing an error. 



Next, you are going to modify the Jenkinsfile that is used for your application DevOps pipeline deployments to IBM Cloud private. 
You will update the Jenkinsfile to point to the location of the Maven docker image in dockerhub. We are going to pull from a custom Maven docker image that we created for this lab, which includes some cached Maven dependencies. This will reduce the Maven build time, as the build will use our cached content.  
Note: The cache we are using is OK for our single user builds in the lab, but is not thread safe in multi-user build environments. 
__6.	Modify the Jekinsfile in the demo project in Eclipse.
__f.	From the Eclipse Project Explorer, navigate to the Jenkinsfile located in the demo root  folder


__g.	Right click on Jenkinsfile to get to the context menu
__h.	From the context menu, select Open With > Text Editor to open the file in the editor pane 
__i.	Insert a new line after line #5 : image = ‘demo’
__j.	Type the following line of text into the newly inserted line;
  mavenImage = 'wwdemo/images:maven-lab'
Your Jenkinsfile should now look like the code illustration below

__k.	Click Save  icon to save the changes
__l.	Close the Jenkinsfile editor view

__7.	Modify the cli-config.yml in the demo project in Eclipse.
__m.	From the Eclipse Project Explorer, navigate to the cli-config.yml located in the demo root  folder

__n.	Right click on cli-config.yml to get to the context menu
__o.	From the context menu, select Open With > Text Editor to open the file in the editor pane 
__p.	Scroll to the line that has the container port mapping configurations and change it to:


__q.	Click Save  icon to save the changes
__r.	Close the cli-config.yml editor view

1.2	Building and testing the microservice application 
In this section, you will use the Bluemix ‘dev’ plugin to build the demo Maven based project. During the build, Maven dependencies are downloaded from Maven Central over the internet. Once the dependencies are downloaded, they are cached in your project, and used for any subsequent builds.  
__1. 	Now you need to build your first microservice application with command:
__a.	From the terminal window, run the following command
bx dev build --trace
Note: ensure you are in the /home/ibmdemo/demo directory when running the command. 

Your application will be built.

__2. 	To run your application locally, enter command:
bx dev run --trace

This will start the Liberty application server and your application will be up and running locally in a docker container. 

__3. 	To test your microservice application, open a web browser and enter the web url as: 
    http://localhost:49080/demo/hello
You will see the service response as: Hello from <your docker container host name> 

__4. 	Now the application is running and tested, you can stop the application
__a.	From the Terminal window that Liberty is running, stop the Liberty server by entering Ctrl-C command in the terminal window.


You have successfully created and tested your first microservice application in your development environment. 

------------------------

# Lesson 3: Microservice build pipeline

Deploy the microservice application to IBM Cloud private using the integrated Jenkins build pipeline. This part focuses on IBM Microservice Builder’s framework integration with Jenkins pipeline to build and deploy your microservice application to IBM Cloud private.  

Microservice Builder uses Jenkins to build and deploy your code. 
Our baseline assumption is that one microservice lives in one Git repository, and is built according to the Jenkinsfile in the project's root directory. 
The name of the repository should be the same as the name of the Docker image that it produces. 
Here is a standard Jenkinsfile:

2.1 Adding the source code of your microservice project to GitHub
__1. 	Now you are ready to add your microservice project source code to GitHub repository you created earlier using the GitHub commands you recorded in the Cheatsheet.
__a.	Go back to the terminal windows and navigate to your microservice project directory.
cd /home/ibmdemo/demo
__b.	First run the following git command to create a local git directory:
git init
__c.	Add your project source code to the local git directory with command:
git add .        Note: Include the period ‘.’ In the command

__d.	Set up git user info using the commands shown below:
Note: Run the commands exactly As-IS. You do not need to specify your own email address.
  git config --global user.email "ibmdemo@gmail.com"
 git config --global user.name "ibmdemo"

__e.	Issue git commit command to commit your code to your local git repo.
git commit -m "first commit"

__f.	Add the local source code to your GitHub account repository.
git remote add origin https://github.com/<your org>/demo.git
Note: Refer to the Cheatsheet to gather your GitHub Org, if needed. 

__g.	Push the code to your public GitHub project. 
git push -u origin master
When prompted, enter your GitHub login credentials to push the contents to your GitHub project.

Your microservice project code will be uploaded to your GitHub repository.

__h.	To verify your code upload, go back to the Firefox web browser window; click GitHub book mark  to launch the GitHub.
__i.	In the GitHub page, navigate to the demo project under your organization and you can see all your project source code are uploaded.

You are done with the GitHub source code upload.
2.2 Update microservice pipeline configuration
A key component of the IBM Microservice Builder framework is the DevOps pipeline application running in the IBM Cloud private environment. It is pre-configured with default GitHub data. In this section, you are going to update its configuration with your GitHub data. 
__1. 	Launch the Firefox web browser from the lab VM Desktop. 
__2. 	Click on the Browser tab that has your IBM Cloud private Dashboard running. Or, click on the IBM Cloud private book mark in the Bookmarks Toolbar to launch the ICp dashboard.
__3. 	If prompted to login, accept the default User ID and Password (admin / admin) and click Login
	
	Once you logged in, you see the ICp dashboard as shown below.
__4. 	Click the menu icon on the top left corner. Then select Workloads->Deployments.
	
	The Deployments page shows all currently running applications in the Kubernetes cluster in the ICP environment.
	You can see an application named default-demoxxx-ibm-microservicebuilder-pipeline is in the list and it is in the running status.
__5. 	Click the configure icon  of the default-demoxxx-ibm-microservicebuilder-pipeline application, and select Edit from the dropdown menu.
	
__6. 	In the configuration panel of the default-demoxxx-ibm-microservicebuilder-pipeline application, make changes to the following fields with your GitHub data:
	Note: Refer to the Cheatsheet to gather the personalized data required for these fields.
__a.	Scroll down to approximately line 133 in the pipeline configuration file. 
__b.	Locate the Property “names” shown below. 
__c.	Then, modify the property “value” for each, using the data from the Cheatsheet. 
			TIP: Replace the content in the < YOUR GITHUB …. > for each property with your personal data. KEEP the beginning and closing double- quotes “ “ for each of the value. 
		
•	GitHub_OAuth_Token – Insert Your GitHub Ouath Token
Before
After: Example






•	GitHub_OAuth_User – Insert Your GitHub UserID
Before:
After: Example



•	GitHub_App_Id – Insert Your GitHub Client ID
Before:
After: Example



•	GitHub_App_Secret – Insert Your GitHub Client Secret
Before:
After: Example:



•	GitHub_Admins – Insert Your GitHub User Name
Before: 
After: Example




•	GitHub_Orgs – Insert Your GitHub Organization Name
Before: 
After: Example


•	GitHub_REPO_Pattern – demo.*
Before: 
After: Example


•	REGISTRY_SECRET – admin.registrykey
Before: 
After: Example




Your Pipeline configuration should look similar to this. However, your values will be different. 


__7. 	Once you are done with these changes, click Submit.
__8. 	After the submit your changes, the default-demoxxx-ibm-microservicebuilder-pipeline application will get restarted. It will take a few seconds for the application to restart and become Available again.
__9. 	Wait for a few seconds for the default-demoxxx-ibm-microservicebuilder-pipeline application status changes back to available again, which means that the application is back online.
	You are done with the microservice pipeline application configuration updates.
	
2.3 Observing the microservice builder pipeline in action
Once default-demoxxx-ibm-microservicebuilder-pipeline application is updated and restarted, the microservice builder pipeline is ready. The pipeline will first check the GitHub for any new commit operation. Iif it detects the new commit, it will activate the pipeline flow to create a new build for your demo project and deploy it to the Kubernetes cluster in the IBM Cloud private environment. 
In this section, you can observe the pipeline flow progress and check its status. 
__1. 	From the Firefox web browser window, open a new Browser Tab. The click the pipeline book-mark.
__a.	If you are asked to sign in to GitHub, enter your GitHub Username/Password and click Sign in. Otherwise, continue to the next step. 
	
__b.	If you are asked to Grant Access to your GitHub Org and Authorize our GitHub User, then do the following: 
•	Click the Grant button next to the Org you want to grant access to Jenkins
o	Click the Authorize <Your GitHub UserName> button to authorize your user to Jenkins
	
	
	Once you have granted access and authorized your user, the pipeline is launched and you are redirected to the Jenkins dashboard.
__2. 	In the Jenkins page, you first see the pipeline put the build job to the Build Queue. 
	
__3. 	Wait a few moments; The build job will get executed and be added to the Build Executor Status list. 
__a.	Click the executing job link to see its status detail. 
	
	You can see the progresses of the pipeline flow in Extract, Maven Build and Docker Build stages.
	Note: It may take up to 1 minute for Jenkins to launch the Executor thread to start the build pipeline. 
	
	
	
	If your deployment fails with the following error:
	Error: release demo failed: services "demo-service" already exists
	Here is the corrective actions to take: 
•	From the ICp UI, delete any existing instances of the demo-deployment from Workloads > Applications
•	From the ICP UI, delete any existing instances of the demo-service from Workloads > Services
•	From Jenkins, execute the “Build Now” from the master branch to initiate a fresh build. 
__4. 	If you want to view more detailed pipeline tasks, you can click the progress bar of the running job to see them.
__5. 	Once the progress is completed, your demo application is deployed to the Kubernetes cluster in IBM Cloud private environment.
	Note: We have cached many of the Maven dependencies that would have otherwise been downloaded over the internet from Maven Central. The build should complete in less than 1 minute.
	2.4 Viewing and testing your microservice application
After you microservice application is deployed to Kubernetes cluster in the IBM Cloud private environment, via the IBM Microservice Builder pipeline, you can check its status in the IBM Cloud private environment and start to test the application.
__1. 	From the Firefox web browser window, open the IBM Cloud private tab, or click on the Firefox book mark to access the IBM Cloud private dashboard.
__2. 	Go to Workloads/Deployments page, you can see your application is listed there as demo-deployment and it is in running status.
	
	To make this application accessible for public, your microservice application has been exposed as a service. 
__3. 	Gather the demo service information needed to access the application from the Browser
	Your application is exposed as a service called demo-service
__a.	From the IBM Cloud private Dashboard, navigate to the Workloads > Services page
	
__b.	In the Services page, click your demo-service to view its details.
	
__c.	Identify the Http Node Port the Kubernetes assigned to your service.
			Your Port number will be different from illustrated below. 
			Kubernetes assigns the IP address for you. 
		
	
__4. 	Now you can access your service in Firefox web browser with the following url:
	http://192.168.168.168:<service NodePort>/demo/hello
 You will see the service response as: Hello from <your kube host name> 

You have successfully created, deployed and tested your first microservice application in Kubernetes cluster!

**End of Lab**

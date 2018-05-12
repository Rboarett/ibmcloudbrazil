---
id: icp-lab-01
title: "LAB1: Deploying Applications with ICP"
sidebar_label: Lab01 - Deploying Applications
---

## Introduction 
This part of the tutorial shows how you can use Kubernetes to deploy a containerized app. In this scenario, the app developer deploys a Hello World version of the app into the Kubernetes cluster that the IT administrator created previously.

Each lesson teaches you how to deploy progressively more complicated versions of similar apps. The diagram shows the tutorial's components of the app deployments, except the fourth part. 

The fourth part of the diagram is intended to show you how a cluster with multiple nodes might be configured.

{%
  include figure.html
  src="/assets/img/ho-101/picture1.png"
  alt=""
  caption=""
  border=false
  lightbox=false
%}

Kubernetes uses several different types of resources to get your apps up and running in clusters. In Kubernetes, deployments and services work together. Deployments include the definitions for the app, like where the image is built and which port must be exposed for the app. A minimal deployment might contain one pod, one containerized app. To make your app more resilient, you can create multiple instances of the same app by defining a replica set. If one of these replicas become unresponsive, the pod is re-created automatically.

Services include definitions for making the deployment accessible to the world. In this tutorial, you will use a public IP address that is automatically assigned to a worker node and a port to access the running version of the app.

To make your app even more highly available, in paid clusters, you can create multiple nodes to run even more replicas. This task is not covered in this tutorial, but keep this concept in mind for future improvements to an app's availability.

Only one of the lessons include incorporating Bluemix services in an app, but you can use them with as simple or complex of an app as you can imagine. 

## Objectives 
You will learn to deploy an app: 
- Understand basic Kubernetes terminology 
- Push an image to your private images registry 
- Make an app publicly accessible 
- Deploy a single instance of an app in a cluster by using a Kubernetes command and a script 
- Deploy multiple instances of an app in containers that are re-created during health checks 

## Audience 
Software developers and network administrators. 

----------------

## Lesson 1: Deploying single instance apps to Kubernetes clusters 
In this lesson, you deploy a single instance of the Hello World app into a cluster. 

{%
  include figure.html
  src="/assets/img/ho-101/picture2.png"
  alt=""
  caption=""
  border=false
  lightbox=false
%}

*1- Open a Terminal and log into you IBM Cloud Private Container Registry using the username **admin** and password **admin***

```
docker login mycluster.icp:8500
```

*2) Clone or download the source code for the Hello world app to your user home directory.*

```
git clone https://github.com/Osthanes/container-service-getting-started-wt
```

The repository contains three versions of a similar app in folders that are named Stage1, Stage2, and Stage3. Each version contains the following files: 
- Dockerfile: The build definitions for the image
- app.js: The Hello world app
- package.json: Metadata about the app

*3) Navigate to the first app directory, Stage1.*

```
cd container-service-getting-started-wt/Stage1
```

*4) Build a Docker image that includes the app files of the Stage1 directory. If need to make a change to the app in the future, repeat these steps to create another version of the image.*

*5) Build the image locally and tag it with the path to your private images registry. Tagging the image with the registry information and name tells Docker where to push the image in a later step. Use lowercase alphanumeric characters or underscores (\_) only in the image name.*

*Don't forget the period (.) at the end of the command. The period tells Docker to look inside the current directory for the Dockerfile to build the image.*

```
docker build -t mycluster.icp:8500/default/hello-world .       
```

When the build is complete, verify that you see the success message. 
Successfully built <image_id>

*6) Push the image to your private images registry.*

```
docker push mycluster.icp:8500/default/hello-world      
```

**Output:**  

```
The push refers to a repository [mycluster.icp:8500/default/hello-world] 

ea2ded433ac8: Pushed 
894eb973f4d3: Pushed 
788906ca2c7e: Pushed 
381c97ba7dc3: Pushed 
604c78617f34: Pushed 
fa18e5ffd316: Pushed 
0a5e2b2ddeaa: Pushed 
53c779688d06: Pushed 
60a0858edcd5: Pushed 
b6ca02dfe5e6: Pushed
1: digest: sha256:0d90cb73288113bde441ae9b8901204c212c8980d6283fb c2ae5d7cf652405 43 size: 2398
```

Wait for all the image layers to be pushed before you continue to the next step. 

*7) Log in into the IBM Cloud Private CLI using the username admin and the password admin*

```
bx pr login -a https://mycluster.icp:8443 --skip-ssl-validation
```

```
Login method invokedAPI endpoint: https://mycluster.icp:8443
Username> admin
Password> 
Authenticating...
OK
Select an account:
1. ICP Account (e771beedxxxxxxd0fab9d432a000f2f)
Enter a number> 1
Targeted account: ICP Account (e771beed75ec8fcd0fab9d432a000f2f)
```


*8) Execute the following command to set the context - this enable you to run ICP through the command line interface:*

```
bx pr clusters

bx pr cluster-config mycluster

```

*9) Create a Kubernetes deployment that is named hello-world-deployment to deploy the app to a pod in your cluster. Deployments are used to manage pods, which include containerized instances of an app. The following deployment deploys the app in single pod.*

```  
kubectl run hello-world-deployment --image=mycluster.icp:8500/default/hello-world
```

**Output:**

> deployment "hello-world-deployment" created


Because this deployment creates only one instance of the app, the deployment creates more quickly than it does in later lessons where more than one instance of the app is created. 


*10) Make the app accessible to the world by exposing the deployment as a NodePort service. Services apply networking for the app. Because the cluster has one worker node rather than several, load balancing across worker nodes is not needed. Therefore, a NodePort can be used to provide users with external access to the app. The NodePort you expose is the port on which the worker node listens for traffic. In a later step, you see which NodePort was randomly assigned to the service.*

```
kubectl expose deployment/hello-world-deployment --type=NodePort --port=8080 --name=hello-world-service
```

**Output:** 

> service "hello-world-service" exposed

Now that all the deployment work is done, you can check to see how everything turned out. 


*11) To test your app in a browser, get the details to form the URL.*

Get information about the service to see which NodePort was assigned.  

```
kubectl describe service hello-world-service
```

**Output:**

```
Name:                     hello-world-service
Namespace:                kube-system
Labels:                   run=hello-world-deployment
Annotations:              <none>
Selector:                 run=hello-world-deployment
Type:                     NodePort
IP:                       10.0.0.193
Port:                     <unset>  8080/TCP
TargetPort:               8080/TCP
NodePort:                 <unset>  30801/TCP
Endpoints:                10.1.138.26:8080
Session Affinity:         None
External Traffic Policy:  Cluster
Events:                   <none>
Endpoints:              172.30.171.87:8080 
Session Affinity:       None No events.
```

The NodePorts are randomly assigned when they are generated with the expose command, but within 30000-32767. 
In this example, the NodePort is 30801.

*12) Open a browser and check out the app with the following URL: http://\<IP_address\>:\<NodePort\>.*

With the example values, the URL is [http://192.168.168.168:30801](http://192.168.168.168:30801). When you enter that URL in a browser, you can see the following text.

``` 
Hello world! Your app is up and running in a cluster!
```

*13) Open your IBM Cloud Private dashboard.*  

Open the following URL in a browser.  
[https://192.168.168.168:8443/](https://192.168.168.168:8443/)

Login: **admin** 
Password: **admin**

*14) In the **Workloads** tab, you can see the resources that you created.*

{%
  include figure.html
  src="/assets/img/ho-101/picture10.png"
  alt=""
  caption=""
  border=false
  lightbox=false
%}

Congratulations! You deployed your first version of the app.  
Too many commands in this lesson? Agreed. How about using a configuration script to do some of the work for you?

To use a configuration script for the second version of the app, and to create higher availability by deploying multiple instances of that app, continue to the next lesson. 

---------------------

## Lesson 2: Running a health check 

In this lesson, you deploy three instances of the Hello World app into a cluster for higher availability than the first version of the app. Higher availability means that user access is divided between the three instances. 

When too many users are trying to access the same app instance, they might notice slow response times. Multiple instances can mean faster response times for your users. In this lesson, you will also learn how health checks can work with Kubernetes.  

{%
  include figure.html
  src="/assets/img/ho-101/picture3.png"
  alt=""
  caption=""
  border=false
  lightbox=false
%}

  
As defined in the configuration script, Kubernetes can use liveness probes to check whether a container in a pod is running or not. For example, liveness probes might catch deadlocks, where an app is running, but it is unable to make progress. Restarting a container that is in this condition can help to make the app more available despite bugs. 

Then, Kubernetes uses readiness probes to know when a container is ready to start accepting traffic again. A pod is considered ready when its container is ready.  

In the Stage2 app, every 15 seconds, the app times out. With a health check configured in the configuration script, containers are re-created if the health check finds an issue with an app. 

1) In a command-line utility, navigate to the second app directory, Stage2.
```
cd /home/ibmdemo/container-service-getting-started-wt/Stage2
```

2) Build and tag the second version of the app locally as an image. Again, don't forget the period (.) at the end of the command.
```  
docker build -t mycluster.icp:8500/default/hello-world:2 .
```

Verify that you see the success message. 
Successfully built <image_id>

3) Push the second version of the image in your private image registry. Wait for all the image layers to be pushed before you continue to the next step.

```  
docker push mycluster.icp:8500/default/hello-world:2
```

**Output:**  

```
The push refers to a repository 
[mycluster.icp:8500/default/hello-world:2] 
ea2ded433ac8: Pushed 
894eb973f4d3: Pushed 
788906ca2c7e: Pushed 
381c97ba7dc3: Pushed 
604c78617f34: Pushed 
fa18e5ffd316: Pushed 
0a5e2b2ddeaa: Pushed 
53c779688d06: Pushed 
60a0858edcd5: Pushed 
b6ca02dfe5e6: Pushed 
1: digest: sha256:0d90cb73288113bde441ae9b8901204c212c8980d6283fbc2ae5 d7cf652405 43 size: 2398
```

4) Open the <username_home_directory>/container-service-getting-started-
wt/Stage2/healthcheck.yml file with a text editor. 

This configuration script combines a few steps from the previous lesson to create a deployment and a service at the same time. The app developers can use these scripts when updates are made or to troubleshoot issues by re-creating the pods.

a.	In the Deployment section, note the replicas. Replicas are the number of instances of your app. 
Running three instances makes the app more highly available than just one instance.  
replicas: 3

b.	Update the details for the image in your private registry.  
image: " mycluster.icp:8500/default/hello-world:2"

c.	Note the HTTP liveness probe that checks the health of the container every 5 seconds.  registry.  

```
livenessProbe:
httpGet: 
path: /healthz
port: 8080
initialDelaySeconds: 5
periodSeconds: 5
```

d.	In the Service section, note the NodePort. Rather than generating a random NodePort like you did in the previous lesson, you can specify a port in the 30000 - 32767 range. This example uses 30072. 

5) Run the configuration script in the cluster. When the deployment and the service are created, the app is available for the users to see.

```  
kubectl create -f /home/ibmdemo/container-service-getting-started-wt/Stage2/healthcheck.yml
```

Output: 

```
deployment "hw-demo-deployment" created 
service "hw-demo-service" created
```

Now that all the deployment work is done, check how everything turned out.  

6.	Open a browser and check out the app. To form the URL, take the same public IP address that you used in the previous lesson for your worker node and combine it with the NodePort that was specified in the configuration script. With the example values, the URL is http://192.168.168.168:30072. In a browser, you might see the following text. If you do not see this text, **don't worry**. This app is designed to go up and down. 

```
Hello world! Great job getting the second stage up and running!
```

a.	You can also check http://192.168.168.168:30072/healthz for status.  
For the first 10 - 15 seconds, a 200 message is returned, so you know that the app is running successfully. After those 15 seconds, a timeout message is displayed, as is designed in the app.  

``` 
{ "error": "Timeout, Health check error!" }
```

7) In the Workloads tab, you can see the resources that you created. From this tab, you can continually refresh and see that the health check is working. In the Pods section, you can see how many times the pods are restarted when the containers in them are re-created. If you happen to catch the following error in the dashboard, this message indicates that the health check caught a problem. Give it a few minutes and refresh again. You see the number of restarts changes for each pod. 



```
Liveness probe failed: HTTP probe failed with statuscode: 500 
Back-off restarting failed docker container 
Error syncing pod, skipping: failed to "StartContainer" for "hwarmada-container" with CrashLoopBackOff: "Back-off 1m20s restarting failed container=hwarmada-container pod=hwarmadademo-deployment-3090568676-3s8v1_default(458320e7-059b-11e78941-56171be20503)"   
```

Congratulations! You deployed the second version of the app. You had to use fewer commands and learned how health checks work, which is great! The Hello world app passed the test. Now, you can deploy a more useful app to start analyzing press releases. 
Ready to delete what you created before you continue? This time, you can use the same configuration script to delete both the resources you created. 

``` 
kubectl delete -f /home/ibmdemo/container-service-getting-started-wt/Stage2/healthcheck.yml
```

**Output:**

```
deployment "hw-demo-deployment" deleted
service "hw-demo-service" deleted 
```

------------------------------

## Lesson 3: Deploy a cloud-native microservices application on IBM Cloud Private

In this tutorial, you install and run a cloud-native microservices application on an IBM® Cloud Private platform on Kubernetes. The application implements a simple storefront that displays a catalog of computing devices. 

People can search for and buy products from the application's web interface. For a reference implementation diagram for the application, see [Microservices with Kubernetes](https://www.ibm.com/cloud/garage/content/architecture/microservices/1_0).

The application is composed of several microservices. With microservices, an application can be partitioned into smaller independent services that communicate with each other. This structure allows for the application to be developed, deployed, and managed by different teams. When you implement microservices and incorporate the Circuit Breaker pattern, your application can remain partially operational even when one of the microservices is unavailable.

The application is called "BlueCompute" in the source code. You can see the code for the application on GitHub. The application includes these components:

- A web application that provides the user interface through the web browser. The web application also acts as a BFF component, following the Backends for Frontends pattern. In this layer, front-end developers write back-end logic for the front end. The Web BFF is implemented by using the Node.js Express Framework. These microservices are packaged as Docker containers and are managed by the IBM Cloud Private Kubernetes cluster.

- The BFF invokes a layer of reusable microservices that are written in Java™. The microservices run inside IBM Cloud Private using Docker and retrieve their data from databases. The catalog service retrieves items from a searchable JSON datasource by using ElasticSearch. The inventory service uses MySQL. ElasticSearch and MySQL databases are implemented as Docker containers.

Prerequisites

- A conceptual understanding of how Kubernetes works.
- A high-level understanding of Helm and Kubernetes package management.
- A basic understanding of IBM Cloud Private cluster architecture.
- Access to an operational IBM Cloud Private cluster.

## Task 3.1: Access the IBM Cloud Private Dashboard

In this task, you connect to an IBM Cloud Private cluster and log in to the IBM Cloud Private Dashboard. 

1) Open a web browser and go to [https://192.168.168.168:8443](https://192.168.168.168:8443)

Note: If you see a Your connection is not secure message, click Advanced and then click Add Exception to add the security exception.

2) Log in to the IBM Cloud Private Dashboard by typing admin for the user name and admin for password.

## Task 3.2: Deploy the cloud-native microservices application to IBM Cloud Private

IBM Cloud Private contains integration with Helm that you can use to install the application without a command line. To complete this task, you must be logged in as an administrator.

1) Make sure that the IBM Cloud Private Dashboard is still open. In the upper-left corner, click the menu and click Admin > Repositories.

{%
  include figure.html
  src="/assets/img/ho-101/picture4.png"
  alt=""
  caption=""
  border=false
  lightbox=false
%}

2) Add a repository:

a. Click Add Repository.

b. For the repository name, enter ibmcase.

c. For the URL, enter:

```
 https://raw.githubusercontent.com/ibm-cloud-architecture/refarch-cloudnative-kubernetes/master/docs/charts/bluecompute-ce
 ```

d. Click **Add** to add the repository.

{%
  include figure.html
  src="/assets/img/ho-101/picture5.png"
  alt=""
  caption=""
  border=false
  lightbox=false
%}

3) Click **Sync repositories** to update the Catalog 

{%
  include figure.html
  src="/assets/img/ho-101/picture12.png"
  alt=""
  caption=""
  border=false
  lightbox=false
%}

4) Go to the **Catalog** and search for the **bluecompute-ce** chart. Click on it to configure a new release of these application.

{%
  include figure.html
  src="/assets/img/ho-101/picture13.png"
  alt=""
  caption=""
  border=false
  lightbox=false
%}

5) On the initial page click the button **Configure** and in the Configuration page type the Release name: **bluecompute** and click the button **Install**

{%
  include figure.html
  src="/assets/img/ho-101/picture14.png"
  alt=""
  caption=""
  border=false
  lightbox=false
%}

6) The creation of a Helm Release is completed and the application is being installed. Click on **View Helm Release** to check the progress of the installation.

{%
  include figure.html
  src="/assets/img/ho-101/picture15.png"
  alt=""
  caption=""
  border=false
  lightbox=false
%}

7) A Helm Release contains every kind of Kubernetes objects necessary to deploy the application. Click on the release named **bluecompute**. The Relase page contains:

* Service
* Deployment
* Job
* Ingress
* Secret
* ConfigMap

Check the status of the deployments. Even if some deployments are not completed, you can access the application. The workloads that are running on the cluster are displayed. The application consists of several microservices. Each microservice is deployed to IBM Cloud Private on Kubernetes as a deployment resource. Think of a deployment as the release unit of your application.

Other concepts important to Kubernetes:
- Pods are groups of containers that are deployed together on the same worker node. A Pod is where the application code, which is packaged as a Docker container, runs in a Kubernetes context.
- A replication set ensures that a specified number of Pod replicas are running.

In the Available column, a value of 1 indicates that deployment was successful. It can take 5 - 8 minutes for the microservices to be deployed to the IBM Cloud Private Kubernetes cluster.

{%
  include figure.html
  src="/assets/img/ho-101/picture16.png"
  alt=""
  caption=""
  border=false
  lightbox=false
%}

Find the **bluecompute-web** service and click on it:

{%
  include figure.html
  src="/assets/img/ho-101/picture17.png"
  alt=""
  caption=""
  border=false
  lightbox=false
%}

8) Services are Kubernetes resources that define a logical set of Pods and a policy to assess them. The microservices components of the application are exposed as services so that they can communicate with and access each other.

On the service details page you can click on the **Node port** to access the running application

{%
  include figure.html
  src="/assets/img/ho-101/picture18.png"
  alt=""
  caption=""
  border=false
  lightbox=false
%}
 
## Task 3.3: Validate the deployment

Now that application is installed in your Kubernetes cluster, make sure that it's working as expected.

1) If the application isn't opened yet, open a web browser and go to [https://192.168.168.168/bluecompute](https://192.168.168.168/bluecompute).

Note: If you see a Your connection is not secure message, click Advanced and then click Add Exception to add the security exception.

2) Click **BROWSE ITEM CATALOG** to load the list of items.

{%
  include figure.html
  src="/assets/img/ho-101/picture7.png"
  alt=""
  caption=""
  border=false
  lightbox=false
%}
 
3) Click Login. Type **user** for the user name and **password** for the password.

4) Click one of the items to show the item details page.

5) Select an item quantity and click Buy. A message is displayed to confirm that your order was placed successfully.

6) Click Profile and view the order history. Review the date, item, and quantity of the order that you placed.

{%
  include figure.html
  src="/assets/img/ho-101/picture8.png"
  alt=""
  caption=""
  border=false
  lightbox=false
%}
 
7) Click Logout.

You validated that the application was deployed and is working.
 
## Task 3.4: Uninstall the deployed application

You can delete the application from the Kubernetes cluster in the IBM Cloud Private environment by using the Dashboard.

1) Go to the IBM Cloud Private Dashboard. From the menu, click Workloads > Helm Releases.

2) From the menu on the bluecompute row, click Delete.

{%
  include figure.html
  src="/assets/img/ho-101/picture9.png"
  alt=""
  caption=""
  border=false
  lightbox=false
%}
 
3) When you are prompted to confirm, click Delete.

The package is uninstalled asynchronously. After the uninstallation process is completed, the package entry is no longer listed in the Helm Releases section.

-------------------------------

## Summary

You completed this tutorial. Congratulations!

In this tutorial, you created a cloud-native application in a Kubernetes cluster by completing these tasks:

- [x] Accessing your IBM Cloud Private environment
- [x] Accessing the IBM Cloud Private Dashboard
- [x] Deploying the application to the cluster on IBM Cloud Private
- [x] Validating the application
- [x] Uninstalling the application



---
id: icp-lab-03
title: "ICP, Containers e Kubernetes"
sidebar_label: "ICP, Containers e Kubernetes"
---

<br />
## ICP, Containers e Kubernetes
------------------------------------------------------------
<br />

### 1 - Faça login no UI do ICP 

- No browser acesse https://(__IP_do_Servidor:8443)

![](https://c1.staticflickr.com/1/905/42172269191_41a900fde1_b.jpg)


- Se você não alterou sua senha na instalação, a senha deve ser essa:

  user: admin     

  pass: IBMPrivateCloud2018

<br />
### 2 - Faça login no terminal 

- Pegue as credenciais do kubectl no UI do ICP 

![](https://c1.staticflickr.com/1/970/40365368880_e1c021e2f3_o.png)


- Abra o terminal utilizando a chave já criada

```
ssh -i icp-2-1-0-2-v1 root@(_IP_DO_SERVIDOR)
```

- Cole as credenciais no terminal 

![](https://c1.staticflickr.com/1/959/27301010567_6e409d84b4_o.png)


- Verifique as informações do cluster
```
kubectl cluster-info
```

![](https://c1.staticflickr.com/1/907/42172464241_b989f3a7cd_o.png)
kubectl cluster-info


### 3 -  Trabalhando um pouco com Docker

- Verifique as imagens docker disponíveis no repositório local do docker 
```
docker images
```
- Procure uma imagem do nginx

```
docker images |grep nginx
```

- Baixe a imagem do NGNIX do Docker HUB

```
docker pull nginx
```
- Renomeie a imagem que vc acabou de baixar do Docker Hub para que façamos o update dela para o registro do ICP

```
docker tag nginx mycluster.icp:8500/default/nginx
```

- Faço o login no registry interno do ICP 

```
docker login mycluster.icp:8500

user: admin
pass: kjdhdjhehuh2uy37637627ui2jk2jskhs
```
- Faça o push da imagem recém renomeada para o registry do ICP 

```
docker push mycluster.icp:8500/default/nginx
```

![](https://c1.staticflickr.com/1/972/42172823031_ed5fe96162_o.png)

### 4 - Verifique a imagem no registry do ICP

- acesse a UI do ICP 

![](https://c1.staticflickr.com/1/943/27300621597_e04e231a4e_o.png)

- mude nginx para global caso queira que outros namespaces utilizem a imagem
 
![](https://c1.staticflickr.com/1/968/27300691097_cb8884c08d_o.png)


### 5 - Criando um services 

- volte para o terminal e crie um arquivo service-nginx.yml
````
vi service-nginx.yml
````
- cole o conteúdo abaixo para criar o serviço
````
apiVersion: v1
kind: Service
metadata:
  name: nginx
  labels:
    run: nginx
spec:
  type: NodePort
  ports:
  - port: 80
    protocol: TCP
  selector:
    run: nginx

````
- execute
````
kubectl create -f service-nginx.yml
````

- verifique que o serviço foi criado
'''
kubectl get services
''''
![](https://c1.staticflickr.com/1/964/42126864552_165fd3315e_o.png)


- vá em na UI do ICP >> Menu >> Network Access >> Services e verifique que vc criou um serviço 

![](https://c1.staticflickr.com/1/904/42126907192_ceb8082d47_o.png)

### 6 - Criando um deployment

- vá até a UI do ICP e click em resource

![](https://c1.staticflickr.com/1/948/41272607545_75a9836270_o.png)

- adicione na tela de create resouce o conteúdo abaixo

````
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
spec:
  selector:
    matchLabels:
      run: nginx
  replicas: 1
  template:
    metadata:
      labels:
        run: nginx
    spec:
      containers:
      - name: nginx
        image: mycluster.icp:8500/default/nginx
        ports:
        - containerPort: 80

````
- verifique se o deployment foi realizado em >> Menu >> Workloads >> Deployments 
    
![](https://c1.staticflickr.com/1/907/40366143850_60d948c547_o.png)

- acesse o deployment clicando nome do deplyment e navegue até servives clicando no Endpoint

![](https://c1.staticflickr.com/1/960/41272690185_c4d70af890_o.png)

- você deve receber uma tela como essa:
![](https://c1.staticflickr.com/1/956/42173417831_ac9a27b02d_o.png)

![](http://drive.google.com/uc?export=view&id=19s6ND7xLLPMER5CdYgyhtwWqRqfTkMNW)
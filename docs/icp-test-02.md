---
id: icp-test-02
title: Instalando ICP 2.1.0.2  
sidebar_label: ICP 2.1.0.2 + Ubuntu Server
---
<br />

## 1-  Instale um Ubuntu Server 16.04 LTS

- utilize preferencialmente root
- um servidor com pelo menos 12gb de ram e 4 vcpus
- pode ser virtual, físico ou na cloud ( IBM, Azure, AWS ...) 
- preferencialente opte por IPs que não sejam "nateados" para esse teste. 

## 2- Criando as chaves

- comece criando a chave no servidor, como root execute
````
ssh-keygen -b 4096 -f ~/.ssh/id_rsa -N "" 
````
- copie a chave para o arquivo de autorized_keys

````
cat ~/.ssh/id_rsa.pub | sudo tee -a ~/.ssh/authorized_keys
````
- copie a chave para o (os) servidores do cluster 
````
ssh-copy-id -i ~/.ssh/id_rsa.pub ip
````


## 3- Instalando os pre-reqs

- configure o mmap e o número de portas local
```
echo "vm.max_map_count=262144" | sudo tee -a /etc/sysctl.conf
echo 'net.ipv4.ip_local_port_range="10240 60999"' | sudo tee -a /etc/sysctl.conf
```

- instale os software mínimos para rodar a instalação 
```
apt-get -y install \
    socat \
    python \
    seapt-transport-https \
    ca-certificates \
    curl \
    software-properties-common\
```


## 4- Instalando o docker-ce

- adcionando a chave do repositório 
````
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
````

- crie o repositório
````
add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
````

- faça o update
``` 
apt-get update &&  \
apt-get install -y  \
    docker-ce=17.03.2~ce-0~ubuntu-xenial
```
## 5- Instalando o IBM Cloud Private - CE 

- faça o pull da imagem de instalação através do docker 
````
docker pull ibmcom/icp-inception:2.1.0.2
````

- crie o diretório 
````
mkdir /opt/ibm-cloud-private-ce-2.1.0.2;  \
cd /opt/ibm-cloud-private-ce-2.1.0.2
````

- crie os arquivos de configuração 
````
docker run -e LICENSE=accept \
-v "$(pwd)":/data ibmcom/icp-inception:2.1.0.2 cp -r cluster /data
````

- copie a chave para o arquivo de configuração 
````
cp ~/.ssh/id_rsa cluster/ssh_key
````

- edite o arquivo hosts e declare os IPs do servidores
````
vi hosts   

exemplo de arquivo em modo "all-in-one"
------
[master]
172.31.26.186
[worker]
172.31.26.186
[proxy]
172.31.26.186
#[management]
#4.4.4.4
#[va]
#5.5.5.5
````
- edite o arquivo config.yaml e troque a senha de admin 
```
vi config.yaml

trecho da senha de admin
------
## Advanced Settings
default_admin_user: admin
default_admin_password: admin << troque essa senha 
# ansible_user: <username>
# ansible_become: true
# ansible_become_password: <password>
```
- instale o ICP
````
docker run -e LICENSE=accept --net=host \
-t -v "$(pwd)":/installer/cluster \
ibmcom/icp-inception:2.1.0.2 install
````

---
id: icp-lab-02
title: "Instalando e Configurando"
sidebar_label: Instalando e Configurando
---
<br />

## Instalando e configurando o ICP 2.1.0.2-CE
------------------------------------------------------------
<br />

### 1 - Download da chave

Faça o download da chave do servidor, clicando [aqui](https://raw.githubusercontent.com/IBMCloudBrazil/ibmcloudbrazil/master/docs/icp-2-1-0-2-v1)

- ajuste o permissionamento do certifiado

```
chmod 600 icp-2-1-0-2-v1
```


### 2 - Faça login no servidor

```
ssh -i icp-2-1-0-2-v1 root@__IP_DO_SERVIDOR__
```
### 3 - Editando o arquivo de hosts

```
vi /etc/hosts

exemplo de hosts
-------------
127.0.0.1	localhost
__IP_DO_SERVIDOR__  __NOME_DO_HOST___

```
### 4 - Acesse o diretório do ICP 

```
cd /opt/ibm-cloud-private-ce-2.1.0.2/cluster
```
### 5 - Acesse o arquivo de configuração 

```
vi config.yaml
```
### 6 - Edite o arquivo de hosts de instalação
- substitua o IP do seu servidor nos roles master, worker e proxy. 
```
vi hosts

exemplo de arquivo em modo "all-in-one"
------
[master]
__IP_DO_SERVIDOR__
[worker]
__IP_DO_SERVIDOR__
[proxy]
__IP_DO_SERVIDOR__
#[management]
#4.4.4.4
#[va]
#5.5.5.5
```
### 7 - Execute a instalação do ICP

```
docker run -e LICENSE=accept --net=host \
-t -v "$(pwd)":/installer/cluster \
ibmcom/icp-inception:2.1.0.2 install
```

Você deve ver uma tela como essa
![](https://c1.staticflickr.com/1/970/28299699158_9d72e7f93d_b.jpg)

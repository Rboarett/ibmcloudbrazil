---
id: icp-lab-02
title: "Installando e Configurando"
sidebar_label: Instalando e Configurando
---
<br />

## Instalando e configurando o ICP 2.1.0.2-CE
------------------------------------------------------------
<br />

### 1 - Download da chave

[Click aqui](https://raw.githubusercontent.com/IBMCloudBrazil/ibmcloudbrazil/master/docs/icp-2-1-0-2-v1) para fazer o download da chave

### 2 - Faça login no servidor

```
ssh -i icp-2-1-0-2-v1 root@(_IP_DO_SERVIDOR)
```
### 3 - Editando o arquivo de hosts

```
vi /etc/hosts
```
### 4 - Acesse o diretório do ICP 

```
cd /opt/ibm-cloud-private-ce-2.1.0.2/cluster
```
### 5 - Acesse o arquivo de configuração 

```
vi config.yml
```
### 6 - Edite o arquivo de hosts de instalação

```
vi hosts 
```
### 7 - Execute a instalação do ICP

```
docker run -e LICENSE=accept --net=host \
-t -v "$(pwd)":/installer/cluster \
ibmcom/icp-inception:2.1.0.2 install
```

Você deve ter receber uma tela como essa
![](https://c1.staticflickr.com/1/970/28299699158_9d72e7f93d_b.jpg)

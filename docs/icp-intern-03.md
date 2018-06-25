---
id: icp-intern-03
title: Criando servidores all-in-one em modo batch na IBM Cloud 
sidebar_label: ICP 2.1.0.3 Batch 
---

## 01 - Pré-requisitos

- tenha o engine do docker rodando em seu computador local 
- tenha um usuário de API e um secret de API válido do IBM Cloud

## 02 - Usando o docker para criar os servidores 

- baixe o container:
````
docker pull jmbarros/icp-nodes:2.1.0.3
````

- execute o container:
```
docker run -it jmbarros/icp-nodes:2.1.0.3 /bin/bash
```

## 03 - Configurando o container para criar os servidores

- dentro do container configure o cli da IBM Cloud, digite:
```
slcli setup
```
- digite seu usuário e sua API Key da IBM Cloud

## 04 - Configure os hostnames que serão criados.

- edite o arquivo hostnames.txt e configure os hosts na quantidade e nomes que desejar

```
vi hostnames.txt
```

- execute a criação  
```
python create-hosts.py
```

## 05 - Verifique os servidores criados.

- verifique se os hosts já estão prontos, rodando o comando abaixo
````
slcli vs list
````

## 06 - Execute a instalação.

- depois de todos os servidores criados, execute a criação do inventário
```
python create-inventory.py
```

- execute a instalação dos ICP 2.1.0.3 nos hosts.
```
install-hosts.py
```

## 07 - Observações.

- depois de uns 25 minutos em média, todos os servidores estão prontos para uso.
- o usuário e a senha serão:
```
user: admin
password: IBMPrivateCloud2018
```
- a chave para o acesso via ssh, pode ser baixada nesse [link](https://raw.githubusercontent.com/IBMCloudBrazil/ibmcloudbrazil/master/docs/icp-2-1-0-2-v1)


---
id: icp-intern-02
title: "Pré-requisitos ICP 2.1.0.2 EE "
sidebar_label: Pré-Req ICP 2.1.0.2 EE
---
<br />

## Ubuntu 16.04 LTS

### Software
-------------------------------------------------------

    #### Ubuntu
    - versão 16.04 LTS x64
    - [download link aqui](http://mirror.ufscar.br/ubuntu-releases/xenial/ubuntu-16.04.4-server-amd64.iso)


#### Docker-CE

- utilize a versão do Docker-ce que vem junto com o empacotamento do IBM
````
icp-docker-17.09_x86_64.bin
````



#### Mínimo de servidores e especificações 

- tabela com servidores e especificações:

|Role| # Servidores | # Cores | # RAM | # Disco |
|---|---|---|---|---|
|boot-node| 1 server | 8 vCpus | 8 GB | 100 GB |
|master| 3 servers | 8 vCpus | 16 GB | 200 GB |
|worker| 3 servers | 4 vCpus | 16 GB | 100 GB |
|proxy| 1 servers | 4 vCpus | 4 GB | 50 GB  |
|management| 1 servers | 8 vCpus | 8 GB | 200 |

#### Storage compartilhado entre os servidores

-  espaço de disco suficiente para suportar as imagens de container que serão armazenados no registry privado do ICP  

```
/var/lib/registry
```

- espação de disco suficiente para armazenar os arquivos de audit dos conatiners
```
/var/lib/icp/audit
```
	
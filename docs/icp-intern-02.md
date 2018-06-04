---
id: icp-intern-02
title: "Pré-requisitos ICP 2.1.0.2 EE "
sidebar_label: Pré-req ICP 2.1.0.2
---

# ICP-EE em Ubuntu

## Ubuntu 16.04 LTS

- versão 16.04 LTS x64  

#### Mínimo de servidores e especificações 

- tabela com servidores e especificações:

|Role| # Servidores | # Cores | # RAM | # Disco |
|---|---|---|---|---|
|boot-node| 1 server | 2 vCpus | 4 GB | 100 GB |
|master| 3 servers | 8 vCpus | 16 GB | 200 GB |
|worker| 3 servers | 4 vCpus | 16 GB | 100 GB |
|proxy| 1 servers | 2 vCpus | 4 GB | 50 GB  |
|management| 1 servers | 2 vCpus | 8 GB | 200 |

#### Storage compartilhado entre os servidores

-  espaço de disco suficiente para suportar as imagens de container que serão armazenados no registry privado do ICP  

```
/var/lib/registry
```

- espação de disco suficiente para armazenar os arquivos de audit dos conatiners
```
/var/lib/icp/audit
```

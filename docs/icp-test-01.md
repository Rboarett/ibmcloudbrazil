---
id: icp-test-01
title: Testing ICP  
sidebar_label: Virtual Box
---
<br />

## Testando o ICP 2.1.0.2 com VirtualBox

Criamos uma versão OVA, com os prérquisitos já configurados para facilitar o teste.

Esse virtual appliance é baseado em VirtualBox, que é um opção gratuita para executar servidores virtuais, disponíveis para os principais SO's.

Se você ainda não possue o VirtualBox instalado em seu computador, começe pelo download e instalação do virtual box, como abaixo:

1. Faça o download e instalação do VirtualBox
    - Download VirtualBox [here](https://www.virtualbox.org/wiki/Downloads)
    - Install VirtualBox

2. Faça o download Ubuntu + ICP 
    - Download OVA [here](https://s3-api.us-geo.objectstorage.softlayer.net/jmbarros-icp-ce/icp-2-1-0-2/icp-ce-2-1-0-2.ova)

3. Abra o arquivo com o virtual BOX 
    - garanta que esse servidor terá um acesso a internet usando uma rede do tipo bridge 
    - pelo menos 10 Gb de RAM ( 16 GB recomendado )
    - pelo menos 2 vCPU's ( 4 vCPUs recomendado)

4. Log no servidor virtual como:
    - usuário: root
    - senha: ibmcloud

5. Instale o ICP Community Edition 
    - execute no prompt:
    ```bash install.sh```

3. Open the ICP-LAB OVF file 
    - Click in the icp-lab.ofv to open using VIRTUAL BOX


4. Open the icp-lab-stark console
    - Login: root
    - Password: passw0rd
    - Execute 
````
python install_minicloud.py
````
    
------------------------

---
date: 2023-11-19
title: 'Setting up SSH keys for secure connection to VPS'
template: post
thumbnail: '../thumbnails/write-own-website-on-typescript.jpg'
slug: setting-up-ssh-keys-for-secure-connection-to-vps
categories: linux ssh
tags: ssh vps security
---

**SSH** (Secure Shell) is a protocol for secure remote access to servers.
In this article, we will walk through the process of setting up SSH keys on a local machine running macOS or Linux for a secure connection to your **VPS** (Virtual Private Server).


## Step 1: Generating an SSH Key

Open the terminal on your computer and run the following command to generate an SSH key.
Replace email|purple with your email|purple address:

```bash
    ssh-keygen -t rsa -b 4096 -C "email"
```

The key will be saved in the `~/.ssh/` directory with the names id_rsa(private key) and id_rsa.pub(public key).

## Step 2: Copying the Public Key to the Server

Use the ssh-copy-id command to transfer the public key to your server. Replace your user|purple and ip|purple:

```bash
    ssh-copy-id -i ~/.ssh/id_rsa.pub user and ip # replace your ip and user
```

You will be prompted to enter the password for your user on the server.

## Step 3: Connecting to the Server Using SSH Keys

Now you can connect to the server using your private key. Replace user|purple and ip|purple:

```bash
    ssh user@ip
```

If everything is set up correctly, you should not be prompted for a password, and you will be connected to the server.

## Step 4: Checking SSH Server Settings on the Server

Connect to the server via SSH using a password:

```bash
    ssh user@ip
```

Ensure that public key authentication is enabled in the SSH configuration file:

```bash
    sudo nano /etc/ssh/sshd_config
```

Ensure that the parameters are configured:

```bash
    PubkeyAuthentication yes
    PasswordAuthentication yes  # It can be no if you want to completely disable password authentication.
```

## Step 5: Restarting the SSH Server

Restart the SSH server to apply the changes:

```bash
    sudo systemctl restart ssh
```

You have now set up a secure connection to your VPS using SSH keys.

## Conclusion

You have successfully configured SSH keys for a secure connection to your server. 
This method enhances security by eliminating the need to enter a password each time you connect, which is particularly important when working with remote servers.
